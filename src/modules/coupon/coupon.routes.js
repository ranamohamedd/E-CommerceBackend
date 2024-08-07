

import express from 'express'
import { protectRoutes } from '../auth/auth.controller.js';
import { addCoupon, deleteCoupon, getAllCoupons, getCouponById, updateCoupon } from './controller/coupon.controller.js';

const couponRoutes = express.Router();

couponRoutes.route("/")
.post( protectRoutes ,addCoupon)
.get(getAllCoupons)

couponRoutes.route("/:id")
.get( getCouponById)
.patch(protectRoutes , updateCoupon)
.delete(protectRoutes, deleteCoupon)





export default couponRoutes;