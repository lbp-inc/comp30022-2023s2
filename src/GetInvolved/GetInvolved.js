import React from 'react';
import Layout from '../Layout';
import './GetInvolved.css'
function GetInvolved() {
    return (
        <Layout>
            <div className='newsTitleInvolve'>
                <h1>Getinvolved</h1>
            </div>
            <div className="getInvolvedContainer">
            <div className="getInvolvedBlock">
                <h3>Volunteering</h3>
                <p>Join our team of volunteers and make a difference in the community.</p>
            </div>
            <div className="getInvolvedBlock">
                <h3>Employment</h3>
                <p>Explore employment opportunities and join us in building a better future.</p>
            </div>
            <div className="getInvolvedBlock">
                <h3>Donate</h3>
                <p>Support our mission by making a donation and contributing to positive change.</p>
            </div>
        </div>
        </Layout>
    );
}

export default GetInvolved;
