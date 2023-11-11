import React from 'react'
import { Calendar } from 'react-calendar'
import { useState } from 'react';
import styled from 'styled-components';
import './BookingCalendar.css'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function BookingCalendar() {
    const [date, setDate] = useState(new Date().setHours(0,0,0,0));
    const currentDate = new Date().setHours(0,0,0,0)

    const CalendarContainer = styled.div`
    /* ~~~ container styles ~~~ */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 20px;
    background-color: #B2E5E4;
    padding: 10px;
    border-radius: 3px;
    width: 80%;
    min-height: 300px;
    margin-bottom: 20px;
    
    /* ~~~ navigation styles ~~~ */
    .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
    }

    /* Calendar styles */
    .react-calendar {
      /* Set the width of the calendar */
      width: 80%; /* Adjust the width as needed */

      /* Adjust the font size to make text bigger */

      @media screen and (max-widthL 1300px){
        width: 40px;
        height: auto;
        font-size:1 rem;
      }
    }

    /* ~~~ label styles ~~~ */
    .react-calendar__month-view__weekdays {
        text-align: center;
    }
    
    /* ~~~ button styles ~~~ */
    button {
    margin: 4px;
    background-color: white;
    border: 0;
    border-radius: 3px;
    color: black;
    padding: 5px 0;

    &:hover {
      background-color:  rgb(191, 196, 196);
    }

    &:active {
      background-color: #a5c1a5;
    }
    }

    /* ~~~ day grid styles ~~~ */
    .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%; 

    .react-calendar__tile {
      max-width: initial !important;
    }

    /* ~~~ neighboring month & weekend styles ~~~ */
    .react-calendar__month-view__days__day--neighboringMonth {
        opacity: 0.7;
    }
    .react-calendar__month-view__days__day--weekend {
        color: red;
    }
    }

    /* ~~~ active day styles ~~~ */
    .react-calendar__tile--range {
        box-shadow: 0 0 6px 2px black;
    }

    /* ~~~ other view styles ~~~ */
    .react-calendar__year-view__months, 
    .react-calendar__decade-view__years, 
    .react-calendar__century-view__decades {
        display: grid !important;
        grid-template-columns: 20% 20% 20% 20% 20%;

        &.react-calendar__year-view__months {
        grid-template-columns: 33.3% 33.3% 33.3%;
        }

        .react-calendar__tile {
        max-width: initial !important;
        }
    }

    .react-calendar__month-view__weekdays__weekday abbr {
        text-decoration: none;
    }

    .react-calendar__tile--now {
        background-color: #D89D5B; /* Adjust the color as needed */
        color: white; /* Adjust the text color as needed */
      }
    `;

    const navigator = useNavigate();

    const handleChooseDate = (event) => {
      localStorage.setItem("selectedDate", new Date(date).toDateString());
      navigator('/RoomHireForm');
    }
     

    return (
      <div className='booking-calendar'>
        <div className=''>
          <CalendarContainer>
            <Calendar
              onChange={(value) => setDate(value.setHours(0, 0, 0, 0))}
              value={new Date(date)}
              tileClassName={({ date }) =>
                date < currentDate ? 'disabled-date' : null
              }
            />
          </CalendarContainer>
        </div>
        {date >= currentDate && (
          <p className='chosen-date'>
            <span className='bold'>Selected Date: </span> {new Date(date).toDateString()}?
            <Button onClick={handleChooseDate} className='calendar-button'>
              Yes
            </Button>
          </p>
        )}
      </div>
    );
}

export default BookingCalendar;