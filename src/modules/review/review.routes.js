

import express from 'express'
import { addReview, deleteReview, getAllReviews, getReviewById, updateReview } from './controller/review.controller.js';
import { protectRoutes } from '../auth/auth.controller.js';

const ReviewRoutes = express.Router();

ReviewRoutes.route("/")
.post( protectRoutes ,addReview)
.get(getAllReviews)

ReviewRoutes.route("/:id")
.get( getReviewById)
.patch(protectRoutes , updateReview)
.delete(protectRoutes, deleteReview)





export default ReviewRoutes;