

import express from 'express'
import { validation } from '../../middleware/validation.js';
import { uploadSingle } from '../../utils/fileUpload.js';
import {addBrandSchema, updateBrandSchema, getByIdSchema} from './brand.validation.js'
import { addBrand, deleteBrand, getAllBrands, getBrandById, updateBrand, } from './controller/brand.controller.js';

const BrandRoutes = express.Router();

BrandRoutes.route("/")
.post( uploadSingle('image') ,validation(addBrandSchema ), addBrand)
.get(getAllBrands)

BrandRoutes.route("/:id")
.get(validation(getByIdSchema), getBrandById)
.patch(validation(updateBrandSchema),updateBrand)
.delete(validation(getByIdSchema),deleteBrand)





export default BrandRoutes;