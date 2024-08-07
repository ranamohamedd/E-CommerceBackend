import categoryModel from "../../../../db/models/category.model.js";
import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne } from "../../handlers/apiHandler.js";

const addCategory = handleError(
    async(req,res) =>{

        //console.log(req.file,"From Controller")

        req.body.slug = slugify(req.body.title)
        req.body.image =  req.file.filename
    
        let preCategory = new categoryModel(req.body);
        //console.log(preCategory);
        let addedCategory = await preCategory.save()
        res.json({message:"Added", addedCategory})
        //console.log(addedCategory);
    
    
    }
    
)
const getAllCategories = async (req,res)=>{
    let allCategories = await categoryModel.find();
    res.json({message:"Done", allCategories})

}

const getCategoryById = async (req,res)=>{
    let category = await categoryModel.findById(req.params.id);
    res.json({message:"Done", category})

}

const updateCategory = async (req,res) =>{
    req.body.slug = slugify(req.body.title)
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body,{new:true})
    //console.log(updatedCategory)
    updatedCategory&& res.json({message:"Done", updatedCategory})
    !updatedCategory&& res.json({message:"Not Found Category"})
    // if(updatedCategory){
    //     res.json({message:"Done", updatedCategory})

    // }else{
    //     res.json({message:"Not Found Category"})
    // }
}

const deleteCategory = deleteOne(categoryModel);
export{
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}