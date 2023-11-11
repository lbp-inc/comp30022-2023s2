import React from "react";
import "./SummaryPopup.css"; // Create CSS file for styling
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// from the library
import { loadAirwallex, redirectToCheckout } from 'airwallex-payment-elements';



function SummaryPopup({ formData, handleClose }) {
  
  const navigator = useNavigate();
  
  const handleSubmit = async (event) => {
    loadAirwallex({
      env: 'demo', // Setup which Airwallex env('demo' | 'prod') to integrate with
      origin: window.location.origin, // Set up your event target to receive the browser events message
    });
    
    const postData = {
      amount: 100
    };
    
    const result = await axios.post('http://localhost:3001/api/donations/new', postData).data
    
    // https://www.airwallex.com/docs/payments__hosted-payment-page__guest-user-checkout
    redirectToCheckout({
      env: 'demo', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
      intent_id: result.intent_id,
      client_secret: result.client_secret,
      currency: 'AUD',
      successUrl: "", // FIXME: Paste here
      failUrl: "", // FIXME: Paste here
      cancelUrl: "", // FIXME: Paste here
      logoUrl: ""
    });
  }
  
  return (
    <div className="summary-popup">
    <h1 className="heading">Thank you!</h1>
    <table className="summary-details">
    <tr><td><strong>First Name:</strong></td><td>{formData.firstName}</td></tr>
    <tr><td><strong>Last Name:</strong></td><td>{formData.lastName}</td></tr>
    <tr><td><strong>Email:</strong></td><td>{formData.email}</td></tr>
    <tr><td><strong>Phone Number:</strong></td><td>{formData.phoneNumber}</td></tr>
    <tr><td><strong>Donation Amount:</strong></td><td>${formData.donationAmount}</td></tr>
    <tr><td><strong>Message:</strong></td><td>{formData.comments}</td></tr>
    </table>
    <br></br>
    <button onClick={handleClose}>Edit</button>
    
    <button onClick={handleSubmit}>Confirm</button>
    </div>
    );
  }
  
  export default SummaryPopup;
