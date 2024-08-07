import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import brandModel from "../../../../db/models/brand.model.js";
import { deleteOne } from "../../handlers/apiHandler.js";

const addBrand = handleError(
    async(req,res) =>{
        req.body.slug = slugify(req.body.title)
        req.body.logo =  req.file.filename
    
        let preBrand = new brandModel(req.body);
        console.log(preBrand);
        let added = await preBrand.save()
        res.json({message:"Added", added})
        console.log(added);
    
    }
    
)
const getAllBrands = async (req,res)=>{
    let allBrands = await brandModel.find();
    res.json({message:"Done", allBrands})

}

const getBrandById = async (req,res)=>{
    let brand = await brandModel.findById(req.params.id);
    res.json({message:"Done", brand})

}

const updateBrand = async (req,res) =>{
    req.body.slug = slugify(req.body.title)
    if(req.file) req.body.logo =  req.file.filename
    let updated = await brandModel.findByIdAndUpdate(req.params.id, req.body,{new:true})
    console.log(updated)
    updated&& res.json({message:"Done", updated})
    !updated&& res.json({message:"Not Found subCategory"})
    // if(updatedCategory){
    //     res.json({message:"Done", updatedCategory})

    // }else{
    //     res.json({message:"Not Found Category"})
    // }
}

const deleteBrand = deleteOne(brandModel)

export{
    addBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}