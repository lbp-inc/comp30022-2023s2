import Activity from "../models/activity.js"
import mongoose from "mongoose";
import DangerDanger from "../views/dangerdanger.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = "liTq9vasHanieW0Sb8ClegPSs6dZV05xHLKSiEZhPUC4KPSurj0pmJJs66L8biTNSvTxM11rUacxXX0P23clrB8vmC7i0e0RMVc";

/**
 * @function generateDangerToken
 * @description Generate a length 5 danger token
 * @returns {Promise<void>}
 */
function generateDangerToken() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

var dangerToken = generateDangerToken();

/**
 * @async
 * @function getDangerToken
 * @description Respond with the generated danger token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
async function getDangerToken(req, res) {
    dangerToken = generateDangerToken();
    const response = DangerDanger(dangerToken);
    res.send(response).status(200);
}

/**
 * @async
 * @function getActivities
 * @description Get all courses from database and return as json
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
async function getActivities(req, res) {
    res.send(await Activity.find()).status(200);
}

/**
 * @async
 * @function getActivity
 * @description Get the activity on object ID
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
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

/**
 * @async
 * @function addActivity
 * @description Add a new activity based on fields given in request body
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
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

/**
 * @async
 * @function addBooking
 * @description Update activity details
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
async function addBooking(req, res){
    try {
        const { token, bookId } = req.body;
        const verified = jwt.verify(token, JWT_SECRET);
        const currActivity = await Activity.findOne({ _id: verified._id });
        if (currActivity) {
            if (!currActivity.bookings.contains(bookId)){
                currActivity.bookings.push(bookId);
            }
            res.status(200).json({ message: "Booking recorded!" });
        } else {
            res.status(404).json({ error: "Activity not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
}

/**
 * @async
 * @function initDb
 * @description Initialise database to original state
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
async function initDb(req, res) {
    const token = req.params.dangerToken;
    if (token != dangerToken)
    {
        res.send("Invalid danger token. Operation aborted.").status(401);
        return;
    }
    console.log("Hahahaha database has been cleaned!");
    let result = await Activity.deleteMany();
    const fab = new Activity({
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

    const cpsg = new Activity({
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

    const wat = new Activity({
        name: "Walk and Talk",
        subtitle: "Join the friendly group and explore the local community",
        activity_type: "event",
        labels: ["Social and Community Groups"],
        image: "/res/courses/Walk and Talk.jpg",
        time: Date.now(),
        duration: 60,
        location: "Longbeach PLACE",
    });

    const xa = new Activity({
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

    const numDeleted = result.deletedCount;
    res.send(`Database has been initialised. (${numDeleted} record${numDeleted > 1 ? "s were" : " was"} removed.)`).status(200);
}

export { getActivities, getActivity, addActivity, initDb, getDangerToken, addBooking };