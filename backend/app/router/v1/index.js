import express from "express";
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, forgetPassword, resetPassword,emailVerify} from "../../controllers/userController.js";
import { protect } from "../../utils/asyncHandler.js";


router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
//router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.post("/getInfo", getUserProfile);
router.post("/updateInfo", updateUserProfile);
router.post("/verify-email", emailVerify);
export default router;
