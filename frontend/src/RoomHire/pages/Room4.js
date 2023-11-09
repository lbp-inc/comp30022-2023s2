import React from 'react'
import { useEffect } from 'react'
import roomImage4 from '../../image/Room 4.webp';
import BookingCalendar from '../components/BookingCalendar'
import Layout from '../../Layout'

function Room4() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    const roomName = "Room 4"; // Set your predefined room name here
    localStorage.setItem("roomName", roomName);
  }, []);
  return (
    <>
      <Layout>
      <div className='room-head'>
        <h1>Room 4</h1>
      </div>
      <div><p></p></div>
      <div className='info-container'>
      <img src={roomImage4} class="room-img"></img>
      <div className='room-body'>
      <h2>Swanpool Room 4</h2>
        Swanpool Room 4 are dedicated I.T rooms - with laptops or can be set as required
      </div>
      </div>
      <div className='room-info'>
        <div className='room-subheading'>Swanpool Room 4</div>{'\n'}
        Capacity: 10 Theatre, 6 Classroom, 8 Boardroom{'\n\n'}
        Dimensions: 6m x 4m{'\n\n'}
        Suitable for: Small intimate classes or business meetings.{'\n\n'}
        Features: Carpeted room with natural light, includes hire of whiteboards and access to PowerPoint
        projector.{'\n\n'}
        Rates: Commercial $20 per hour plus GST Community $10 per hour plus GST{'\n\n\n'}
      </div>
      <div className='room-timetable'>
        <h1>Timetable</h1>
        <BookingCalendar/>
      </div>
      </Layout>
    </>
  )
}

export default Room4