import React from 'react'
import { useEffect } from 'react'
import roomImage5 from '../../image/Room 5.jpg';
import BookingCalendar from '../components/BookingCalendar'
import Layout from '../../Layout';

function Room5() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const roomName = "Room 5"; // Set your predefined room name here
    localStorage.setItem("roomName", roomName);
  }, []);

  return (
    <>
      <Layout>
      <div className='room-head'>
        <h1>Room 5</h1>
      </div>
      <div><p></p></div>
      <div className='info-container'>
      <img src={roomImage5} class="room-img"></img>
      <div className='room-body'>
      <h2>Oakwood Room 5</h2>
        Oakwood Room 5 is also available to be hired and set in a number of formats
      </div>
      </div>
      <div className='room-info'>
        <div className='room-subheading'>Oakwood Room 5</div>{'\n'}
        Capacity: 50 Theatre, 30 Classroom, 15 Boardroom, 70 Reception , 40 Banquet{'\n\n'}
        Dimensions: 12m x 14m{'\n\n'}
        Suitable for: Meetings, workshops, seminars, community groups, functions & social gatherings{'\n\n'}
        Features: Hard floors with natural light, includes hire of whiteboards and access to PowerPoint
        projector and access to north facing outdoor space.{'\n\n'}
        Rates: Commercial $45 per hour plus GST Community $15 per hour plus GST{'\n\n'}
        Availability: Weekdays from 5.30pm onwards, Weekends {'\n\n\n'}
      </div>
      <div className='room-timetable'>
        <h1>Timetable</h1>
        <BookingCalendar/>
      </div>
      </Layout>
    </>
  )
}

export default Room5