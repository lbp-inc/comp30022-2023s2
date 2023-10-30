import mongoose from "mongoose";

const roomHireSchema = mongoose.Schema(
    {
        chosenRoom: {
            type: String,
            require: true,
        },
        eventDate: {
            type: String,
            require: true,
        },
        applicationDate: {
            type: String,
            require: true,
        },
        eventDateExtra: {
            type: String,
            require: false,
        },
        eventStartTime: {
            type: String,
            require: true,
        },
        eventEndTime: {
            type: String,
            require: true,
        },
        activity: {
            type: String,
            require: false,
        },
        fullName: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        abn: {
            type: String,
            require: false,
        },
        streetAddress: {
            type: String,
            require: true,
        },
        suburb: {
            type: String,
            require: true,
        },
        postcode: {
            type: String,
            require: true,
        },
        paymentMethod: {
            type: String,
            require: true,
        },
        namePaying: {
            type: String,
            require: false,
        },
        phoneNumberPayment: {
            type: String,
            require: false,
        },
        streetAddressPayment: {
            type: String,
            require: false,
        },
        suburbPayment: {
            type: String,
            require: false,
        },
        statePayment: {
            type: String,
            require: false,
        },
        postcodePayment: {
            type: String,
            require: false,
        },
        organisationAuspiced: {
            type: String,
            require: true,
        },
        authorityLetter: {
            type: String,
            require: false,
        },
        publicLiabilityInsurance: {
            type: String,
            require: true,
        },
        insuranceDetails: {
            type: String,
            require: false,
        },
        room: {
            type: String,
            required: true,
            ref: "Room",
        },
        status: {
            type: String,
            required: true,
            default: "pending",
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

// {
//     "chosenRoom": "Room 4",
//     "eventDate": "Wed Oct 11 2023",
//     "applicationDate": "2023-10-10",
//     "eventDateExtra": "12/12/2023, 10/12/2023",
//     "eventStartTime": "20:27",
//     "eventEndTime": "23:27",
//     "activity": "Finbarr",
//     "fullName": "Howard",
//     "phoneNumber": "+61 424 332 084",
//     "email": "finbarr.o.c.howard@gmail.com",
//     "abn": "N/A",
//     "streetAddress": "65 Victoria St",
//     "suburb": "Brunswick east",
//     "postcode": "3057",
//     "paymentMethod": "Invoice",
//     "namePaying": "N/A",
//     "phoneNumberPayment": "N/A",
//     "streetAddressPayment": "N/A",
//     "suburbPayment": "N/A",
//     "statePayment": "N/A",
//     "postcodePayment": "N/A",
//     "organisationAuspiced": "No",
//     "authorityLetter": "N/A",
//     "publicLiabilityInsurance": "No",
//     "insuranceDetails": "N/A"
//   }


const RoomHire = mongoose.model("RoomHire", roomHireSchema);

export default RoomHire;