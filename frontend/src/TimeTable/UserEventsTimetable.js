import React from 'react';
import './UserEventsTimetable.css';
import Layout from '../Layout'
import MyCalendarU from './components/UserTimetable';

function UserEventsTimetable() {
  return (            
  <Layout>
    <div id="Timetable"></div>
      <div className='rowB'>
      <div className='App-Timetable'>
        <MyCalendarU/>
      </div>
    </div>
  </Layout>
  );
}

export default UserEventsTimetable;
