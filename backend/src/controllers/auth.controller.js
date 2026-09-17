import User from "../models/User.js";
import Message from "../models/Message.js";
import bcrypt from "bcryptjs";
import { generateToken, getAuthCookieOptions } from "../lib/utils.js";
import dotenv from "dotenv";
import { sendWelcomeEmail, sendPasswordResetEmail } from "../emails/emailHandlers.js";
import crypto from "crypto";
import cloudinary from "../lib/cloudinary.js";

dotenv.config();

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const emailRegex =  /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })


        if(newUser){
            const savedUser = await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePicture:newUser.profilePicture
            })

            try {
                await sendWelcomeEmail(savedUser.email,savedUser.fullName, process.env.CLIENT_URL);
            } catch (error) {
                console.error("Error sending welcome email:", error);
            }
        }else{
            res.status(400).json({message:"Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"invaild credentials"});
        }

        const isPasswordCorrect  = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"invaild credentials"});
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePicture:user.profilePicture
        });

    }catch(error){
        console.log("Error in login controller:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout =  (_,res) =>{
    // Reuses generateToken()'s cookie options — the attributes must match
    // what was used to set the cookie, otherwise the browser won't recognize
    // this as the same cookie and won't clear it.
    res.cookie('token','',{
        ...getAuthCookieOptions(),
        maxAge:0
    });
    res.status(200).json({message:"Logged out successfully"});
}

export const updateProfile = async (req,res) =>{
    try{
        const {profilePicture} = req.body;
        if(!profilePicture){
            return res.status(400).json({message:"Profile picture is required"});
        }
        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
        const newProfilePictureUrl = uploadResponse.secure_url;

        const updatedUser = await User.findByIdAndUpdate(userId,
            {profilePicture:newProfilePictureUrl},
            {new:true}
        )
        res.status(200).json(updatedUser);
    }catch(error){
        console.log("Error in updateProfile controller:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const removeProfilePhoto = async (req, res) => {
    try {
        const userId = req.user._id;
        const updatedUser = await User.findByIdAndUpdate(userId,
            { profilePicture: "" },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in removeProfilePhoto controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        // Delete all messages sent by or to the user
        await Message.deleteMany({
            $or: [{ senderId: userId }, { receiverId: userId }]
        });

        // Delete the user
        await User.findByIdAndDelete(userId);

        // Clear the cookie
        res.cookie('token', '', {
            ...getAuthCookieOptions(),
            maxAge: 0
        });

        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProfile controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        
        try {
            await sendPasswordResetEmail(user.email, resetURL);
            res.status(200).json({ message: "Password reset link sent to email" });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(500).json({ message: "Error sending email" });
        }
    } catch (error) {
        console.log("Error in forgotPassword controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.log("Error in resetPassword controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}