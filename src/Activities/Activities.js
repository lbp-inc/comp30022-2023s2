import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layout';
import './Activities.css';

import courseImage from '../image/event.webp';

function useLoadContentFromLocalStorage(ref, pageKey) {
    useEffect(() => {
      const savedHtml = localStorage.getItem(`savedHtml${pageKey}`);
      const savedCss = localStorage.getItem(`savedCss${pageKey}`);
      if (savedHtml && savedCss && ref.current) {
        ref.current.innerHTML = savedHtml;
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = savedCss;
        document.head.appendChild(styleElement);
      }
    }, [ref, pageKey]);
  }

function Activities() {
    const activitiesRef = useRef(null);
    useLoadContentFromLocalStorage(activitiesRef, 'Activities');

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
            courseName: 'Health and Wellbeing Course 1', 
            type: 'Health and Wellbeing', 
            Image: courseImage, 
            description: 'Learn drama and acting skills with creativity and have fun while doing...',
            date: 'date',
            duration: 'hours',
            fee: '$'
        },
        {
            id: 3, 
            courseName: 'Digital Skills Course', 
            type: 'Digital Skills', 
            Image: courseImage, 
            description: 'description',
            date: 'date',
            duration: 'hours',
            fee: '$'
        },
        {
            id: 4, 
            courseName: 'Health and Wellbeing Course 2', 
            type: 'Health and Wellbeing', 
            Image: courseImage, 
            description: 'description',
            date: 'date',
            duration: 'hours',
            fee: '$'
        },
        {
            id: 5, 
            courseName: 'Social and Community Groups Course', 
            type: 'Social and Community Groups', 
            Image: courseImage, 
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
        <div ref={activitiesRef} id="Activities">
        <Layout>
            <div className='activitiesPageContainer'>
                <div className='activitiesHeader'>
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
        </Layout>
        </div>
    );
}

export default Activities;
