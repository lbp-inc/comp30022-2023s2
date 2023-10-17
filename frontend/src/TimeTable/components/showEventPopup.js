import "./showEventPopup.css"
import { useState } from "react"
import Popup from "reactjs-popup"
import axios from "axios"
//TODO: make seperate view for normal users

const ShowEventPopup = ({open, handleClose, event, renderStatus, rerender}) => {

  const [createForm, setCreateForm] = useState({
    title: event.title,
    start: event.start,
    end: event.end,
    describe: event.describe,
    venue: event.venue
  })

  const updateCreateFormField = (e) => {
    const {name, value} = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    })
  }

  const updateEvent = async(e) => {
    e.preventDefault();
    await axios.delete(`http://localhost:5000/api/events/${event.id}/delete`)
    await axios.post(`http://localhost:5000/api/events/`, createForm);
    handleClose();
    rerender(!renderStatus);

  }

  const showDate = (dateTime) => {
    const dt = new Date(dateTime);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0,16);
  }


  const deleteEvent = async () => {
    await axios.delete(`http://localhost:5000/api/events/${event.id}/delete`);
    handleClose();
    rerender(!renderStatus);
  }
    

  return (
  <Popup open = {open}>
    <div className="popup">
      <div className="popup-content">
        <h2 className="form-title">Event Details</h2>
        <form on onSubmit={updateEvent}>
          <div className="form-group">
            <label htmlFor="title">Title </label>
            <input defaultValue={event.title} onChange = {updateCreateFormField} type="text" name="title" />
          </div>
          <div className="form-group">
            <label htmlFor="datetime-local">Start Date </label>
            <input defaultValue={showDate(event.start)} onChange = {updateCreateFormField} type="datetime-local" name="start" />
          </div>
          <div className="form-group">
            <label htmlFor="datetime-local">End Date </label>
            <input  defaultValue={showDate(event.end)} onChange = {updateCreateFormField} type="datetime-local" name="end" />
          </div>
          <div className="form-group">
            <label htmlFor="place">Place </label>
            <input defaultValue={event.venue}  onChange = {updateCreateFormField} type="text" name="venue" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Event Description </label>
            <br/>
            <textarea defaultValue = {event.describe} onChange = {updateCreateFormField} name="describe" rows="4"></textarea>
          </div>
            <button type="submit">Update </button>
        </form>
        <button className="delete-button" onClick = {() => {deleteEvent()}}>
          Delete
        </button>
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
    
  </Popup>
  )
}



export default ShowEventPopup