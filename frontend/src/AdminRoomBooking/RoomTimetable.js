import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import "./Timetable.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from '@fullcalendar/multimonth'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from "react-router-dom";
import axios from "axios";
import emitter from "./eventBus";

export function RoomTimetable() {
  const calendarRef = React.useRef();
  const [clickCount, setClickCount] = useState(0);
  const [selectedDate, selectSelectedDate] = useState(null)

  //  GET request

  const [data, setData] = useState([]);
  async function getBookings(){
    try{
      const fetchedData = await fetch("http://localhost:3001/roomHire/all");
      const res = await fetchedData.json();
      setData(res)
    }catch (error){
      console.log("Error fetching booking for timetable: ", error)
    }
  }

  useEffect(() => {
    getBookings();
    const updateTimetable = () => {
      getBookings();
    };
    
    emitter.on('requestAccepted', updateTimetable);

    // Cleanup
    return () => {
      emitter.off('requestAccepted', updateTimetable);
    };
  }, []);

  const events = [];
  
  async function updateRoomHireStatus(roomHireID, status) {
    try {
        await axios.put('http://localhost:3001/roomHire/changeStatus', { status }, {
            params: {
                roomHireID
            }
        });
        console.log('Status updated successfully');
    } catch (error) {
        console.error('Error updating room hire status:', error);
    }
  };

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const openInfoDialog = (row) => {
    setSelectedPerson(row);
    setOpenDialog(true);
  }

  const closeInfoDialog = () => {
    setOpenDialog(false)
  }

  function checkStatus(event){
    if(event.status == "accepted"){
      return true;
    } else {
      return false;
    }
  }

  const [state, setState] = useState({ clickInfo: null });

  function handleEventClick(clickInfo) {
    const event = clickInfo.event;
    const eventData = event.extendedProps.originalData;
    setState({ clickInfo: clickInfo });
    openInfoDialog(eventData);
  }

  async function handleEventRemove() {
    console.log("!",state.clickInfo.event.id);
    const chosenID = state.clickInfo.event.id;
    if(window.confirm("Are you sure you want to cancel this event?")==true){
      await updateRoomHireStatus(chosenID, 'rejected');
      emitter.emit('dataChanged');
      await getBookings();
      closeInfoDialog();
    }
  };

  const handleDateClick = (dateClickInfo) => {
    if(calendarRef.current.getApi().view.type!='timeGridWeek'){
      let calendarApi = calendarRef.current.getApi().changeView('dayGridMonth', dateClickInfo.date);
    }
  }
  

  function eventList(){
    for (const event of data){
        if (checkStatus(event)){
          events.push(event)
          if(event.chosenRoom === 'Room 1'){
            event.backgroundColor = 'teal';
          } else if(event.chosenRoom === 'Room 2'){
            event.backgroundColor = '#FFA04C';
          } else if(event.chosenRoom === 'Room 1&2'){
            event.backgroundColor = '#DE7FFF';
          } else if(event.chosenRoom === 'Room 3'){
            event.backgroundColor = '#7FB1FF';
          } else if(event.chosenRoom === 'Room 4'){
            event.backgroundColor = 'lightgreen';
          } else if(event.chosenRoom === 'Room 5'){
            event.backgroundColor = 'green';
          } else if(event.chosenRoom === 'Room 6'){
            event.backgroundColor = 'purple';
          }
        }
    }

    const eventsFormatted = events.map(function(booking){
      return {
          id:booking._id, 
          title: booking.activity, 
          start: new Date(booking.startTime).toISOString(), 
          end: new Date(booking.endTime).toISOString(), 
          backgroundColor: booking.backgroundColor,
          extendedProps: {
              originalData: booking
          }
      };
  });
    console.log(eventsFormatted);
    return eventsFormatted;
  }

  console.log("PERSON", selectedPerson);
  
  return (
    <>
      
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "multiMonthYear,dayGridMonth,timeGridWeek"
        }}
        height={800}
        selectable={true}
        events={eventList()}
        dayMaxEvents={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      <Dialog open={openDialog} onClose={closeInfoDialog}>
        <DialogTitle>{selectedPerson && selectedPerson.name} Details</DialogTitle>
        <DialogContent>
          {selectedPerson && (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Full Name:</TableCell>
                  <TableCell>{selectedPerson.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone Number:</TableCell>
                  <TableCell>{selectedPerson.phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email:</TableCell>
                  <TableCell>{selectedPerson.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ABN: </TableCell>
                  <TableCell>{selectedPerson.abn}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Event Start:</TableCell>
                  <TableCell>{selectedPerson.startTime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Event End: </TableCell>
                  <TableCell>{selectedPerson.endTime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address:</TableCell>
                  <TableCell>{selectedPerson.streetAddress + ", " + selectedPerson.suburb}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Postcode:</TableCell>
                  <TableCell>{selectedPerson.postcode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payment Method:</TableCell>
                  <TableCell>{selectedPerson.paymentMethod}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Organisation Auspiced:</TableCell>
                  <TableCell>{selectedPerson.organisationAuspiced}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Public liability insurance:</TableCell>
                  <TableCell>{selectedPerson.publicLiabilityInsurance}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEventRemove} color='primary'>
            Cancel Event?
          </Button>
          <Button onClick={closeInfoDialog} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
    
  );
};