import { handleError } from "../../../middleware/handleError.js";
import cartModel from "../../../../db/models/cart.model.js";
import { AppError } from "../../../utils/AppError.js";
import orderModel from "../../../../db/models/order.model.js";
import productModel from "../../../../db/models/product.model.js";

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PkjqvDEsIEDP3Cp8KE67PEITqnkOK2Obp4CRH5J3Jagbx9k5EYlS02i3Qt0WXt31Khon7NQyC0lp7Y3iOlBW5Ni00HtDO9fpW');

const customer = await stripe.customers.create({
  email: 'customer@example.com',
});

console.log(customer.id);


const addOrder = handleError(
    async(req,res,next) =>{
        //1.get cart... id cart params
        let cart = await cartModel.findById(req.params.id)
        //2.get totalprice
        let totalPrice = cart.totalpriceAfterDiscount ? cart.totalpriceAfterDiscount: cart.totalPrice;

        //3.create cash order
        let order = new orderModel({
            user: req.user._id,
            cartItems:cart.cartItems,
            totalPrice,
            shippingAddress:req.body.shippingAddress
        })
        //4.update sold, quantity // b l product id
        if(order){
            let options=cart.cartItems.map(item=>(
              {
                updateOne :{
                  "filter": {_id:item.product},
                  "update": {$inc:{quantity:-item.quantity,sold:item.quantity}},            // Changed in 4.2
                }    
              }))
              await productModel.bulkWrite(options);
              await order.save();
        
          }else{
            return next(new AppError("Error occurs",409))
          }
        //5.remove cart //df3taha 5las
        await cartModel.findByIdAndDelete(req.params.id)
        res.json({message:"Done", order})

       
    }
    
)

const getOrder = handleError(async(req,res,next)=>{
    let order = await orderModel.findOne({user:req.user._id}).populate("cartItems.product")
    res.json({mrssage:"Hello", order})
})

const getAllOrder = handleError(async(req,res,next)=>{
    let order = await orderModel.find({user:req.user._id})
    res.json({mrssage:"Hello", order})
})


const onlinePayment = handleError(async(req,res,next)=>{
    let cart = await cartModel.findById(req.params.id)
        //2.get totalprice
        let totalPrice = cart.totalpriceAfterDiscount ? cart.totalpriceAfterDiscount: cart.totalPrice;
    let session = await stripe.checkout.sessions.create({
        line_items:[
            {
              price_data:{
                currency:'egp',
                unit_amount:totalPrice*100,
                product_data:{
                  name:req.user.name,
                },
              },
            quantity:1,
            },
          ],
          mode:"payment",
          success_url:"http://localhost:4200/en",
        cancel_url:"http://localhost:4200/en/404",
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress
    })

    res.json({message:"hello", session})

})




export{
    addOrder,
    getOrder,
    getAllOrder,
    onlinePayment
    
   
}