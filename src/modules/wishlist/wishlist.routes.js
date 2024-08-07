

import express from 'express'
import { protectRoutes } from '../auth/auth.controller.js';
import { addToWishList, getAllWishList, removeFromWishList } from './controller/wishlist.controller.js';

const wishListRoutes = express.Router();

wishListRoutes.patch("/", protectRoutes ,addToWishList)
wishListRoutes.delete("/", protectRoutes ,removeFromWishList)
wishListRoutes.get("/", protectRoutes ,getAllWishList)







export default wishListRoutes;