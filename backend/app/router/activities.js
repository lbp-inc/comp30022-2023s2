import express from "express"
import "../controllers/courseController.js"
import {addCourse, getCourse, getCourses, initDb} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/details/:id", getCourse);
router.post("/add", addCourse);
router.get("/dangerdanger", initDb)

export default router;