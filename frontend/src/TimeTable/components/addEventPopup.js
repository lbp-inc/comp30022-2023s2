import React, { useState } from 'react';
import './addEventPopup.css';
import Popup from 'reactjs-popup';
import axios from 'axios';



const EventPopup = ({renderStatus, reRender}) => {
  
  // state
  const [open, setOpen] = useState(false)

  const [createForm, setCreateForm] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    describe: '',
    venue: ''
  })
  // functions
  const updateCreateFormField = (e) => {
    const {name, value} = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    })
  }
  const createEvent = async (e) => {
    e.preventDefault();
    await axios.post("https://timetable-itproj-backend-43cf4db34bc0.herokuapp.com/api/events", createForm)
    //if form is not formatted properley backend will catch and throw an error
    setOpen(false);
    reRender(!renderStatus);
    
  }


  return (
    <div>
      <button className='popup-button' onClick = {() => setOpen(true)}>Add Event</button>
      <Popup open = {open}>
        <div className='popup'>
          <div className='popup-content'>
            <h2 className="form-title">Event Details</h2>
            <form onSubmit = {createEvent}>
              <div className="form-group">
                <label htmlFor="title">Title </label>
                <input  onChange = {updateCreateFormField} type="text" name="title" />
              </div>
              <div className="form-group">
                <label htmlFor="datetime-local">Start Date </label>
                <input onChange = {updateCreateFormField} type="datetime-local" name="start" />
              </div>
              <div className="form-group">
                <label htmlFor="datetime-local">End Date </label>
                <input onChange = {updateCreateFormField} type="datetime-local" name="end" />
              </div>
              <div className="form-group">
                <label htmlFor="place">Place </label>
                <input onChange = {updateCreateFormField} type="text" name="venue" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Event Description </label>
                <br/>
                <textarea onChange = {updateCreateFormField} name="describe" rows="4"></textarea>
              </div>
              <button type="submit">Create Event </button>
            </form>
            <button className="close-button" onClick = {() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
    </Popup>
    </div>
  )
}

export default EventPopup;
