import express from "express"
import "../controllers/activityController.js"
import {addActivity, getActivity, getActivities, initDb, getDangerToken} from "../controllers/activityController.js";

const router = express.Router();

router.get("/", getActivities);
router.get("/details/:id", getActivity);
router.post("/add", addActivity);
router.get("/dangerdanger", getDangerToken);
router.get("/dangerdanger/:dangerToken", initDb)

export default router;