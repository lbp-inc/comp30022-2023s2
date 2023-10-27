import Activity from "../models/activity.js"
import mongoose from "mongoose";

// Get all courses from database and return as json
async function getActivities(req, res) {
    res.send(await Activity.find()).status(200);
}

// Get a specific course by id
async function getActivity(req, res) {
    try {
        let query = {_id: new mongoose.Types.ObjectId(req.params.id)};
        let result = await Activity.find(query);

        if (!result) res.send("Activity not found").status(404);
        else res.send(result).status(200);
    }
    catch (e) {
        res.send(e.message).status(400);
    }



}

async function addActivity(req, res) {
    console.log(req.body);
    let activity = new Activity({
        name: req.body.name,
        type: req.body.type,
        image: req.body.image,
        description: req.body.description,
        time: req.body.time,
        duration: req.body.duration,
        address: req.body.address,
        cost: req.body.cost,
        users: req.body.users,
    });
    let result = await activity.save();
    res.send(result).status(204);
}

async function initDb(req, res) {
    console.log("Hahahaha database has been cleaned!");
    let result = await Activity.deleteMany();
    res.send(result).status(200);
}

export { getActivities, getActivity, addActivity, initDb };