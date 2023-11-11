import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '../Layout';
import './Activities.css';
import courseImage from '../image/event.webp';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FeeForServiceForm from "./Forms/FeeForService";
import ACFEForm from './Forms/ACFE_Form';
import ActivityDetails from "./ActivityDetails";

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
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8000/api/activities');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []); // Empty dependency array, so it runs only once when the component mounts

    let navigate = useNavigate();
    const routeChange = (path) => navigate(path);

    const [show, setShow] = useState(false);
    const [shownActivity, setShownActivity] = useState();
    const handleClose = () => setShow(false);
    const showDetails = (activity) => {
        setShownActivity(activity);
        setShow(true);
    };


    return (

        <Layout>

        <div ref={activitiesRef} id="Activities">
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
            </div>
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
                            <li key={activity.id} className={(activeTab === 'All' || activity.type === activeTab) ? 'activeCourse' : 'unactiveCourse'}>
                                <img src={activity.image} alt={activity.name}></img>
                                <h2>{activity.name}</h2>
                                <p className='courseDescription'>{activity.subtitle}</p>
                                <p>{activity.time}</p>
                                <p>{activity.duration}</p>
                                <p>${activity.cost}</p>
                                <button onClick={() => showDetails(activity)}>Learn More...</button> {/*() => routeChange("/fee_for_service_form")*/}
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        </div>
        </div>
            <Modal show={show} fullscreen="lg-down" size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body><ActivityDetails activity={shownActivity}/></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" >
                        Next &gt;
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>

    );
}

export default Activities;
