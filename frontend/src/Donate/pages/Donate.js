import React from 'react'
import './Donate.css'
import DonateForm from '../components/DonateForm'
import Layout from '../../Layout'

function Donate() {

  return (
    <>
        <Layout>
        <div className="donation-head-banner">
            <h1>Donate</h1>
        </div>
        <div className="info-section">
        Donate and make a difference today. {'\n\n'}
        By donating to Longbeach Place you help us become closer to our goal of empowering people so they can realise their true potential. 
        Your donation enables us to responds to community needs by providing a range of structured educational programs, social activities, and special interest support groups. The programs and activities are developed through community consultation.  {'\n\n'}
        Donations can be anything such as stationary, art supplies, musical instruments the choice is yours. Every little bit helps. To donate please contact this address: {'\n'}
        15 Chelsea Road Chelsea Victoria 3196                Tel: 03 9776 1386                                                                      Email: reception@longbeachplace.org.au
        </div>
        </Layout>
    </>
  )
}

export default Donate
