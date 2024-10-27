import jwt from "jsonwebtoken"
import asyncHandler from "./AsyncHandler.js"
import ErrorResponse from "../util/ErrorResonse.js";
import User from "../models/userModel.js";


export const protect = asyncHandler(async (req, res, next) => {
  console.log("Protect middleware is active");
  const token = req.cookies.jwt;
  console.log("oorv",token)
  if(!token) return(next(new ErrorResponse(401, "Not authorised to acess this route!")))
   
  try{
   const decoded = jwt.verify(token, process.env.JWT_SECRET); 
   const id = decoded.userId;
   console.log("id ", id);
   req.user = await User.findById(id);
   if(!req.user) return (next(new ErrorResponse(404, "User not Found!!")))

  }catch(e) {
    next(new ErrorResponse(401,'Not authorised to access this route 2'))
   }

   next();
})

export const roleCheck = asyncHandler(async (req,res, next) => {
       if(req.user && req.user.isAdmin){
        next();
       }else{
        next(new ErrorResponse(401,'Not authorised to access without admin role'))
       }
})