import express from "express";
import axios from 'axios';
import RoomHireModel from "../models/roomHireModel";
import { ObjectId } from 'mongodb';


// ########################### GET ENDPOINTS ###########################

async function getRoomHire(query) {
    // Connect to the MongoDB cluster and collections
    const roomHireCollection = RoomHireModel;

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

    /// FORMAT REQUIRED BY FRONT END
    // {
    //     name: "Andy",
    //     room: "3",
    //     eventDate: "15-09-2023",
    //     eventHours: "2",
    //     status: "pending"
    //   },


    // Connect to the MongoDB cluster and collections
    const roomHireCollection = RoomHireModel;
    var roomHires;
    var roomHiresParsed;

    // Search for room hire object and manually join on room table
    if (date != null) {
        roomHires = await roomHireCollection.find({ startTime: { $gte: date } }).toArray();
    }
    else {
        // if no date specified get all bookings of all time
        roomHires = await roomHireCollection.find({}).toArray();
        // roomHiresParsed = parseRoomHiresForFrontend(roomHires);

    }

    if (roomHires) {
        console.log('Found items:', roomHires);
    } else {
        console.log('No items found');
    }
    // roomHires.forEach(roomHire => {
    //     roomHire.room = rooms.find(room => room._id == roomHire.room);
    // });
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
    if (!roomHire.fullName) {
        throw new InvalidBookingNameError("Booking name is required");
    }
    if (!roomHire.email) {
        throw new InvalidBookingEmailError("Booking email is required");
    }
    if (!roomHire.phoneNumber) {
        throw new InvalidBookingPhoneError("Booking phone is required");
    }
    if (new Date(roomHire.eventStartTime) > new Date(roomHire.eventEndTime)) {
        throw new InvalidDateError("Start time is after end time");
    }

    return true;
}


function formatDate(eventDate, startTime, endTime, dtFormat) {
    // combine date and make into proper format
    // const timezone = 'Etc/UTC'; 
    const timezone = 'Australia/Sydney'; // Set Australian timezone
    const startString = eventDate + " " + startTime;
    const endString = eventDate + " " + endTime;
    const startFormatted = DateTime.fromFormat(startString, dtFormat, { zone: timezone }).toJSDate();
    const endFormatted = DateTime.fromFormat(endString, dtFormat, { zone: timezone }).toJSDate();
    // Calculate the duration in milliseconds
    const durationMillis = endFormatted - startFormatted;

    // Convert milliseconds into hours and minutes
    const durationHours = Math.floor(durationMillis / (1000 * 60 * 60));

    console.log(startFormatted)
    console.log(endFormatted)
    return [startFormatted, endFormatted, durationHours];
}

function parseExtraDates(extraDates, starTime, endTime) {
    const format = 'dd/MM/yyyy HH:mm'
    // remove spaces and split into dates, map into proper format
    const extraDatesList = extraDates.replace(/ /g, '').split(',').map(
        date => formatDate(date, starTime, endTime, format)
    )
    return extraDatesList;
}

async function postRoomHire(roomHire) {
    // Connect to the MongoDB cluster and collections
    const roomHireCollection = RoomHireModel;
    // Get object id of room
    roomHire.room = roomHire.chosenRoom;

    // Delete room name from object
    delete roomHire.roomName
    // Set status to pending
    // Possible status options are pending, approved, rejected
    roomHire.status = "pending";
    // combine date and time and make into proper format
    [roomHire.startTime, roomHire.endTime, roomHire.duration] = formatDate(roomHire.eventDate, roomHire.eventStartTime, roomHire.eventEndTime, 'EEE MMM dd yyyy HH:mm');

    // if extra dates are specified, parse them and make more room hire objects
    if (roomHire.eventDateExtra != 'N/A') {
        const extraDates = parseExtraDates(roomHire.eventDateExtra, roomHire.eventStartTime, roomHire.eventEndTime);
        // delete extra dates from object
        delete roomHire.eventDateExtra
        // insert extra dates into database
        const extraRoomHires = extraDates.map(date => {
            const extraRoomHire = { ...roomHire };
            extraRoomHire.startTime = date[0];
            extraRoomHire.endTime = date[1];
            extraRoomHire.duration = date[2];
            validateRoomHire(extraRoomHire);
            return extraRoomHire;
        })
        const result = await roomHireCollection.insertMany(extraRoomHires);
        console.log(`New listings created`);
    }


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
        console.log(req.body)
        console.log("hello")
        let results = await postRoomHire(req.body);
        res.status(200).send(results);
    } catch (error) {
        console.log(error)
        res.status(422).send(error.toString());
        return;
    }
});


// ########################### PUT ENDPOINTS ###########################


async function updateRoomHire(roomHireID, roomHire) {
    // Connect to the MongoDB cluster and collections
    const roomHireCollection = RoomHireModel;

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
    const roomHireCollection = RoomHireModel;
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
    const roomHireCollection = RoomHireModel;

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


export default router;

