import jwt from 'jsonwebtoken'
import { AppError } from "../../utils/AppError.js";
import * as bcrypt from 'bcrypt';
import { handleError } from "../../middleware/handleError.js";
import userModel from '../../../db/models/user.model.js'

export const signUp = handleError(
    async(req,res,next) =>{
        let isFound = await userModel.findOne({email:req.body.email});
        console.log(isFound);
        if(isFound) next(new AppError("Email already exist",409))
            let user = new userModel(req.body)
        await user.save()
        res.json({message:"added", user})
    }
)
//E:\RouteBackend\NodeJs\Assignments\E-Commerce\src\utils\AppError.js

export const signIn = handleError(
    async(req,res,next) =>{
        let {email,password} = req.body;
        let isFound = await userModel.findOne({email});
        const matched = await bcrypt.compare(password, isFound.password);
        console.log(email)
        console.log(isFound.email)
        console.log(password)
        console.log(isFound.password)
        console.log("before if")
        if(isFound.email == email && isFound.password == password){
            let token = jwt.sign({name:isFound.name, userId:isFound._id, role:isFound.role},"treka")
            return res.json({message:"success",token})
        }
        next(new AppError("incorrect email or password",401))

    }
)



export const protectRoutes = handleError(async (req, res, next) => {
    let { token } = req.headers;
    console.log("Received token:", token); 
    if (!token) return next(new AppError("please provide token", 401)) 
     
    let decoded = await jwt.verify(token, "treka");
    //console.log(decoded.iat);
    let user = await userModel.findById(decoded.userId)
    if(!user) return next(new AppError("invalid user",404))
    if(user.changePasswordAt){
        let changePasswordTime = parseInt(user.changePasswordAt.getTime()/1000)
       // console.log(changePasswordTime, "******",decoded.iat)
        if(changePasswordTime> decoded.iat) return next(new AppError("token invalid", 401))

    }
    req.user = user

    
    next()
   
    
});


export const allowTo = (...roles) =>{
    
    return handleError((req,res,next) =>{
        if(!roles.includes(req.user.role)) return next(new AppError("not authorized",403))
            next()

    })

}