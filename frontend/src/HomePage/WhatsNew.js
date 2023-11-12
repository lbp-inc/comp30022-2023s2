import React from 'react';
import './WhatsNew.css';
import { Link } from 'react-router-dom';


import whatsNewImage from '../image/NewImage/Zumba group 2.jpg';
import eventImage from '../image/NewImage/news.jpg';
import ourServiceImage from '../image/NewImage/band8.jpg';

function WhatsNew() {
    return (
        <div className="whatsNewContainer">
            <div className="whatsNewSection">
                <h2>Activity</h2>
                <Link to="/Activities">
                    <img src={whatsNewImage} alt="Activity" />
                </Link>
            </div>

            <div className="whatsNewSection">
                <h2>Longbeach News</h2>
                <Link to="/Getinvolved">
                    <img src={eventImage} alt="Longbeach News" />
                </Link>
            </div>

            <div className="whatsNewSection">
                <h2>Events</h2>
                <Link to="/Events">
                    <img src={ourServiceImage} alt="Events" />
                </Link>
            </div>
        </div>
    );
}

export default WhatsNew;
