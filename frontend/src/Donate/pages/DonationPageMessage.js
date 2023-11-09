import React from 'react'
import { useState } from 'react'
import { useLocation } from "react-router-dom";
import './DonationPageMessage.css'
import 'font-awesome/css/font-awesome.min.css';
import { useEffect } from 'react';
import axios from 'axios';
import Layout from '../../Layout';


const checkmarkIconClass = 'custom-checkmark-icon';

function DonationPageMessage() {

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // Parse the query parameters from the URL
        const searchParams = new URLSearchParams(window.location.search);
        const idParam = searchParams.get('id');
    
        const postData = {
            id: idParam
          };

        axios.post('http://localhost:3001/api/donations/update', postData)
        .then(response => {
            // Handle the success response here
            if (response.status == "SUCCEEDED") {
                setSuccess(true);
                setLoading(false);
            } else {
                setError(`The payment status is ${response.status}. This is unexpected behavior, please contact support with your payment intent id: ${idParam}`);
                setLoading(false);
            }
          })
          .catch(err => {
            // Handle errors
            setError(err.message);
            setLoading(false);
          });
      }, []);

  return (
    <>
    <Layout>
    <div className='thanks-message'>
      {loading ? (
        <h1>Loading...</h1>
      ) : success ? (
        <>
        <h1>Thank you</h1>
        <i className={`fa fa-check ${checkmarkIconClass} fa-5x`} aria-hidden="true"></i>
        <p>Thank you for donating. Your payment process has been completed</p>
        </>
      ) : (
        <>
        <h1>Error</h1>
        <div style={{ color: 'rgb(194, 50, 50)', fontSize: '5em' }}>
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
        </div>
        {error && <p>{error}</p>}
        <p>Payment unsucessfull</p>
        </>
      )}
    </div>
    </Layout>
    </>
  )
}

export default DonationPageMessage