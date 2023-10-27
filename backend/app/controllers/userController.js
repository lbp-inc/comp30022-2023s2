import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const JWT_SECRET = "liTq9vasHanieW0Sb8ClegPSs6dZV05xHLKSiEZhPUC4KPSurj0pmJJs66L8biTNSvTxM11rUacxXX0P23clrB8vmC7i0e0RMVc";

import Message from "../models/messageModel.js";
import Course from "../models/activity.js";

/**
 * @async
 * @function authUser
 * @description Authenticate a user with username and password
 * @param {object} req - Express request object, expects username and password in body
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const usernameOrEmail = username;
  try {
    // find user
    const userModel = await UserModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
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

/**
 * @async
 * @function registerUser
 * @description Register a new user, expects username, email and password in the request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
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
      emailVerificationCode: "",
    });

    if (userModel) {
      const token = jwt.sign({ _id: userModel._id }, JWT_SECRET);
      res.status(201).json({ status: "User created successfully", data: token });
    } else {
      console.error(error);
      res.status(500).json({ message: "System error, please try again" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * @function logoutUser
 * @description Logout a user by clearing the jwt cookie.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

/**
 * @async
 * @function getUserProfile
 * @description Get the profile of a user, requires jwt token in request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
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
/**
 * @async
 * @function updateUserProfile
 * @description Update user profile, requires jwt token and new user data in request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { token, name, gender, birthday, email, phone } = req.body;
    const verified = jwt.verify(token, JWT_SECRET);
    const userModel = await UserModel.findOne({ _id: verified._id });
    if (userModel && email !== userModel.email) {
      userModel.email = email;
      userModel.isEmailVerified = false;
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

/**
 * @async
 * @function forgetPassword
 * @description Sends an email to reset user's password
 * @param {object} req - Express request object, expects email in body
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
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

/**
 * @async
 * @function resetPassword
 * @description Resets a user's password, requires username, token and password in request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
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

/**
 * @async
 * @function getrole
 * @description Get the role of a user, requires jwt token in request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const getrole = asyncHandler(async (req, res) => {
  try {
    const { token } = req.body;
    const verified = jwt.verify(token, JWT_SECRET);
    const userModel = await UserModel.findOne({ _id: verified._id });
    res.status(200).json({ message: "User found", role: userModel.role });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @function generateRandomCode
 * @description Generate a random six-digit code
 * @returns {string} A random six-digit code
 */
const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * @async
 * @function emailVerify
 * @description Verify an email, expects email in request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const emailVerify = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const userModel = await UserModel.findOne({ email });
    if (!userModel) {
      return res.status(211).json({ message: "Invalid or expired verification token" });
    }
    const verificationCode = generateRandomCode();
    const mailText = `Dear ${userModel.username},
    
    Your verification code is: ${verificationCode}

    If you did not request this code, you can ignore this email. Your account's security is important to us, and no changes will be made unless you confirm the request.

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
      subject: "Email Verification",
      text: mailText,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    userModel.emailVerificationCode = verificationCode;
    await userModel.save();
    return res.status(200).json({ message: "Email verified successfully", role: userModel.role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @async
 * @function emailCodeMatch
 * @description Match verification code for email verification, expects email and code in request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const emailCodeMatch = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  try {
    const userModel = await UserModel.findOne({ email });
    if (userModel && code === userModel.emailVerificationCode) {
      userModel.isEmailVerified = true;
      userModel.emailVerificationCode = "";
      await userModel.save();
      return res.status(200).json({ message: "Email verified successfully" });
    } else {
      return res.status(211).json({ message: "email verified fail!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @async
 * @function getUserGroups
 * @description Get all user groups
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const getUserGroups = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  if (courses) {
    let courseNames = courses.map((course) => course.name);
    res.json(courseNames);
  } else {
    res.status(404);
    throw new Error("Courses not found");
  }
});

/**
 * @async
 * @function getUserListByGroup
 * @description Get users by user group, expects groups in request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const getUserListByGroup = asyncHandler(async (req, res) => {
  const { groups } = req.body;
  const courses = await Course.find({ name: { $in: groups } });
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

/**
 * @async
 * @function sendMessage
 * @description Send messages to group, expects subject, text, isEmail, recipients and token in request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const sendMessage = asyncHandler(async (req, res) => {
  const { subject, text, isEmail, recipients, token } = req.body;
  const decoded = jwt.verify(token, JWT_SECRET);
  const userModel = await UserModel.findOne({ username: decoded.username });
  // if (!userModel || userModel.role !== "admin") {
  //   res.status(403).json({ error: "Admin permission required!" });
  // }

  // get the list of users from all the courses
  const courses = await Course.find({ name: { $in: recipients } });
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

/**
 * @async
 * @function getUnreadMsgNum
 * @description Get number of unread messages for a user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
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

/**
 * @async
 * @function getMsgList
 * @description Get all messages for a user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
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

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, forgetPassword, resetPassword, emailVerify, getUserGroups, getUserListByGroup, sendMessage, getUnreadMsgNum, getMsgList, getrole, emailCodeMatch };
