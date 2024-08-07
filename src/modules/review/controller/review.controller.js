import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import reviewsModel from "../../../../db/models/reviews.model.js";
import { AppError } from "../../../utils/AppError.js";
 
const addReview = handleError(
    async(req,res,next) =>{
        req.body.user =  req.user._id;
        let isReview = await reviewsModel.findOne({user:req.user._id, product:req.body.product})
        if(isReview) return next(new AppError("already have review",409))
        let preReview = new reviewsModel(req.body);
        console.log(preReview);
        let added = await preReview.save()
        res.json({message:"Added", added})
        console.log(added);
    
    }
    
)
const getAllReviews = async (req,res)=>{
    let allReviews = await reviewsModel.find();
    res.json({message:"Done", allReviews})

}

const getReviewById = async (req,res)=>{
    let Review = await reviewsModel.findById(req.params.id);
    res.json({message:"Done", Review})

}

const updateReview = async (req,res) =>{
    // lazem akon ana elli 3mlt l review
    let {id} = req.params; //Review ID 
    // l user bta3i mwgood f req.user._id

    let updated = await reviewsModel.findOneAndUpdate( {_id:id, user:req.user._id}, req.body,{new:true})
    console.log(updated)
    updated&& res.json({message:"Done", updated})
    !updated&& res.json({message:"Not Found Review"})
    
}

const deleteReview = deleteOne(reviewsModel)

export{
    addReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
}