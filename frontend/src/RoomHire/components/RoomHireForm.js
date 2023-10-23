import React from "react";
import { useState, useRef, useEffect } from "react";
import "./RoomHireForm.css";
import SignatureCanvas from 'react-signature-canvas'
import { Link, useNavigate } from "react-router-dom";
import RoomBookingSucceed from "./RoomBookingSucceed";
import axios from "axios";
import { Button } from "@mui/material";
import Layout from "../../Layout";

function RoomHireForm() {
    const [submittedData, setSubmittedData] = useState(null);
    const [signature, setSignature] = useState(null);
    const [signatureData, setSignatureData] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const roomOptions = ["Room 1", "Room 2", "Room 1 and 2"];
    const navigator = useNavigate();
    var date = new Date();



    const [inputs, setInputs] = useState({
        chosenRoom: localStorage.getItem("roomName"),
        eventDate: localStorage.getItem("selectedDate"),
        applicationDate: new Date().toISOString().split('T')[0],
        eventDateExtra: "",
        eventStartTime: "",
        eventEndTime: "",
        activity: "",
        fullName: "",
        phoneNumber: "",
        email: "",
        abn: "",
        streetAddress: "",
        suburb: "",
        postcode: "",
        paymentMethod: "",
        namePaying: "",
        phoneNumberPayment: "",
        streetAddressPayment: "",
        suburbPayment: "",
        statePayment: "",
        postcodePayment: "",
        organisationAuspiced: "",
        authorityLetter: "",
        publicLiabilityInsurance: "",
        insuranceDetails: "",
    });

    console.log(inputs.applicationDate)
    console.log("EVENT DATE: ", inputs.eventDate)



    useEffect(() => {
        console.log(signature);
    }, [signature]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const resetForm = (event) => {
        setInputs({});
        sigRef.current.clear();
        document.getElementById("Yes1").checked = false;
        document.getElementById("No1").checked = false;
        document.getElementById("Yes2").checked = false;
        document.getElementById("No2").checked = false;
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const filledInputs = Object.fromEntries(
            Object.entries(inputs).map(([name, value]) => [name, value || "N/A"])
        );
        document.body.classList.add('no-scroll', 'fixed');
        setSubmittedData(filledInputs);
        setShowDialog(true);
    }

    const handleEdit = (event) => {
        document.body.classList.remove('no-scroll', 'fixed');
        event.preventDefault();
        setShowDialog(false)
    }

    const handleConfirm = (event) => {
        event.preventDefault();
        document.body.classList.remove('no-scroll', 'fixed');
        axios.post('http://localhost:3001/roomHire', submittedData)
        resetForm();
        navigator("/RoomBookingSucceed")
    }

    const sigRef = useRef();

    const handleSignatureEnd = () => {
        setSignature(sigRef.current.toDataURL);
        const signatureDataURL = sigRef.current.toDataURL();
        setSignatureData(signatureDataURL)
    }

    const clearSig = () => {
        setSignature(null);
        sigRef.current.clear();
    }

    useEffect(() => {
        console.log(signature);
    }, [signature]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])



    return (
      <>
        <Layout>
        <div className="pagelayout">
            <h1>Room Rental Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="subheading"><center> General Info</center> </div>

                <label>Date of Application <span className="requires">*</span>
                    <br />
                    <input type="text"
                        name="applicationDate"
                        value={inputs.applicationDate}
                        readOnly
                        required />
                </label>

                {localStorage.getItem("roomName") === "Room 1 and 2" && (
                    <label>
                        Room Chosen <span className="requires">*</span>
                        <br />
                        <select
                            name="chosenRoom"
                            value={inputs.chosenRoom}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a room(s)</option>
                            {roomOptions.map((room, index) => (
                                <option key={index} value={room}>{room}</option>
                            ))}
                        </select>
                    </label>
                )}

                {localStorage.getItem("roomName") != "Room 1 and 2" && (
                    <label>Room Chosen <span className="requires">*</span>
                        <br />
                        <input
                            type="text"
                            name="chosenRoom"
                            value={inputs.chosenRoom}
                            readOnly
                            required />
                    </label>
                )}

                <div className="subheading"><center>Event Date and Time</center></div>

                <label>Date of Event <span className="requires">*</span>
                    <br />
                    <input
                        type="text"
                        name="eventDate"
                        value={new Date(inputs.eventDate).toDateString()}
                        readOnly
                        required
                    />
                </label>

                <label>If More Than One Date, Please Specify Those Dates Below in Date Format
                    <br />
                    <input type="text"
                        name="eventDateExtra"
                        placeholder="eg. 23/07/2023, 23/08/2023, etc."
                        value={inputs.eventDateExtra || ""}
                        onChange={handleChange} />
                </label>

                <label>Start Time:
                    <input type="time"
                        name="eventStartTime"
                        value={inputs.eventStartTime || ""}
                        onChange={handleChange}
                        required
                        className="time-label" />
                    include set up time <span className="requires">*</span>
                </label>

                <label>End Time: 
                    <input type="time"
                        name="eventEndTime"
                        value={inputs.eventEndTime || ""}
                        onChange={handleChange}
                        required
                        className="time-label" />
                    Include clean up time <span className="requires">*</span>
                </label>

                <div className="subheading"> <center>Personal Details</center>  </div>

                <label>Name of your group/activity <span className="requires">*</span>
                    <br />
                    <input type="text"
                        name="activity"
                        value={inputs.activity || ""}
                        onChange={handleChange}
                        placeholder="What are you using the room for?"
                        required />
                </label>

                <label>Full Name <span className="requires">*</span>
                    <br />
                    <input type="text"
                        name="fullName"
                        value={inputs.fullName || ""}
                        onChange={handleChange}
                        required />
                </label>

                <label>Phone Number <span className="requires">*</span>
                    <br />
                    <input type="tel"
                        name="phoneNumber"
                        placeholder="+61 4__ ___ ___"
                        value={inputs.phoneNumber || ""}
                        onChange={handleChange}
                        required />
                </label>

                <label>Email <span className="requires">*</span>
                    <br />
                    <input type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        value={inputs.email || ""}
                        onChange={handleChange}
                        required />
                </label>

                <label>ABN
                    <br />
                    <input type="text"
                        name="abn"
                        value={inputs.abn || ""}
                        onChange={handleChange}
                        placeholder="If you have an ABN for your business, insert it here" />
                </label>

                <label>Street Address <span className="requires">*</span>
                    <br />
                    <input type="text"
                        name="streetAddress"
                        value={inputs.streetAddress || ""}
                        onChange={handleChange}
                        required />
                </label>

                <label>Suburb <span className="requires">*</span>
                    <br />
                    <input type="text"
                        name="suburb"
                        value={inputs.suburb || ""}
                        onChange={handleChange}
                        required />
                </label>

                <label>Postcode <span className="requires">*</span>
                    <br />
                    <input type="text"
                        name="postcode"
                        value={inputs.postcode || ""}
                        onChange={handleChange}
                        required />
                </label>

                <div className="subheading">Payment Details</div>

                <label>Payment Method <span className="requires">*</span>
                    <br />
                    <input type="text"
                        name="paymentMethod"
                        placeholder="eg. Invoice, pay on the day, etc."
                        value={inputs.paymentMethod || ""}
                        onChange={handleChange}
                        required />
                </label>

                <div className="importantNote"> *If the following is different from above* </div>

                <label>Name of organisation/person responsible for payment
                    <br />
                    <input type="text"
                        name="namePaying"
                        value={inputs.namePaying || ""}
                        onChange={handleChange} />
                </label>

                <label>Phone Number
                    <br />
                    <input type="tel"
                        name="phoneNumberPayment"
                        placeholder="+61 4__ ___ ___"
                        value={inputs.phoneNumberPayment || ""}
                        onChange={handleChange} />
                </label>

                <label>Street Address
                    <br />
                    <input type="text"
                        name="streetAddressPayment"
                        value={inputs.streetAddressPayment || ""}
                        onChange={handleChange} />
                </label>

                <label>Suburb
                    <br />
                    <input type="text"
                        name="suburbPayment"
                        value={inputs.suburbPayment || ""}
                        onChange={handleChange} />
                </label>

                <label>State
                    <br />
                    <input type="text"
                        name="statePayment"
                        value={inputs.statePayment || ""}
                        onChange={handleChange} />
                </label>

                <label>Postcode
                    <br />
                    <input type="text"
                        name="postcodePayment"
                        value={inputs.postcodePayment || ""}
                        onChange={handleChange} />
                </label>

                <div className="subheading">Other Required Details</div>
                <label>
                    Are you auspiced by another organisation? <span className="requires">*</span>
                </label>
                <text>
                    <input type="radio" name="organisationAuspiced" value={inputs.organisationAuspiced || "Yes"} id="Yes1" onChange={() => setInputs({ ...inputs, organisationAuspiced: "Yes" })} required />
                    Yes
                </text>
                <text>
                    <input type="radio" name="organisationAuspiced" value={inputs.organisationAuspiced || "No"} id="No1" onChange={() => setInputs({ ...inputs, organisationAuspiced: "No" })} required />
                    No
                </text>

                <label>If yes please attach a letter of authority:
                    <div class="file-drop-area">
                        <input type="file"
                            name="authorityLetter"
                            value={inputs.authorityLetter || ""}
                            onChange={handleChange} />
                        <br />
                        <span class="file-msg">or drag and drop files here</span>
                    </div>
                </label>

                <label>
                    Do you have your own public liability insurance? <span className="requires">*</span>
                </label>
                <text>
                    <input type="radio" name="publicLiabilityInsurance" value={inputs.publicLiabilityInsurance || "Yes"} id="Yes2" onChange={() => setInputs({ ...inputs, publicLiabilityInsurance: "Yes" })} required />
                    Yes
                </text>
                <text>
                    <input type="radio" name="publicLiabilityInsurance" value={inputs.publicLiabilityInsurance || "No"} id="No2" onChange={() => setInputs({ ...inputs, publicLiabilityInsurance: "No" })} required />
                    No
                </text>


                <label>If yes please attach a copy of your current insurance details
                    <br />
                    <div class="file-drop-area">
                        <input type="file"
                            name="insuranceDetails"
                            value={inputs.insuranceDetails || ""}
                            onChange={handleChange} />
                        <br />
                        <span class="file-msg">or drag and drop files here</span>
                    </div>
                </label>
                <div className="importantNote">If you have answered no to the above questions:</div>
                <div className="notes">All your participants will need to be a member of Longbeach PLACE Inc.
                    and pay an annual membership fee. {'\n'}
                    Registrations forms are available on our website or at reception.{'\n\n'}</div>

                <div className="subheading"> - - - - - A Few Housekeeping Requests - - - - - </div>
                <div className="notes">
                    It is a condition of use that all areas are left clean and tidy.{'\n'}
                    Please ensure cups, plates etc. are cleared away after use and that the kitchen is left clean.{'\n'}
                    All rubbish is to be taken out to our external bins.{'\n'}
                    Blinds on all external windows to be closed after dark.{'\n'}
                    Please turn off heaters, coolers and urns after your session unless advised otherwise.{'\n'}
                    It is necessary to speak to staff regarding security arrangements for after-hours meetings.{'\n\n'}

                    <div className="important">IMPORTANT NOTE:</div>
                    It is the responsibility of the hirer that rooms are left in the same configuration as they were found.{'\n'}
                    (This diagram can be found on the fixed whiteboard in the room you have hired).{'\n'}
                    Thank you for your co-operation.{'\n\n'}
                    Please feel free to draw our attention to any issues you may have by calling: {'\n'}9776 1386.{'\n'}
                </div>

                <div className="subheading"> - - - - - Cancellations - - - - - </div>
                <div className="notes">
                    Please advise us by phone (9776 1386) and email (admin@longbeachplace.org.au) within 3 working days prior to your booking if cancelling,
                    otherwise a cancellation fee may apply.{'\n'}
                    Default free text{'\n'}
                </div>

                <div className="subheading"> - - - - - Signature - - - - - </div>

                <div>

                    <SignatureCanvas penColor='black'
                        backgroundColor='white'
                        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                        ref={sigRef}
                        name="signature"
                        onEnd={handleSignatureEnd}
                    />
                    <br></br>
                    <Button type="button" variant= 'contained' onClick={clearSig} className="form-button">Clear</Button>
                </div>
                <br></br>
                <div>
                <Button type="clear"  variant= 'contained' onClick={resetForm} className="form-button">Reset Form</Button>
                <Button type="submit" variant= 'contained' className="form-button">Submit</Button>
                </div>
            </form>

            {/* Display submitted data */}
            {showDialog && submittedData && signatureData && (
                <>
                    <div className="review-section">
                        <h2>Review Your Information</h2>
                        <table className="review-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Date of Application:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.applicationDate}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Room Chosen:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.chosenRoom}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Date of Event:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.eventDate}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>If More Than One Date:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.eventDateExtra}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Start Time:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.eventStartTime}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>End Time:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.eventEndTime}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Name of your group/activity:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.activity}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Full Name:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.fullName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Phone Number:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.phoneNumber}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Email:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.email}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>ABN:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.abn}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Street Address:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.streetAddress}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Suburb:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.suburb}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Postcode:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.postcode}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Payment Method:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.paymentMethod}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Name of organisation/person responsible for payment:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.namePaying}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Phone Number:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.phoneNumberPayment}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Street Address:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.streetAddressPayment}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Suburb:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.suburbPayment}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>State:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.statePayment}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Postcode:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.postcodePayment}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Are you auspiced by another organisation?</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.organisationAuspiced}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Letter of Authority:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.authorityLetter}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Do you have your own public liability insurance?</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.publicLiabilityInsurance}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Current Insurance Details:</strong>
                                    </td>
                                    <td>
                                        <p>{inputs.insuranceDetails}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>Your Signature:</h3>
                        <div className="signature-section">
                            <img src={signatureData} alt="User Signature" className="signature-image" />
                        </div>
                        <div className="button-section">
                            <Button onClick={handleEdit} className="review-button"> Edit </Button>
                            <Button onClick={handleConfirm} className="review-button"> Confirm </Button>
                        </div>
                    </div>
                </>
            )}

        
        </div>
        </Layout>
        
        </>
    )
}

export default RoomHireForm;