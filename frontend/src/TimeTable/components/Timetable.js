import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { useState, useEffect } from 'react'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios'
import ShowEventPopup from './showEventPopup.js'
import EventPopup from './addEventPopup.js'



const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})



const MyCalendar = ({myEventsList, showEventApi, showEventsApi}) => {
  const [open, setOpen] = useState(false);
  const [renderStatus, reRender] = useState(false);
  const [events, setEvents] = useState(null);
  const [showEvent, setShowEvent] = useState(null);


  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchData();
  }, [renderStatus])

  //function to fatch data from backend server
  const fetchData = async () => {
    const res = await axios.get("http://localhost:8000/api/events");
    setEvents(await res.data.map(event=>{
      return{
        title: event.title,
        start: new Date(event.start) ,
        end: new Date(event.end) ,
        id: event._id,
        describe: event.describe,
        venue: event.venue
      }
    }));
  }

  //shows all event details when event is clicked in the timetable
  const openEventClick = (event)=>{
    setOpen(true);
    setShowEvent(event);
  }

  const closeEventClick = () =>{
    setOpen(false);
  }


  //calendar might not show if there is no events in DB 
  return(
    <div>
      <EventPopup
        renderStatus = {renderStatus}
        reRender = {reRender}
      />
      {open && <ShowEventPopup
        open = {open}
        event={showEvent}
        handleOpen = {openEventClick}
        handleClose = {closeEventClick}
        renderStatus = {renderStatus}
        rerender = {reRender}
      />}
      {events && 
      <Calendar
      defaultView={'week'}
      views = {['month', 'week', 'day']}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 630 }}
      onSelectEvent={openEventClick}
      />}
      
    </div>
  )
}




export default MyCalendar