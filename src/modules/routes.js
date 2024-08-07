import authRouter from "./auth/auth.routes.js"
import BrandRoutes from "./brand/brand.routes.js"
import categoryRoutes from "./category/category.routes.js"
import productRoutes from "./product/product.routes.js"
import ReviewRoutes from "./review/review.routes.js"
import subCategoryRoutes from "./subCategory/subCategory.routes.js"
import userRoutes from "./user/user.routes.js"
import wishListRoutes from "./wishlist/wishlist.routes.js"
import { AppError } from "../utils/AppError.js"
import couponRoutes from "./coupon/coupon.routes.js"
import CartRoutes from "./cart/cart.routes.js"
import orderRoutes from "./order/order.routes.js"




export const allRoutes = (app)=>{
    app.use('/api/v1/category',categoryRoutes)
    app.use('/api/v1/subCategory',subCategoryRoutes)
    app.use('/api/v1/brand',BrandRoutes)
    app.use('/api/v1/product',productRoutes)
    app.use('/api/v1/user',userRoutes)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/review',ReviewRoutes)
    app.use('/api/v1/wishList',wishListRoutes)
    app.use('/api/v1/coupon',couponRoutes)
    app.use('/api/v1/cart',CartRoutes)
    app.use('/api/v1/order',orderRoutes)






    

    app.use("*", (req,res,next) =>{
        next(new AppError("URL NOT FOUND", 404))
      })


}