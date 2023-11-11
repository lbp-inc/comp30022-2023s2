import React from 'react'
import { useEffect } from 'react'
import roomImage3 from '../../image/Room 3.webp';
import BookingCalendar from '../components/BookingCalendar'
import Layout from '../../Layout'


function Room3() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const roomName = "Room 3"; // Set your predefined room name here
    localStorage.setItem("roomName", roomName);
  }, []);

  return (
    <>
      <Layout>
      <div className='room-head'>
        <h1>Room 3</h1>
      </div>
      <div><p></p></div>
      <div className='info-container'>
      <img src={roomImage3} class="room-img"></img>
      <div className='room-body'>
      <h2>Broadway Room 3</h2>
      Broadway Room 3 is dedicated I.T rooms - with laptops or can be set as required
      </div>
      </div>
      <div className='room-info'>
      <div className='room-subheading'>Broadway Room 3</div>{'\n'}
        Capacity: 11 Classroom (10 students on laptops + 1 teacher) or 15 Classroom (no laptops) 20 Theatre {'\n\n'}
        Dimensions: 5m x 5m {'\n\n'}
        Suitable for: PC classes, smaller workshops and seminars.{'\n\n'}
        Features: Carpeted room with natural light, includes hire of whiteboards and access to PowerPoint 
        projector. {'\n\n'}
        Rates: Commercial $40 per hour plus GST (not including laptops), $60 plus GST (rate includes hire of
        10 laptops) 
        Community $40 per hour plus GST (rate includes laptops){'\n\n\n'}</div>
      <div className='room-timetable'>
        <h1>Timetable</h1>
        <BookingCalendar></BookingCalendar>
      </div>
      </Layout>
    </>
  )
}

export default Room3