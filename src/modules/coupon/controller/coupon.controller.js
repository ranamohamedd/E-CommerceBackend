import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import { AppError } from "../../../utils/AppError.js";
import couponModel from "../../../../db/models/coupon.model.js";
import QRCode from 'qrcode'

 
const addCoupon = handleError(
    async(req,res,next) =>{
       
        let preCoupon = new couponModel(req.body);
        console.log(preCoupon);
        let added = await preCoupon.save()
        res.json({message:"Added", added})
        console.log(added);
    
    }
    
)
const getAllCoupons = async (req,res)=>{
    let allReviews = await couponModel.find();
    res.json({message:"Done", allReviews})

}

const getCouponById=handleError(async(req,res,next)=>{
    let {id}=req.params;
    let Coupon=await couponModel.findOne({_id:id});
    let url= await QRCode.toDataURL(Coupon.code);
    res.json({message:"Congratulations!",Coupon,url});
  });

const updateCoupon = async (req,res) =>{
    // lazem akon ana elli 3mlt l review
    let {id} = req.params; //Review ID 
    // l user bta3i mwgood f req.user._id

    let updated = await couponModel.findOneAndUpdate( {_id:id}, req.body,{new:true})
    console.log(updated)
    updated&& res.json({message:"Done", updated})
    !updated&& res.json({message:"Not Found Review"})
    
}

const deleteCoupon = deleteOne(couponModel)

export{
    addCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
}