import Activity from "../models/activity.js"
import mongoose from "mongoose";

//Added a length parameter to allow the generation of random tokens of varying lengths.
function generateDangerToken(length = 5) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

var dangerToken = generateDangerToken();

async function getDangerToken(req, res) {
    dangerToken = generateDangerToken();
    var response = `\
    <div>\
    <h1 style="color: darkred">Caution</h1>\
    <p>This operation is going to initialise activity section of the database, which will remove all existing records.</p>
    <p>If you wish to proceed, please add "/${dangerToken}" to the URL to confirm this operation. This operation cannot be undone.</p>\
    </div>\
    `
    res.send(response).status(200);
}

// Get all courses from database and return as json
async function getActivities(req, res) {
    res.send(await Activity.find()).status(200);
}

// Get a specific course by id
async function getActivity(req, res) {
    try {
        let query = {_id: new mongoose.Types.ObjectId(req.params.id)};
        let result = await Activity.find(query);

        if (!result || !result[0]) res.send("Activity not found").status(404);
        else res.send(result[0]).status(200);
    }
    catch (e) {
        res.send(e.message).status(400);
    }



}

async function addActivity(req, res) {
    console.log(req.body);
    let activity = new Activity({
        name: req.body.name,
        subtitle: req.body.subtitle,
        activity_type: req.body.activity_type,
        labels: req.body.labels,
        image: req.body.image,
        description: req.body.description,
        time: req.body.time,
        duration: req.body.duration,
        location: req.body.location,
        cost: req.body.cost,
        max_capacity: req.body.max_capacity,
        bookings: req.body.bookings
    });
    let result = await activity.save();
    res.send(result).status(204);
}

async function initDb(req, res) {
    var token = req.params.dangerToken;
    if (token != dangerToken)
    {
        res.send("Invalid danger token. Operation aborted.").status(401);
        return;
    }
    console.log("Hahahaha database has been cleaned!");
    let result = await Activity.deleteMany();
    var fab = new Activity({
        name: "Falls and Balance",
        subtitle: "Learn drama and acting skills with creativity and have fun while doing...",
        activity_type: "course",
        labels: ["Health and Wellbeing"],
        image: "/res/courses/Falls and Balance.jpg",
        time: Date.now(),
        duration: 120,
        location: "Longbeach PLACE",
        cost: 10,
        max_capacity: 15,
    });

    var cpsg = new Activity({
        name: "Chelsea PC Support Group",
        subtitle: "A group to share knowledge, ideas and problem solve computer issues",
        activity_type: "course",
        labels: ["Digital Skills"],
        image: "/res/courses/Microsoft Applications.jpg",
        time: Date.now(),
        duration: 180,
        location: "Longbeach PLACE",
        cost: 5,
        max_capacity: 15,
    });

    var wat = new Activity({
        name: "Walk and Talk",
        subtitle: "Join the friendly group and explore the local community",
        activity_type: "event",
        labels: ["Social and Community Groups"],
        image: "/res/courses/Walk and Talk.jpg",
        time: Date.now(),
        duration: 60,
        location: "Longbeach PLACE",
    });

    var xa = new Activity({
        name: "Xero Accounting",
        subtitle: "This course teaches participants the skills to manage the finances of …",
        activity_type: "course",
        labels: ["Digital Skills"],
        image: "/res/courses/Xero.jpg",
        time: Date.now(),
        duration: 120,
        location: "Longbeach PLACE",
        cost: 10,
        max_capacity: 15,
    });

    await fab.save();
    await cpsg.save();
    await wat.save();
    await xa.save();

    var numDeleted = result.deletedCount;
    res.send(`Database has been initialised. (${numDeleted} record${numDeleted > 1 ? "s were" : " was"} removed.)`).status(200);
}

export { getActivities, getActivity, addActivity, initDb, getDangerToken };
