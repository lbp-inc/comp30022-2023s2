import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '../Layout';
import './Activities.css';
import courseImage from '../image/event.webp';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FeeForServiceForm from "./Forms/FeeForService";
import ACFEForm from './Forms/ACFE_Form';
import ActivityDetails from "./ActivityDetails";
import BookNow from "./BookNow";
import Api from "../Api";

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

function Activities() {
    const activitiesRef = useRef(null);
    //useLoadContentFromDatabase(activitiesRef, 'Activities');

    const [activeTab, setActiveTab] = useState('All');

    const tabs = [
        {id: 1, name: 'All'},
        {id: 2, name: 'Health and Wellbeing'},
        {id: 3, name: 'Digital Skills'},
        {id: 4, name: 'Social and Community Groups'},
        {id: 5, name: 'English'}
    ];

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        (async () => setActivities(await Api.getActivitiesAsync()))();
    }, []); // Empty dependency array, so it runs only once when the component mounts

    const navigate = useNavigate();

    return (

        <Layout>

        <div ref={activitiesRef} id="Activities">
        <div id="content-only">
            <div className='activitiesPageContainer'>
                <div className='activitiesbanner'>
                    <h1 className='activitiesname'>Activities</h1>
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
                        {activities.map(activity => (
                            <li key={activity._id} className={(activeTab === 'All' || activity.type === activeTab) ? 'activeCourse' : 'unactiveCourse'}>
                                <img src={activity.image} alt={activity.name}></img>
                                <h2>{activity.name}</h2>
                                <p className='courseDescription'>{activity.subtitle}</p>
                                <p>{activity.time}</p>
                                <p>{activity.duration}</p>
                                <p>${activity.cost}</p>
                                <Button onClick={() => navigate(`./${activity._id}`)}>Learn More...</Button>
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
