import React from 'react';
import './EventsTimetable.css';
import Layout from '../Layout';
import MyCalendar from './components/Timetable';

function EventsTimetable() {
  return (            
    <Layout>
        <div className='rowB'>
        <div className='App-Timetable'>
          <MyCalendar/>
        </div>
      </div>
    </Layout>
    );
}

export default EventsTimetable;
