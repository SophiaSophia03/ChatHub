import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import dotenv from 'dotenv';
dotenv.config();

export const authenticateUser = async(req,res,next)=> {
  try {
    const token = req.cookies.jwt;
    if(!token) {
      return res.send(401).json({message:"Unauthourized Access: Authentication token required"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if(!decoded){
        return res.status(401).json({message:"Unauthourized Access: Token is invalid."})
      }
      const user = await User.findById(decoded.userId).select("-password");
      if(!user){
        return res.status(404).json({message:"User not found."})
      }
      req.user = user;
      next();

  } catch (error) {

  }
}