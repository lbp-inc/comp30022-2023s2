import React from 'react'
import { useState, useEffect } from 'react'
import './Room.css'
import roomImage1 from '../../image/Room 1 and 2 combined.jpg';
import BookingCalendar from '../components/BookingCalendar'
import Layout from '../../Layout';

function Room1and2() {

  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const roomName = "Room 1 and 2"; // Set your predefined room name here
    localStorage.setItem("roomName", roomName);
  }, []);

  return (
    <>
      <Layout>
      <div className='room-head'>
        <h1>Room 1 and 2</h1>
      </div>
      <div><p></p></div>
      <div className='info-container'>
        <img src={roomImage1} className='room-img'></img>
        <div className='room-body'>
          <h2>Combined Chelsea and Thames Room</h2>
          Chelsea Room 1 and Thames Room 2 can be utilised together as one large space, or divided into two spaces. This large
          space is great for meetings, exercise based classes, art groups (there are sinks available) and for community morning
          teas/lunches (we have urns and a small fridge available for use in these rooms and it is connected via a serving window to the kitchen)
        </div>
      </div>
      <div className='room-info'>
        <div className='room-subheading'>Chelsea Room 1</div>
        {'\n'}
        Capacity: 20 Theatre, 15 Classroom, 15 Boardroom, 30 Reception{'\n\n'}
        Dimensions: 6m x 7m{'\n\n'}
        Suitable for: Meetings, workshops, seminars, community groups, functions, exhibitions, active
        classes and social gatherings.{'\n\n'}
        Features: Hard floors with natural light, ceiling fans, reverse cycle heating and cooling, access to full
        kitchen and kitchen servery window. Includes hire of whiteboards and access to PowerPoint
        projector.{'\n\n'}
        Rates: Commercial $30 per hour plus GST Community $15 Per hour plus GST{'\n\n\n'}
        <div className='room-subheading'>Thames Room 2</div>
        {'\n'}
        Capacity: 30 Theatre, 15 Classroom, 15 Boardroom, 30 Reception{'\n\n'}
        Dimensions: 6m x 7m{'\n\n'}
        Suitable for: Meetings, workshops, seminars, community groups, functions, exhibitions, active
        classes and social gatherings{'\n\n'}
        Features: Hard floors with natural light, ceiling fans, reverse cycle heating and cooling, access to
        outdoor space, sink with prep space. Includes hire of whiteboards and access to PowerPoint
        projector.{'\n\n'}
        Rates: Commercial $30 per hour plus GST{'\n\n\n'}
        <div className='room-subheading'>Combined Chelsea/Thames Room 1&2</div>
        {'\n'}
        Capacity: 50 Theatre, 30 Classroom, 15 Boardroom, 70 Reception, 40 Banquet{'\n\n'}
        Dimensions: 12m x 14m{'\n\n'}
        Suitable for: Meetings, workshops, seminars, community groups, functions, exhibitions, active
        classes, social gatherings and weddings{'\n\n'}
        Features: Hard floors with natural light, ceiling fans, reverse cycle heating and cooling, access to
        outdoor space, sink with prep space, access to full kitchen and servery window. Includes hire of
        whiteboards and access to PowerPoint projector.{'\n\n'}
        Rates: Commercial $55 per hour plus GST{'\n\n\n'}
      </div>

      <div className='room-timetable'>
        <h1>Timetable</h1>
        <BookingCalendar></BookingCalendar>
      </div>
      </Layout>
    </>

  )
}

export default Room1and2