

import express from 'express'
import { addCart, getCart, removeCartItem, updateCart} from './controller/cart.controller.js';
import { protectRoutes } from '../auth/auth.controller.js';

const CartRoutes = express.Router();

CartRoutes.route("/")
.post( protectRoutes ,addCart)
.get(protectRoutes, getCart)

CartRoutes.route("/:id")
// .get( getReviewById)
.patch(protectRoutes , updateCart)
.delete(protectRoutes, removeCartItem)





export default CartRoutes;