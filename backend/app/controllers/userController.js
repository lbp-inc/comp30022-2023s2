import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import UserInfo from "../models/userInfo.js";
import generateToken from "../utils/token/generateToken.js";

import nodemailer from "nodemailer";
//change2
import jwt from "jsonwebtoken";
const JWT_SECRET = "liTq9vasHanieW0Sb8ClegPSs6dZV05xHLKSiEZhPUC4KPSurj0pmJJs66L8biTNSvTxM11rUacxXX0P23clrB8vmC7i0e0RMVc";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    // find user
    const user = await User.findOne({username});

    if (user) {
      if(!user.isEmailVerified){
        res.status(201).json({ message: "Email has not verified" });
      }else{
        if (await user.matchPassword(password)) {
          // generate token
          //generateToken(res, user.username);
          const token = jwt.sign({username: user.username}, JWT_SECRET);
          const auth_token = jwt.sign({role: user.role}, JWT_SECRET);
          //const token = jwt.sign({_id: user._id}, JWT_SECRECT);
          res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
          res.status(200).json({ message: "Login successful" ,data: {token, auth_token, role: user.role}});
        } else {
          //false
          res.status(401).json({ message: "Unauthorized - Invalid credentials" });
        }
      }
    } else{
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error - An error occurred" });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

  const { username, email, password} = req.body;
  try {
    const existingUser = await User.findOne({username});
    const existingEmail = await User.findOne({ email });
    if (existingUser && existingEmail) {
      res.status(409).json({ message: "Username already exists and Email already exists" });
    } else if(existingUser){
      res.status(411).json({ message: "Username already exists" });
    }else if(existingEmail){
      res.status(422).json({ message: "Email already exists" });
    } else {
      //const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password,
        isEmailVerified: false,
      });
      const userInfo = await UserInfo.create({
        name: "",
        gender:"",
        birthday:"",
        email,
        phone:"",
        username,
      });
      if (user&&userInfo) {
        res.status(201).json({ status: "User created successfully"});
      } else {
        console.error(error);
        res.status(500).json({ message: "System error, please try again" });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  //const user = await User.findById(req.user._id);
  // const token = req.headers.authorization.split(' ')[1];
  const token = req.body.token;
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    // const userInfo = await UserInfo.findOne(verified.email);
    const userInfo = await UserInfo.findOne({ username: verified.username });
    if (userInfo) {
      console.log("aasdad");
      res.status(200).json({message: "Find Successfully!", data: {
        //_id: userInfo._id,
        name: userInfo.name,
        gender:userInfo.gender,
        birthday:userInfo.birthday,
        email:userInfo.email,
        phone:userInfo.phone,
        //email: userInfo.email,
      }});
    } else {
      res.status(404).json({message: "User Not Found!"});
      //throw new Error('User not found');
      console.log("cccccccc")
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "System error, please try again" });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const {token, name, gender, birthday, email, phone} = req.body;
    const verified = jwt.verify(token, JWT_SECRET);
    const userInfo = await UserInfo.findOne({ username: verified.username });
    if (userInfo){
      userInfo.name = name;
      userInfo.gender = gender;
      userInfo.birthday = birthday;
      userInfo.email = email;
      userInfo.phone = phone;
      await userInfo.save();
      res.status(200).json({message:"Update successful!"});
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});


const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(211).json({ message: "Email does not exist!" });
    }
    const secret = JWT_SECRET + user.password;
    const token = jwt.sign({email: user.email, username:user.username}, secret,{expiresIn:'5m'});
    const link = `http://localhost:3000/reset-password/${user.username}/${token}`;
    const mailText = 
    `Dear ${user.username},

    We have received a request to reset your password. To reset your password, please click on the link below:

    ${link}

    If you did not request this password reset, you can ignore this email. Your account's security is important to us, and no changes will be made unless you confirm the request.

    Thank you for using our service.

    Best regards,
    Your Longbeach Place Team`;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rui487165@gmail.com',
        pass: 'rtdbgkyvylaziyzw'
      }
    });

    var mailOptions = {
      from: 'rui487165@gmail.com',
      to: email,
      subject: 'Password Reset',
      text:mailText,
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    console.log(link);
    res.status(200).json({ message: 'Password reset instructions sent to your email', data: token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error - An error occurred" });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const{username, token, password} = req.body;
  const user = await User.findOne({ username });
  if (!user) {
     res.status(211).json({ message: "Email does not exist!" });
  }
  const secret = JWT_SECRET + user.password;
  try {
    const verify = jwt.verify(token,secret);
    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password Updated!",email:verify.email});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please resend the verified email" });
  }
});

const emailVerify = asyncHandler(async (req,res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({ email});
    if (!user) {
      return res.status(211).json({ message: 'Invalid or expired verification token' });
    }
    const link = `http://localhost:3000/login`;
    const mailText = 
    `Dear ${user.username},

    We have received a request to verified email. You have successfully created your account please click on the link below:

    ${link}

    If you did not register an account, you can ignore this email. Your account's security is important to us, and no changes will be made unless you confirm the request.

    Thank you for using our service.

    Best regards,
    Your Longbeach Place Team`;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rui487165@gmail.com',
        pass: 'rtdbgkyvylaziyzw'
      }
    });

    var mailOptions = {
      from: 'rui487165@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      text:mailText,
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    user.isEmailVerified = true;
    await user.save();
    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  forgetPassword,
  resetPassword,
  emailVerify
};
