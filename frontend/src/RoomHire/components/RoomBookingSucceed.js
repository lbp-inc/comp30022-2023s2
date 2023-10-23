import React from 'react'
import "./RoomBookingSucceed.css"
import 'font-awesome/css/font-awesome.min.css';
import Layout from '../../Layout';

const checkmarkIconClass = 'custom-checkmark-icon';

function RoomBookingSucceed() {

  return (
    <Layout>
    <div className='thanks-message'>
      <h1>Thank you</h1>
      <i className={`fa fa-check ${checkmarkIconClass} fa-5x`} aria-hidden="true"></i>
      <p>Thank you for booking with us, we hope you will have an amazing experience at LongBeachPlace. A confirmation email and SMS reminder will be sent out shortly. Any enquire on room booking, please contact us through 9776 1386.</p>
    </div>
    </Layout>

  )
}

export default RoomBookingSucceed