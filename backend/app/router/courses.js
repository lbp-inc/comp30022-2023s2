import express from "express"
import "../controllers/courseController.js"
import {addCourse, getCourse, getCourses} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/add", addCourse);

export default router;