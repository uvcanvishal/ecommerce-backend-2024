import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const adminOnly=TryCatch(async(req,res,next)=>{
    const {id}=req.query;

    if(!id) return next(new ErrorHandler("Please Login",401));

    const user=await User.findById(id);
    if(!user)
    return next(new ErrorHandler("Authorization Failed",401));

    if(user.role!=="admin")
    return next(new ErrorHandler("Not Authorized",403));

    next();

})