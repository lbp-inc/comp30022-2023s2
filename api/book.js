const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://lbp-app:team107@20.211.195.91:27017/lbp';
const dapp = express();

dapp.use(bodyParser.json());
dapp.use(bodyParser.urlencoded({ extended: true }));

let db;
let Users, Courses, Bookings;

const init = () => {
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (err, client) => {
        if (err) {
            console.error("Error connecting to the database", err);
            return;
        }
        db = client.db('lbp');
        console.log(`Connected to lbp Database`);

        Users = db.collection('users');
        Courses = db.collection('courses');
        Bookings = db.collection('bookings');

        dapp.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    });
}

dapp.post('/enroll/:courseId/:userId', async (req, res) => {
    const courseId = new ObjectID(req.params.courseId);
    const userId = new ObjectID(req.params.userId);

    try {
        const course = await Courses.findOne({ _id: courseId });
        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }

        // Check if the course is already full
        if (course.students.length >= course.capacity) {
            return res.status(400).send({ message: "Course is already full" });
        }

        // ... Proceed to payment logic ...

        // Assuming payment is successful:
        await Courses.updateOne({ _id: courseId }, { $push: { students: userId } });
        res.send({ message: 'Enrolled successfully!' });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Other routes (e.g., CRUD operations for courses, users, bookings) can go here...

init(); // Call init to start the connection and the server

module.exports = { dapp, init };
