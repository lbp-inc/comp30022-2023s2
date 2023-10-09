import express from "express";
import RoomHire from "../models/roomHireModel.js";
import { InvalidBookingEmailError, InvalidBookingNameError, InvalidBookingPhoneError, InvalidDateError, InvalidRoomNameError, InvalidStatusError } from "../exceptions/roomHireExceptions.mjs";


const router = express.Router();

// ########################### GET ENDPOINTS ###########################

async function getRoomHire(query) {
    // Connect to the MongoDB cluster and collections
    const roomHireCollection = client.db('it_project').collection('room_hires');
    const roomCollection = client.db('it_project').collection('rooms');


    // Search for room hire object and manually join on room table
    const roomHire = await roomHireCollection.findOne(query);
    const room = await roomCollection.findOne(roomHire['room']);

    if (roomHire) {
        console.log('Found item:');
    } else {
        console.log('Item not found');
    }
    roomHire.room = room;
    return roomHire;

}

router.get("/", async (req, res) => {
    // Call the function to request an item
    try {
        let results = await getRoomHire(req.query);
        res.send(results).status(200);
    } catch (error) {
        console.error('Error requesting item from MongoDB', error);
        res.status(400).send(error);
    }
});

async function getAllRoomHires(date) {
    // Connect to the MongoDB cluster and collections
    const roomHireCollection = client.db('it_project').collection('room_hires');
    const roomCollection = client.db('it_project').collection('rooms');
    var roomHires;

    // Search for room hire object and manually join on room table
    if (date != null) {
        roomHires = await roomHireCollection.find({ startTime: { $gte: date } }).toArray();
    }
    else {
        // if no date specified, date is now (all future bookings)
        roomHires = await roomHireCollection.find({ startTime: { $gte: new Date() } }).toArray();
    }
    const rooms = await roomCollection.find().toArray();

    if (roomHires) {
        console.log('Found item:', roomHires);
    } else {
        console.log('Item not found');
    }
    roomHires.forEach(roomHire => {
        roomHire.room = rooms.find(room => room._id == roomHire.room);
    });
    return roomHires;

}

router.get("/all", async (req, res) => {
    // Call the function to request an item
    try {
        let results = await getAllRoomHires(req.query.date);
        res.send(results).status(200);
    } catch (error) {
        console.error('Error requesting item from MongoDB', error);
        res.status(400).send(error);
    }
});



// ########################### POST ENDPOINTS ###########################

function validateRoomHire(roomHire) {
    // Check if room hire object is valid

    function isFutureDate(targetDateString) {
        const currentDate = new Date();
        const targetDate = new Date(targetDateString);
        return targetDate > currentDate;
    }

    // if (!roomHire.roomName) {
    //     throw new InvalidRoomNameError("Room name is required");
    // }
    if (!roomHire.startTime || !isFutureDate(roomHire.startTime)) {
        // start time is not a future date
        throw new InvalidDateError("Start time is not a future date");
    }
    if (!roomHire.endTime || !isFutureDate(roomHire.endTime)) {
        // end time is not a future date
        throw new InvalidDateError("End time is not a future date");
    }
    if (!roomHire.bookingName) {
        throw new InvalidBookingNameError("Booking name is required");
    }
    if (!roomHire.bookingEmail) {
        throw new InvalidBookingEmailError("Booking email is required");
    }
    if (!roomHire.bookingPhone) {
        throw new InvalidBookingPhoneError("Booking phone is required");
    }
    if (!roomHire.status) {
        throw new InvalidStatusError("Status is required");
    }
    if (new Date(roomHire.startTime) > new Date(roomHire.endTime)) {
        throw new InvalidDateError("Start time is after end time");
    }

    return true;
}


async function postRoomHire(roomHire) {
    // Connect to the MongoDB cluster and collections
    const roomHireCollection = client.db('it_project').collection('room_hires');
    const roomCollection = client.db('it_project').collection('rooms');

    // Get object id of room
    const id = await roomCollection.findOne({ roomName: roomHire.roomName });
    roomHire.room = id._id;

    delete roomHire.roomName

    // Validate room hire object
    validateRoomHire(roomHire);

    // Insert a single document
    const result = await roomHireCollection.insertOne(roomHire);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return result;
}

router.post("/", async (req, res) => {
    // Validate input
    try {
        validateRoomHire(req.body);
        let results = await postRoomHire(req.body);
        res.status(200).send(results);
    } catch (error) {
        res.status(422).send(error.toString());
        return;
    }
});



// ########################### PUT ENDPOINTS ###########################


async function updateRoomHire(roomHireID, roomHire) {
    // Connect to the MongoDB cluster and collections
    const roomHireCollection = client.db('it_project').collection('room_hires');
    const roomCollection = client.db('it_project').collection('rooms');

    const modifyVals = (previousOnj, newObj) => {
        // only updates vals that need to be updated
        for (const key in newObj) {
            if (newObj[key] !== previousOnj[key]) {
                previousOnj[key] = newObj[key];
            }
        }
        return previousOnj;
    }

    // Get pre-existing object
    const preRoomHire = await roomHireCollection.findOne({ _id: new ObjectId(roomHireID) });
    // modify keys that need to be updated
    const newRoomHire = modifyVals(preRoomHire, roomHire);

    // Update
    const result = await roomHireCollection.updateOne(
        { _id: new ObjectId(roomHireID) },
        { $set: newRoomHire }
    );
    console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`);
    console.log(`Updated room hire with the following id: ${roomHireID}`);
    return result;
}

router.put("/", async (req, res) => {
    // Call the function to update an item
    try {
        let results = await updateRoomHire(req.query.roomHireID, req.body);
        res.send(results).status(200);
    }
    catch (error) {
        console.log("Error updating room hire", error.toString());
        res.status(400).send(error.toString());
    }
});

async function changeStatus(roomHireID, status) {
    // Change status of room hire object

    // Connect to the MongoDB cluster and collections
    const roomHireCollection = client.db('it_project').collection('room_hires');
    console.log(roomHireID, status)
    // Update a single document
    const result = await roomHireCollection.updateOne(
        { _id: new ObjectId(roomHireID) },
        { $set: { status: status } }
    );
    console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`);
    console.log(`Updated room hire with the following id: ${roomHireID}`);
    return result;
}

router.put('/changeStatus', async (req, res) => {
    try {
        await changeStatus(req.query.roomHireID, req.body.status);
        res.send("Status changed").status(200);
    } catch (error) {
        res.status(400).send(error.toString());
    }
});




// ########################### DELETE ENDPOINTS ###########################

async function deleteRoomHire(roomHireID) {
    // Connect to the MongoDB cluster and collections
    const roomHireCollection = client.db('it_project').collection('room_hires');

    // Delete a single document
    const result = await roomHireCollection.deleteOne({ _id: new ObjectId(roomHireID) });
    console.log(`Deleted room hire with the following id: ${roomHireID}`);
    return result;
}

router.delete("/", async (req, res) => {
    try {
        // Call the function to delete an item
        let results = await deleteRoomHire(req.query.roomHireID);
        res.send(results).status(200);
    }
    catch (error) {
        console.error("Error deleting room hire", error.toString());
        res.status(400).send(error.toString());
    }
});



// For testing purposes, example room hire object:
// {
//     "roomName": "breakfast_room",
//     "startTime": "2021-05-01T09:00:00.000Z",
//     "endTime": "2021-05-01T10:00:00.000Z",
//     "bookingName" : "frank reynolds",
//     "bookingEmail" : "frankreynolds@paddyspub.com",
//     "bookingPhone" : "01234567890",
//     "bookingReason" : "breakfast meeting",
//     "status": "-1"
// }

export default router;
