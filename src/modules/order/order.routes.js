

import express from 'express'
import { protectRoutes } from '../auth/auth.controller.js';
import { addOrder, getOrder, onlinePayment } from './controller/order.controller.js';

const orderRoutes = express.Router();

orderRoutes.route("/:id").post( protectRoutes ,addOrder)
orderRoutes.route("/checkout/:id").post( protectRoutes ,onlinePayment)

orderRoutes.route("/").get(protectRoutes, getOrder)

// orderRoutes.route("/:id")
// // .get( getReviewById)
// .patch(protectRoutes , updateCart)
// .delete(protectRoutes, removeCartItem)





export default orderRoutes;