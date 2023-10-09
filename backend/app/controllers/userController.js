import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const JWT_SECRET = "liTq9vasHanieW0Sb8ClegPSs6dZV05xHLKSiEZhPUC4KPSurj0pmJJs66L8biTNSvTxM11rUacxXX0P23clrB8vmC7i0e0RMVc";

import Message from "../models/messageModel.js";
import Course from "../models/courseModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    // find user
    const userModel = await UserModel.findOne({ username });

    if (userModel) {
      if (!userModel.isEmailVerified) {
        res.status(201).json({ message: "Email has not verified" });
      } else {
        if (await userModel.matchPassword(password)) {
          const token = jwt.sign({ _id: userModel._id }, JWT_SECRET);
          const auth_token = jwt.sign({ role: userModel.role }, JWT_SECRET);
          //const token = jwt.sign({_id: userModel._id}, JWT_SECRECT);
          res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
          res.status(200).json({ message: "Login successful", data: { token, auth_token, role: userModel.role } });
        } else {
          res.status(401).json({ message: "Unauthorized - Invalid credentials" });
        }
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error - An error occurred" });
  }
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUserModel = await UserModel.findOne({ $or: [{ username }, { email }] });

    if (existingUserModel) {
      let message = "";
      if (existingUserModel.username === username) message += "Username already exists. ";
      if (existingUserModel.email === email) message += "Email already exists.";
      return res.status(409).json({ message });
    }

    const userModel = await UserModel.create({
      username,
      email,
      password,
      isEmailVerified: false,
      name: "",
      gender: "",
      birthday: "",
      phone: "",
    });

    if (userModel) {
      res.status(201).json({ status: "User created successfully" });
    } else {
      console.error(error);
      res.status(500).json({ message: "System error, please try again" });
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
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const token = req.body.token;
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    const userModel = await UserModel.findOne({ _id: verified._id });
    if (userModel) {
      console.log("aasdad");
      res.status(200).json({
        message: "Find Successfully!",
        data: {
          name: userModel.name,
          gender: userModel.gender,
          birthday: userModel.birthday,
          email: userModel.email,
          phone: userModel.phone,
        },
        role: userModel.role,
      });
    } else {
      res.status(404).json({ message: "User Not Found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System error, please try again" });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { token, name, gender, birthday, email, phone } = req.body;
    const verified = jwt.verify(token, JWT_SECRET);
    const userModel = await UserModel.findOne({ _id: verified._id });
    if (email !== userModel.email) {
      userModel.email = email;
      user.isEmailVerified = false;
      await userModel.save();
    }
    if (userModel) {
      userModel.name = name;
      userModel.gender = gender;
      userModel.birthday = birthday;
      userModel.email = email;
      userModel.phone = phone;
      await userModel.save();
      res.status(200).json({ message: "Update successful!", role: userModel.role });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const userModel = await UserModel.findOne({ email });
    if (!userModel) {
      return res.status(211).json({ message: "Email does not exist!" });
    }
    const secret = JWT_SECRET + userModel.password;
    const token = jwt.sign({ email: userModel.email, username: userModel.username }, secret, { expiresIn: "5m" });
    const link = `http://localhost:3000/reset-password/${userModel.username}/${token}`;
    const mailText = `Dear ${userModel.username},

    We have received a request to reset your password. To reset your password, please click on the link below:

    ${link}

    If you did not request this password reset, you can ignore this email. Your account's security is important to us, and no changes will be made unless you confirm the request.

    Thank you for using our service.

    Best regards,
    Your Longbeach Place Team`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rui487165@gmail.com",
        pass: "rtdbgkyvylaziyzw",
      },
    });

    var mailOptions = {
      from: "rui487165@gmail.com",
      to: email,
      subject: "Password Reset",
      text: mailText,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
    res.status(200).json({ message: "Password reset instructions sent to your email", data: token, role: userModel.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error - An error occurred" });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { username, token, password } = req.body;
  const userModel = await UserModel.findOne({ username });
  if (!userModel) {
    res.status(211).json({ message: "Email does not exist!" });
  }
  const secret = JWT_SECRET + userModel.password;
  try {
    const verify = jwt.verify(token, secret);
    userModel.password = password;
    await userModel.save();
    res.status(200).json({ message: "Password Updated!", email: verify.email, role: userModel.role });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please resend the verified email" });
  }
});

const emailVerify = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const userModel = await UserModel.findOne({ email });
    if (!userModel) {
      return res.status(211).json({ message: "Invalid or expired verification token" });
    }
    const link = `http://localhost:3000/login`;
    const mailText = `Dear ${userModel.username},

    We have received a request to verified email. You have successfully created your account please click on the link below:

    ${link}

    If you did not register an account, you can ignore this email. Your account's security is important to us, and no changes will be made unless you confirm the request.

    Thank you for using our service.

    Best regards,
    Your Longbeach Place Team`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rui487165@gmail.com",
        pass: "rtdbgkyvylaziyzw",
      },
    });

    var mailOptions = {
      from: "rui487165@gmail.com",
      to: userModel.email,
      subject: "Password Reset",
      text: mailText,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    userModel.isEmailVerified = true;
    await userModel.save();
    return res.status(200).json({ message: "Email verified successfully", role: userModel.role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc    Get user groups
// @route   GET /api/get-user-groups
// @access  Private/Admin
const getUserGroups = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  if (courses) {
    let courseNames = courses.map((course) => course.course_name);
    res.json(courseNames);
  } else {
    res.status(404);
    throw new Error("Courses not found");
  }
});

// @desc    Get users by user groups
// @route   POST /api/get-user-list-by-group
// @access  Private/Admin
const getUserListByGroup = asyncHandler(async (req, res) => {
  const { groups } = req.body;
  const courses = await Course.find({ course_name: { $in: groups } });
  if (!courses) {
    res.status(404);
    throw new Error("Course not found");
  }

  let userList = [];
  courses.forEach((course) => {
    course.user_list.forEach((username) => {
      if (!userList.includes(username)) {
        userList.push(username);
      }
    });
  });

  const userModel = await UserModel.find({ username: { $in: userList } }, { username: 1, email: 1, _id: 0 });
  if (!userModel) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(userModel);
});

// @desc    Send message
// @route   POST /api/send-message
// @access  Private/Admin
const sendMessage = asyncHandler(async (req, res) => {
  const { subject, text, isEmail, recipients, token } = req.body;
  const decoded = jwt.verify(token, JWT_SECRET);
  const userModel = await UserModel.findOne({ username: decoded.username });
  // if (!userModel || userModel.role !== "admin") {
  //   res.status(403).json({ error: "Admin permission required!" });
  // }

  // get the list of users from all the courses
  const courses = await Course.find({ course_name: { $in: recipients } });
  if (!courses) {
    res.status(404);
    throw new Error("Course not found");
  }

  let userList = [];
  courses.forEach((course) => {
    course.user_list.forEach((username) => {
      if (!userList.includes(username)) {
        userList.push(username);
      }
    });
  });

  const users = await UserModel.find({ username: { $in: userList } }, { username: 1, email: 1, _id: 0 });
  if (!users) {
    res.status(404);
    throw new Error("User not found");
  }

  // save the message to the database
  const message = await Message.create({
    title: subject,
    content: text,
    group_list: recipients,
    user_list: users,
    isEmail: isEmail,
  });

  if (message) {
    res.status(201).json(message);
  } else {
    res.status(500);
    throw new Error("Error sending the message");
  }
});

// @desc    Get unread message number
// @route   GET /api/get-unread-msg-num
// @access  Private/User
const getUnreadMsgNum = asyncHandler(async (req, res) => {
  const user = req.user;
  const messages = await Message.find({ "user_list.username": user.username });
  let unreadNum = 0;
  messages.forEach((msg) => {
    msg.user_list
      .filter((u) => u.username == user.username && !u.isRead)
      .forEach((u) => {
        unreadNum++;
      });
  });
  res.json({ unreadNum });
});

// @desc    Get all messages for a user
// @route   GET /api/get-msg-list
// @access  Private/User
const getMsgList = asyncHandler(async (req, res) => {
  const user = req.user;
  const messages = await Message.find({ "user_list.username": user.username });
  const msgsForUser = messages.map((msg) => {
    return {
      title: msg.title,
      content: msg.content,
      isRead: msg.user_list.find((u) => u.username == user.username).isRead,
    };
  });
  res.json(msgsForUser);
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, forgetPassword, resetPassword, emailVerify, getUserGroups, getUserListByGroup, sendMessage, getUnreadMsgNum, getMsgList };
