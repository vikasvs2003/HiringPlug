import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";




export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            });
        };

        const file = req.file;
        const fileuri = getDataUri(file);
        const cloudResponse= await cloudinary.uploader.upload(fileuri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'user is already exist with this email',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hased password",hashedPassword);
        

         await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            },
            // file: req.file ? req.file.path : null, 

        })
        return res.status(201).json({
            message: 'account created succesfully',
            success: true,
         
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });

    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'incorrect mail or password.',
                success: false,

            })

        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: 'incorrect mail or password.',
                success: false,

            })
        };
        //check role is correct or not
        if (role != user.role) {
            return res.status(400).json({
                message: 'account does not exist with current role',
                success: false,
            })
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
            // bio: user.bio,  // If available
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `welcome back  ${user.fullname}`,
            user,
            success: true,
        });
    } catch (error) {
        console.log(error);

    }

}

export const logout = async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:'logout  successfullly ',
            success:true,
        })
    }catch(error){
        console.log(error);
    }
}

export const updateProfile = async (req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills}=req.body;
        
        const file=req.file;
        
        // Convert file to data URI for Cloudinary upload
        const fileUri=getDataUri(file);
        // const cloudResponse= await cloudinary.uploader.upload(fileUri.content);
       
        const cloudResponse= await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "auto", // Detects the file type automatically
           
        });
        
        
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId=req.id;//middleware authentication


        let user=await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"usr not found",
                success:false
            })
        }


        //updating data
        if(fullname) user.fullname=fullname
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(email) user.email=email
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills = skillsArray
        
       
        // If the file was uploaded, save the Cloudinary URL and the original file name
        if(cloudResponse){
            user.profile.resume=cloudResponse.secure_url//save the cloudinary url
            user.profile.resumeOriginalName=file.originalname //save the original file name 
        }
        
          


        await user.save();


        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }
        return res.status(200).json({
            message :"profile updated successfully ",
            user,
            success:true,
        })
    }catch(error){
        console.log(error);
        
    }
}