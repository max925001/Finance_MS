import User from "../models/userModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import sendEmail from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken'

const cookieOption ={
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
       sameSite:'None',
    secure:true
  
  }


const createAccount = async(req,res,next) =>{


    const {username ,fullName ,email ,password} = req.body
    console.log(username,fullName,password,email)

    if(!username || !fullName || !email || !password ){
        return res.status(400).json({message : "Please fill in all fields" })
    }

    try {
        
        const ExistUser = await User.findOne({username})
        if(ExistUser){
         return res.status(400).json({
            success:false,
            message:"Username already Exist! Please try with another Username"})

        }


        const avatarLocalPath = req.file.path
        // console.log("file",avatarLocalPath)
        
          const avatar = await uploadOnCloudinary(avatarLocalPath)
             console.log(avatar)
               if(!avatar){
        
        
                console.log("Avatar file is required")
               }
             
               const user = await User.create({
                username ,
                fullName ,
                email ,
                password,
                Avatar:avatar.secure_url || '',
               
            })
            
        if(!user){
       res.status(400).json({
        success:false,
        message:"Failed to create user"
       })
        }
        
        res.status(201).json(
           new ApiResponse( 200 ,user ,"Account created succesfully")
        )
      

    } catch (error) {

        console.log("somethings went wrong",error)
    }

}


const login = async (req,res) =>{

const {username ,password} = req.body

if(!username || !password){
    return res.status(400).json({
        success:false,
        message:"username and password are required"
    })
}
const user = await User.findOne({username})

if(!user || !await user.comparePassword(password)){
    return res.status(400).json({
        success:false,
        message:"Invalid username or password"
    })
}

const token = await  user.generateJWTtoken()
user.password=undefined

res.cookie("token" ,token,cookieOption)
res.status(200).json(
    new ApiResponse(200,user," User Loged in Succesfully")
)



}


const logout = async (req ,res) =>{

res.cookie("token",null,{
    maxAge:0,
    httpOnly:true,
    secure:true,
})
res.status(200).json(
    new ApiResponse(200 ,{},"user logout succesfully")
)



}

const getUserDetails = async (req,res) =>{

    const userID = req.user.id

     const user =await User.findById(userID)
     if(!user){
        res.status(400).json({
            success:false,
            message:"User not found!"
        })
     }
     res.status(200).json(
        new ApiResponse(200,user,"User details fetched successfully")
     )

}



const requestPasswordReset = async (req, res) => {
    const {email}  = req.body;
    console.log(email)
  
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "No account with that email address exists." });
      }
  
      const resetToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  console.log("user1",user)
      await user.save();
  
      const resetUrl = `https://finance-ms-git-main-shivam-pandeys-projects-b8c749d7.vercel.app/newPassword/${resetToken}`;
      const message = `
        You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetUrl}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n
      `;
  
       const sendEmaildata =await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        text: message,
      });
  
      if(!sendEmaildata){
        return res.status(500).json({ success: false, message: "Error sending password reset email." });
      }
       return res.status(200).json(
        new ApiResponse( 200,user,  "Password reset email sent.")
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error processing password reset request." });
    }
  };
  
  // Reset Password
  const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log(password,token)
  
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decoded.id, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  
      if (!user) {
        return res.status(400).json({ success: false, message: "Password reset token is invalid or has expired." });
      }
  
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.status(200).json(  new ApiResponse( 200 ,user ,"Password Change Succesfully"));
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error resetting password." });
    }
  };

  




export {createAccount ,login,logout ,getUserDetails,requestPasswordReset,resetPassword}