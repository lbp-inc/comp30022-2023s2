import Popup from "reactjs-popup"

const ShowEventU = ({open, handleClose, event}) => {

  const showDate = (dateTime) => {
    const dt = new Date(dateTime);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0,16);
  }

    

  return (
  <Popup open = {open}>
    <div className="popup">
      <div className="popup-content">
        <h2 className="form-title">Event Details</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title </label>
            <input value={event.title} name="title" />
          </div>
          <div className="form-group">
            <label htmlFor="datetime-local">Start Date </label>
            <input value={showDate(event.start)} type="datetime-local" name="start" />
          </div>
          <div className="form-group">
            <label htmlFor="datetime-local">End Date </label>
            <input  value={showDate(event.end)} type="datetime-local" name="end" />
          </div>
          <div className="form-group">
            <label htmlFor="place">Place </label>
            <input value={event.venue} type="text" name="venue" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Event Description </label>
            <br/>
            <textarea value = {event.describe} name="describe" rows="4"></textarea>
          </div>
        </form>
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
    
  </Popup>
  )
}



export default ShowEventU