import express from "express";
const router = express.Router();

import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, forgetPassword, resetPassword, emailVerify, getUserGroups, getUserListByGroup, sendMessage, getUnreadMsgNum, getMsgList } from "../controllers/userController.js";

import { admin } from "../utils/authHandler.js";

router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
//router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.post("/getInfo", getUserProfile);
router.post("/updateInfo", updateUserProfile);
router.post("/verify-email", emailVerify);

router.route("/get-user-groups").get(admin, getUserGroups);
router.route("/get-user-list-by-group").post(admin, getUserListByGroup);
router.route("/send-message").post(admin, sendMessage);
router.route("/get-unread-msg-num").get(getUnreadMsgNum);
router.route("/get-msg-list").get(getMsgList);

export default router;
