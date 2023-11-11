import React from 'react';
import './EventsTimetable.css';
import MyCalendar from './components/Timetable';

function EventsTimetable() {
  return (            
  <div className="app">
    <div id="Timetable"></div>
      <div className='rowB'>
      <div className='App-Timetable'>
        <MyCalendar/>
      </div>
    </div>
  </div>
  );
}

export default EventsTimetable;
