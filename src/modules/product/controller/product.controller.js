import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import productModel from "../../../../db/models/product.model.js";
import { deleteOne } from "../../handlers/apiHandler.js";

const addProduct = handleError(
    async(req,res) =>{
        //console.log(req.files)
        req.body.slug = slugify(req.body.title)
        req.body.imageCover =  req.files.imageCover[0].filename;
        req.body.images = req.files.images.map(ele => ele.filename);
    
        let preProduct = new productModel(req.body);
        //console.log(preProduct);
        let added = await preProduct.save()
        res.json({message:"Added", added})
        //console.log(added);
    
    }
    
)
const getAllProducts = async (req,res)=>{
    let allProducts = await productModel.find();
    res.json({message:"Done", allProducts})

}

const getProductById = async (req,res)=>{
    let product = await productModel.findById(req.params.id);
    res.json({message:"Done", product})

}

const updateProduct = async (req,res) =>{
    req.body.slug = slugify(req.body.title)
    if(req.files.imageCover) req.body.imageCover =  req.files.imageCover[0].filename;
    if(req.files.images) req.body.images =  req.files.images.map(ele => ele.filename);

    let updated = await productModel.findByIdAndUpdate(req.params.id, req.body,{new:true})
    //console.log(updated)
    updated&& res.json({message:"Done", updated})
    !updated&& res.json({message:"Not Found subCategory"})
    // if(updatedCategory){
    //     res.json({message:"Done", updatedCategory})

    // }else{
    //     res.json({message:"Not Found Category"})
    // }
}

const deleteProduct = deleteOne(productModel);

export{
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}