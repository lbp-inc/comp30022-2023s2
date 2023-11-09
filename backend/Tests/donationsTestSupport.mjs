import express from "express"; 

let router = express.Router();


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


const database = {}

async function postPayment(body) {
    console.log("__called")
    console.log(body.request_id)
    database[body.request_id] = body
}

async function getPayment(body) {
    console.log("__called get")
    console.log(body.id)
    console.log(database[`donation_${body.id}`])

    const result = database[`donation_${body.id}`]
    result.status = "Finished"

    return result
}

setPostRoute("/new", postPayment)
setPostRoute("/get", getPayment)
    
export default router;