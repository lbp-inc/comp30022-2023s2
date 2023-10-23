import React, { useState, useEffect } from 'react'
import axios from 'axios';

// from the library
import { loadAirwallex, redirectToCheckout } from '@airwallex/airwallex-payment-elements';

export const Payment = () => {
    
    const payButtonClickHandler = async () => {
        loadAirwallex({
            env: 'demo', // Setup which Airwallex env('demo' | 'prod') to integrate with
            origin: window.location.origin, // Set up your event target to receive the browser events message
        });

        const postData = {
            amount: 100
          };

        const result = await axios.post('http://127.0.0.1:3001/donations/new', postData)

        // https://www.airwallex.com/docs/payments__hosted-payment-page__guest-user-checkout
        redirectToCheckout({
            env: 'demo', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
            intent_id: result.intent_id,
            client_secret: result.client_secret,
            currency: 'AUD',
            successUrl: "",
            failUrl: "",
            cancelUrl: "",
            logoUrl: ""
          });
      };
    
    return (
        <div>
            <button onClick={payButtonClickHandler}>Pay!</button>
        </div>
    )
}


export default Payment