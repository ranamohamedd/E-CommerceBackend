

import express from 'express'
import { validation } from '../../middleware/validation.js';
import { uploadFields } from '../../utils/fileUpload.js';
import {addProductSchema,getByIdSchema,updateProductSchema} from './product.validation.js'
import {  addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from './controller/product.controller.js';
import { allowTo, protectRoutes } from '../auth/auth.controller.js';

const productRoutes = express.Router();

productRoutes.route("/")
.post( protectRoutes,
    allowTo("admin"),
    uploadFields([{name:"imageCover" , maxCount:1},{name:"images",maxCount:10}]) ,validation(addProductSchema ), addProduct)
.get(getAllProducts)

productRoutes.route("/:id")
.get(validation(getByIdSchema), getProductById)
.patch(uploadFields([{name:"imageCover" , maxCount:1},{name:"images",maxCount:10}]),validation(updateProductSchema),updateProduct)
.delete(validation(getByIdSchema),deleteProduct)





export default productRoutes;