const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Updated connection URL
const url = 'mongodb://lbp-app:team107@20.211.195.91:27017/lbp';
const dapp = express();

dapp.use(bodyParser.json());
dapp.use(bodyParser.urlencoded({ extended: true }));

let db;
let Users;

const init = () => {
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (err, client) => {
        if (err) {
            console.error("Error connecting to the database", err);
            return;
        }
        db = client.db('lbp'); // Use the database named 'lbp'
        console.log(`Connected to lbp Database`);

        Users = db.collection('users');

        // Only start your Express server here
        dapp.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    });
}

dapp.post('/user', (req, res) => {
    const newUser = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        courseInfo: req.body.courseInfo
    };
    Users.insertOne(newUser, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result.ops[0]);
    });
});

dapp.get('/user/:id', (req, res) => {
    Users.findOne({ _id: new ObjectID(req.params.id) }, (err, user) => {
        if (err) return res.status(500).send(err);
        res.send(user);
    });
});

dapp.put('/user/:id', (req, res) => {
    const updatedInfo = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        courseInfo: req.body.courseInfo
    };
    Users.updateOne({ _id: new ObjectID(req.params.id) }, { $set: updatedInfo }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

dapp.delete('/user/:id', (req, res) => {
    Users.deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'User deleted successfully!' });
    });
});

init(); // Call init to start the connection and the server

module.exports = { dapp, init };
