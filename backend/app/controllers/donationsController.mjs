import express from "express";
import axios from 'axios';
import {apiAddress, apiKey, clientID} from "../../secrets/paymentSecrets.mjs"
import DonationsInfo from "../models/DonationsInfo.js";
import { ObjectId } from 'mongodb';


export class AccessToken {
    
    constructor() {
        if (AccessToken.instance) {
            return AccessToken.instance;
        }

        this.token = "";
        this.experyDate = new Date();

        AccessToken.instance = this;
    }
    
    async updateIfRequired() {
        if (new Date() < this.experyDate) {
            return; // no need!
        }

        let rawToken = await axios
        .request({
            url: `${apiAddress}/authentication/login`,
            method: 'post',
            headers: {
                'x-api-key': apiKey,
                'x-client-id': clientID,
            },
        })

        let object = JSON.parse(rawToken.data);
        this.token = object.token
        this.experyDate = new Date(object.expires_at)
    }
}
    

let router = express.Router();

// ########################### GET ENDPOINTS ###########################

function setGetRoute(path, closure) {
    router.get(path, async (req, res) => {
        // Call the function to request an item
        try {
            let results = await closure();
            res.status(200).send(results);
        } catch (error) {
            res.status(422).send(error.toString());
        }
    });
}


async function getAllDonations() {
    // Connect to the MongoDB cluster and collections
    const donationsCollection = DonationsInfo;
    
    let donations = await donationsCollection.find();
    
    if (donations) {
        console.log('Found item:', donations);
    } else {
        console.log('Item not found');
    }
    
    return donations;
}

setGetRoute("/all", getAllDonations)


// ########################### POST ENDPOINTS ###########################

function setPostRoute(path, closure) {
    router.post(path, async (req, res) => {
        try {
            let results = await closure(req.body);
            res.status(200).send(results);
        } catch (error) {
            res.status(422).send(error.toString());
        }
    });
}


async function postDonation(donation) {
    // Connect to the MongoDB cluster and collections
    const donationsCollection = DonationsInfo;
    
    donation.date = new Date();
    donation.status = "PENDING"
    
    console.log(donation)

    // Insert a single document
    const insertResult = await donationsCollection.create(donation);
    console.log(insertResult)
    
    if (!insertResult) {
        throw new Error("Insert not ackowledged");
    }
    
    let token = new AccessToken();
    let insertID = insertResult._id
    
    const requestBody = {
        request_id: `donation_${insertID}`,
        amount: donation.amount,
        currentcy: "AUD",
        merchant_order_id: `donation_${insertID}`
    }

    var result = await axios
    .request({
        url: `http://localhost:12345/staging/__donationsTestRoutes/new`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`,
        },
        data: requestBody,
    })
    return result.data
    
    // var result = await axios
    // .request({
    //     url: `${apiAddress}/pa/payment_intents/create`,
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token.token}`,
    //     },
    //     data: requestBody,
    // })
    // return result.data
}

setPostRoute("/new", postDonation)


async function updateDonation(donation) {
    let id = donation.id;
    let token = new AccessToken();

    // get status
    var result = await axios
    .request({
        url: `http://localhost:12345/staging/__donationsTestRoutes/get`,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${token.token}`,
        },
        data: donation,
    })
    result = result.data
    
    // get status
    // var result = await axios
    // .request({
    //     url: `${apiAddress}/pa/payment_intents/${id}`,
    //     method: 'get',
    //     headers: {
    //         'Authorization': `Bearer ${token.token}`,
    //     }
    // })
    // result = result.data
    
    // Connect to the MongoDB cluster and collections
    const donationsCollection = DonationsInfo;

    // console.log(result)
    console.log("__update donation")
    console.log(result)
    console.log(result.request_id)

    const objectID = result.request_id.slice(9)
    console.log(objectID)

    const doc = await donationsCollection.findById(objectID)
        
    if (doc) {
        return await doc.updateOne({ status: result.status } )
    } else {
        throw new Error("Document not found, this is a logic error");
    }
}

setPostRoute("/update", updateDonation)
    
export default router;