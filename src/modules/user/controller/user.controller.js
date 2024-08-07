import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import userModel from "../../../../db/models/user.model.js";
import { deleteOne } from "../../handlers/apiHandler.js";

const addUser = handleError(
    async(req,res) =>{
        
        let preUser = new userModel(req.body);
        //console.log(preUser);
        let added = await preUser.save()
        res.json({message:"Added", added})
        //console.log(added);
    
    }
    
)
const getAllUsers = async (req,res)=>{
    let allUsers = await userModel.find();
    res.json({message:"Done", allUsers})

}

const getUserById = async (req,res)=>{
    let user = await userModel.findById(req.params.id);
    res.json({message:"Done", user})

}

const updateUser = async (req,res) =>{
    req.body.slug = slugify(req.body.name)
    let updated = await userModel.findByIdAndUpdate(req.params.id, req.body,{new:true})
   // console.log(updated)
    updated&& res.json({message:"Done", updated})
    !updated&& res.json({message:"Not Found subCategory"})
}

const deleteUser = deleteOne(userModel)



const changePassword=handleError(async(req,res,next)=>{
    let {id}=req.params;
    req.body.changePasswordAt=Date.now();
    //console.log(req.body.changePasswordAt);
    req.body.changePasswordAt = Date.now()
    //console.log(req.body.changePasswordAt)

  
    let changedPassword=await userModel.findOneAndUpdate({_id:id},req.body,{new:true});
    !changedPassword && next(new AppError("not found user",404))
    changedPassword && res.json({message:"Password been updated",changedPassword});
  });

export{
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    changePassword
}