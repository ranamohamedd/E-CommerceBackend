import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";
import userModel from "../../../../db/models/user.model.js";
import { AppError } from "../../../utils/AppError.js";
 


const addToWishList = handleError(async (req, res, next) => {
    let { product } = req.body;
    console.log(product);
    let results = await userModel.findOneAndUpdate(
        { _id: req.user._id }, // Corrected: Query condition
        { $addToSet: { wishList: product } },
        { new: true }
    );
    if (!results) {
        return next(new AppError("Not found", 404));
    }
    res.json({ message: "Done", results }); // Sending response directly
});

const removeFromWishList = handleError(async (req, res, next) => {
    let { product } = req.body;
    console.log(product);
    let results = await userModel.findOneAndUpdate(
        { _id: req.user._id }, 
        { $pull: { wishList: product } },
        { new: true }
    );
    if (!results) {
        return next(new AppError("Not found", 404));
    }
    res.json({ message: "Done", results }); 
});

const getAllWishList = handleError(async (req, res, next) => {
   
    
    let results = await userModel.findOne(
        {_id:req.user._id }
    ).populate("wishList")
    if (!results) {
        return next(new AppError("Not found", 404));
    }
    res.json({ message: "Done", results }); 
});

export{
    addToWishList,
    removeFromWishList,
    getAllWishList
    
}