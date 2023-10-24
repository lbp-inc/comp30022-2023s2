import React from "react";
import "./SummaryPopup.css"; // Create CSS file for styling
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



function SummaryPopup({ formData, handleClose }) {

  const navigator = useNavigate();

  const handleSubmit = (event) => {
    navigator("/DonationPageMessage");
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
