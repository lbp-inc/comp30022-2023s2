import React from "react";
import "./SummaryPopup.css"; // Create CSS file for styling
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



function SummaryPopup({ formData, handleClose }) {

   const navigator = useNavigate();

  const handleSubmit =  (event) => {
    navigator("/DonationPageMessage");
  }

  return (
    <div className="summary-popup">
      <h1 className="heading">Thank you!</h1>
      <ul className="content">
        <li><strong>First Name:</strong> {formData.firstName}</li>
        <li><strong>Last Name:</strong> {formData.lastName}</li>
        <li><strong>Email:</strong> {formData.email}</li>
        <li><strong>Phone Number:</strong> {formData.phoneNumber}</li>
        <li><strong>Donation Amount:</strong> ${formData.donationAmount}</li>
        <li><strong>Message:</strong> {formData.comments}</li>
      </ul>
      <button onClick={handleClose}>Edit</button>

      <button onClick={handleSubmit}>Confirm</button>
    </div>
  );
}

export default SummaryPopup;
