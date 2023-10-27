import express from "express"
import "../controllers/activityController.js"
import {addActivity, getActivity, getActivities, initDb} from "../controllers/activityController.js";

const router = express.Router();

router.get("/", getActivities);
router.get("/details/:id", getActivity);
router.post("/add", addActivity);
router.get("/dangerdanger", initDb)

export default router;