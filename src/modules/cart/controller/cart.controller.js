import { handleError } from "../../../middleware/handleError.js";
import cartModel from "../../../../db/models/cart.model.js";
import { AppError } from "../../../utils/AppError.js";
import productdModel from "../../../../db/models/product.model.js";
 



function calPrice(cart){
    let totalPrice = 0;
    cart.cartItems.forEach((ele)=>{
        totalPrice += ele.quantity* ele.price
    })
    cart.totalPrice = totalPrice;

}



const addCart = handleError(
    async(req,res,next) =>{
        let product = await productdModel.findById(req.body.product).select("price")
        !product && next(new AppError("product not found",404))
        // userId from req.user._id
        req.body.price = product.price
        let isCartExist = await cartModel.findOne({user:req.user._id});
        if(!isCartExist){
            let cart = new cartModel({
                user:req.user._id,
                cartItems: [req.body]
            });
            calPrice(cart);
            await cart.save()
            return res.status(201).json({message:"created", cart })
        }
        
        let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product)
        console.log(item)
        if(item){
            item.quantity +=1;
        }else{
            isCartExist.cartItems.push(req.body)
        }
        calPrice(isCartExist);


      
        await isCartExist.save()
        res.json({message:"added",isCartExist })
    }
    
)


const getCart = handleError(async(req,res,next)=>{
    let cart = await cartModel.findOne({user:req.user._id})
    res.json({message:"Done",cart})

})



const updateCart = handleError(
    async(req,res,next) =>{
        let product = await productdModel.findById(req.body.product).select("price")
        !product && next(new AppError("product not found",404))
        // userId from req.user._id
        req.body.price = product.price
        let isCartExist = await cartModel.findOne({user:req.user._id});

        
        let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product)
        !item && next(new AppError("Not Existed",404))
        console.log(item)
        if(item){
            item.quantity = req.body.quantity;
        }
        calPrice(isCartExist);
        await isCartExist.save()
        res.json({message:"added",isCartExist })
    }
    
)

const removeCartItem = handleError(async(req,res,next)=>{
    let cart = await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    res.json({message:"deleted", cart})
})


export{
    addCart,
    getCart,
    removeCartItem,
    updateCart
   
}