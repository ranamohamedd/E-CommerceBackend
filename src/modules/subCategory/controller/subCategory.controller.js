import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import subcategoryModel from "../../../../db/models/subCategory.model.js";
import { deleteOne } from "../../handlers/apiHandler.js";

const addSubCategory = handleError(
    async(req,res) =>{
        req.body.slug = slugify(req.body.title)
        req.body.image =  req.file.filename
    
        let preCategory = new subcategoryModel(req.body);
        //console.log(preCategory);
        let addedCategory = await preCategory.save()
        res.json({message:"Added", addedCategory})
        console.log(addedCategory);
    
    }
    
)
const getAllSubCategories = async (req,res)=>{
    console.log(req.params);
    let filterObj ={}
    if(req.params.category){
        filterObj.category = req.params.category
    }
    let allSubCategories = await subcategoryModel.find();
    res.json({message:"Done", allSubCategories})

}

const getSubCategoryById = async (req,res)=>{
    let subCategory = await subcategoryModel.findById(req.params.id);
    res.json({message:"Done", subCategory})

}

const updateSubCategory = async (req,res) =>{
    req.body.slug = slugify(req.body.title)
    let updatedSubCategory = await subcategoryModel.findByIdAndUpdate(req.params.id, req.body,{new:true})
    //console.log(updatedSubCategory)
    updatedSubCategory&& res.json({message:"Done", updatedSubCategory})
    !updatedSubCategory&& res.json({message:"Not Found subCategory"})
    // if(updatedCategory){
    //     res.json({message:"Done", updatedCategory})

    // }else{
    //     res.json({message:"Not Found Category"})
    // }
}

const deleteSubCategory = deleteOne(subcategoryModel)
export{
    addSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
}