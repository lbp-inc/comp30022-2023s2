import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layout';
import './Activities.css';
import courseImage from '../image/event.webp';
import axios from 'axios';

import FallsAndBalanceImage from '../image/NewImage/Falls and Balance.jpg';
import MicrosoftApplicationsImage from '../image/NewImage/Microsoft Applications.jpg';
import WalkAndTalkImage from '../image/NewImage/Walk and Talk.jpg';
import XeroImage from '../image/NewImage/Xero.jpg';
import MyCalendar from '../TimeTable/EventsTimetable';


function useLoadContentFromDatabase(ref, pageKey) {
    const backendUrl  = 'http://localhost:5000';

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

function Activities() {
    const activitiesRef = useRef(null);
    useLoadContentFromDatabase(activitiesRef, 'Activities');

    const [activeTab, setActiveTab] = useState('All');

    const tabs = [
        {id: 1, name: 'All'},
        {id: 2, name: 'Health and Wellbeing'},
        {id: 3, name: 'Digital Skills'},
        {id: 4, name: 'Social and Community Groups'},
        {id: 5, name: 'English'}
    ];

    const courses = [
        {
            id: 1, 
            courseName: 'Course 1', 
            type: '', 
            Image: courseImage, 
            description: 'description',
            date: 'date',
            duration: 'hours',
            fee: '$'
        },
        {
            id: 2, 
            courseName: 'Falls and Balance', 
            type: 'Health and Wellbeing', 
            Image: FallsAndBalanceImage, 
            description: 'Learn drama and acting skills with creativity and have fun while doing...',
            date: 'date',
            duration: 'hours',
            fee: '$'
        },
        {
            id: 3, 
            courseName: 'Microsoft Applications', 
            type: 'Digital Skills', 
            Image: MicrosoftApplicationsImage, 
            description: 'description',
            date: 'date',
            duration: 'hours',
            fee: '$'
        },
        {
            id: 4, 
            courseName: 'Xero', 
            type: 'Digital Skills', 
            Image: XeroImage, 
            description: 'description',
            date: 'date',
            duration: 'hours',
            fee: '$'
        },
        {
            id: 5, 
            courseName: 'Walk and Talk', 
            type: 'Social and Community Groups', 
            Image: WalkAndTalkImage, 
            description: 'description',
            date: 'date',
            duration: 'hours',
            fee: '$'
        },
        {
            id: 6, 
            courseName: 'English Course', 
            type: 'English', 
            Image: courseImage, 
            description: 'description',
            date: 'date',
            duration: 'hours',
            fee: '$'
        }
    ];

    return (

        <Layout>

        <div ref={activitiesRef} id="Activities">

        <div id="content-only">
            <div className='activitiesPageContainer'>
                <div className='timetable'>
                    <MyCalendar/>
                </div>
                <div className='activitiesbanner'>
                    <h1>Activities</h1>
                </div>

                <div className='categoryContainer'>
                    <h1>Categories</h1>
                    <ul className='categoryBar'>
                        {tabs.map(tab => (
                            <li 
                            key={tab.id} 
                            className={tab.name === activeTab ? 'active' : 'unactive'}
                            onClick={() => setActiveTab(tab.name)}
                            >{tab.name}</li>
                        ))}
                    </ul>
                </div>

                <div className='coursesContainer'>
                    <ul>
                        {courses.map(course => (
                            <li key={course.id} className={(activeTab === 'All' || course.type === activeTab) ? 'activeCourse' : 'unactiveCourse'}>
                                <img src={course.Image} alt={course.courseName}></img>
                                <h2>{course.courseName}</h2>
                                <p className='courseDescription'>{course.description}</p>
                                <p>{course.date}</p>
                                <p>{course.duration}</p>
                                <p>{course.fee}</p>
                                <button>Book Now</button>
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        </div>
        </div>
        </Layout>
        
    );
}

export default Activities;
