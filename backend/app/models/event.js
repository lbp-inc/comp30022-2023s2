import mongoose from 'mongoose';

// Describes the database schema
const eventSchema = new mongoose.Schema({
  // Store the event title attribute in the schema  
  title: {type: String, required: [true, "Please write a title for your event"]},
  // Store event's start date attribute in the schema
  start: {
     type: Date,
     required: [true, "Please Insert The Start of your event" ],
     min: [new Date(), "Please select current/future date for start date"],
  },
  // Store event's end date attribute in schema
  end: {
    type: Date,
    // Setting a min function to accept any date one hour ahead of start
    min: [function(){
      const date = new Date(this.start)
      const validDate = new Date(date.setHours(date.getHours()+1)) 
      return validDate
    },"Event End must be at least one hour a head of event time"],
    default: function(){
      const date = new Date(this.start)
      return date.setDate(date.getDate()+1)
    },
  },
  // Venue attribute
  venue: {type: String, required: [true, "Please choose a venue for your event"]},
  // Event's description attribute
  describe: { type: String},
});

// Check if venue clashes with time
eventSchema.pre('save', async function(next) {
  const event = this;
  const overlap = await Event.find({
      venue: event.venue,
      start: { $lt: event.end },
      end: { $gt: event.start }
  });

  if (overlap.length > 0) {
      throw new Error('There is already an event at this venue during the specified time slot');
  } else {
      next();
  }
});

const Event = mongoose.model("Event", eventSchema);

export default Event; 