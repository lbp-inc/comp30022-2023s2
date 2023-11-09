import React from 'react'
import { useEffect } from 'react'
import roomImage6 from '../../image/Room 6.jpg';
import BookingCalendar from '../components/BookingCalendar'
import Layout from '../../Layout'

function Room6() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    const roomName = "Room 6"; // Set your predefined room name here
    localStorage.setItem("roomName", roomName);
  }, []);

  return (
    <>
      <Layout>
      <div className='room-head'>
        <h1>Room 6</h1>
      </div>
      <div><p></p></div>
      <div className='info-container'>
      <img src={roomImage6} class="room-img"></img>
      <div className='room-body'>
      <h2>Kingston Room 6</h2>
        Kingston Room 6 is a fantastic space for smaller meetings and we also run pilates/yoga classes in this carpeted room.
      </div>
      </div>
      <div className='room-info'>
        <div className='room-subheading'>Kingston Room 6</div>{'\n'}
        Capacity: 20 Theatre, 15 Classroom, 15 Boardroom, 20 Reception{'\n\n'}
        Dimensions: 6m x 4m{'\n\n'}
        Suitable for: Community group meetings, board meetings and AGMs{'\n\n'}
        Features: Carpeted room with natural light, direct access to kitchen, includes hire of whiteboards
        and access to PowerPoint projector.{'\n\n'}
        Rates: Commercial $30 per hour plus GST Community $15 per hour plus GST{'\n\n\n'}
      </div>
      <div className='room-timetable'>
        <h1>Timetable</h1>
        <BookingCalendar/>
      </div>
      </Layout>
    </>
  )
}

export default Room6