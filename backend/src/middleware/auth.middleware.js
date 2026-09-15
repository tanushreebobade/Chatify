import jwt from 'jsonwebtoken';
import {ENV} from '../lib/env.js';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized access Token missing"});  
        }   

        let decoded;
        try {
            decoded = jwt.verify(token, ENV.JWT_SECRET);
        } catch (jwtErr) {
            res.clearCookie("token");
            return res.status(401).json({message: "Unauthorized access Invalid or expired token"});
        }

        if(!decoded){
            res.clearCookie("token");
            return res.status(401).json({message:"Unauthorized access Invalid Token"});
        }
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            res.clearCookie("token");
            return res.status(401).json({message:"Unauthorized access User not found"});
        }
        req.user = user;
        next();
    }catch(error){
        console.log("Error in protectRoute middleware:", error.message || error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}