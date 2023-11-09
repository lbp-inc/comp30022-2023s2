import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '../../Layout';
import './RoomHire.css'
import { Card } from '../components/Card';

function useLoadContentFromDatabase(ref, pageKey) {
    const backendUrl  = 'http://localhost:8000';
    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/users/load-content/${pageKey}`); 
          if (response.data.success) {
            const { html, css } = response.data;
  
            if (html && css && ref.current) {
              ref.current.innerHTML = html;
  
              const styleElement = document.createElement('style');
              styleElement.type = 'text/css';
              styleElement.innerHTML = css;
              document.head.appendChild(styleElement);
            }
          }
        } catch (error) {
          console.error("Error loading data from database:", error);
        }
      };
  
      fetchData();
    }, [ref, pageKey]);
  }


function RoomHire() {

    const RoomHireref = useRef(null);
    useLoadContentFromDatabase(RoomHireref, 'Room Hire');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Layout>
        <div ref={RoomHireref} id="Room Hire">
        <div id="content-only">    
            <div className='roomHirebanner'>
                <h1>Room Hire</h1>
            </div>
            <div className="info-section">
        Our rooms are available to hire to community and commercial groups for meetings and workshops.{'\n\n'}
        For more information regarding room hire, please contact us on 9776 1386. You can also download the information flyer here: <a href="https://www.longbeachplace.org.au/_files/ugd/6d953a_d063e82c259448e49e6fde98f4507564.pdf">Venue Hire Information Flyer</a>.
        To book a room please complete the <a href="https://www.longbeachplace.org.au/_files/ugd/6d953a_6b397d359b7e457ea069add031b65dde.pdf">Regular/Casual Room Rental</a> form below or download the form and send to us via email at reception@longbeachplace.org.au - either way we will be in touch 
        regarding your booking. {'\n'}Please note: We do not hire out AV equipment or computers. {'\n'}
        All Commercial and Community Hirers must have their own Public Liability Insurance to make a booking.{'\n'}
        <p>After hours information:</p>LBP building is owned by City of Kingston Council Phone: 1800 653 356 in case of an emergency. {'\n'}Our location is 15 Chelsea Rd, Chelsea {'\n'}Chelsea Police: 8773-3200. Their location is 312 Station Street, Chelsea{'\n'}Fire Police Ambulance 000             SES Victoria 132 500
        </div>
        <div className="hero-card-container">
            <Card/>
        </div>
        <div><p></p></div>
        </div>
        </div>            
        </Layout>
    );
}

export default RoomHire;
