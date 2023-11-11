import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import './GetInvolved.css'

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
    }, [ref, pageKey, backendUrl]);
  }

// function useLoadContentFromLocalStorage(ref, pageKey) {
    
//     useEffect(() => {
//     //  const mapContainer = document.getElementById(mapID); 
//       const savedHtml = localStorage.getItem(`savedHtml${pageKey}`);
//       const savedCss = localStorage.getItem(`savedCss${pageKey}`);
//       if (savedHtml && savedCss && ref.current) {
//         ref.current.innerHTML = savedHtml;

//         const styleElement = document.createElement('style');
//         styleElement.type = 'text/css';
//         styleElement.innerHTML = savedCss;
//         document.head.appendChild(styleElement);

//         }
//     }, [ref, pageKey]);
//   }

function GetInvolved() {
    
    const GetInvolvedRef = useRef(null);
    useLoadContentFromDatabase(GetInvolvedRef, 'Get Involved');

    return (
        <Layout>
        <div ref={GetInvolvedRef} id="Get Involved">
        <div id="content-only">    
            <div className='getInvolvedbanner'>
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
        </div>
        </div>        
        </Layout>
    );
}

export default GetInvolved;
