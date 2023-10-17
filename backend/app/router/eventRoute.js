import express from "express";
const router = express.Router();
import Event from "../models/event.js";
import handleError from "../utils/eventErrors.js";

// Add event 
router.post("/", async(req, res)=>{
   
    const newEvent = await new Event(req.body)
 
    try{
       const savedEvent = await newEvent.save();
       res.status(200).json(savedEvent);
    }catch(err){
        handleError(err, res)
    }
});


// Show all events
router.get("/", async(req, res)=>{

    const events = await Event.find({});
 
    try{
       
       res.status(200).json(events)

      
    }catch(err){
        handleError(err, res)
    }
});

// todo there might have error here
// Might need to "/:id" instead of "/:id/show"
// Show specific event
router.get("/:id/show", async(req, res)=>{
    // Get id off the url
    const id =   req.params.id

    // Find note using that id
    const event = await Event.findById(id);
 
    try{
       res.status(200).json(event)

      
    }catch(err){
        handleError(err, res)
    }
});


// Watch for the same thing as get event
// Update event
router.put("/:id/update", async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findOne({ _id: id });
        if (event) {
            Object.assign(event, req.body);
            const savedEvent = await event.save();  // Use save() as a promise
            res.status(200).json(savedEvent);
        } else {
            res.status(404).json({ error: "event is not found" });
        }
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
});

// Delete event
router.delete("/:id/delete", async(req, res)=>{
    const id = req.params.id;
    try{
        await Event.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    }catch(err){
        handleError(err, res)
    }

})

//module.exports = router;
export default router;