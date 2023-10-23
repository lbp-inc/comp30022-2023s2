import React, { useState, useEffect, useCallback } from 'react'
import "./RoomBookingAdmin.css"
import DataTable from 'react-data-table-component'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import axios from 'axios';
import DeclineList from './DeclineList'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import emitter from './eventBus';
import { RoomTimetable } from './RoomTimetable';
import Layout from '../Layout';

function RoomBookingAdmin() {

  const [data, setData] = useState([]);

  // GET request from backend to display data 
  async function fetchRoomHires() {
    try {
      const fetchedData = await fetch("http://localhost:3001/roomHire/all");
      const res = await fetchedData.json();      
      setData(res);       
    } catch (error) {
      console.error("Error fetching room hires:", error);
    }
  };  

  useEffect(() => {
    fetchRoomHires();  // Fetch data when component mounts
  }, []);

  useEffect(() => {
    // Define the event listener
    const fetchDataOnChangeEvent = () => {
      fetchRoomHires();
  };

  // Attach the event listener
  emitter.on('dataChanged', fetchDataOnChangeEvent);

  // Clean up the listener on unmount
  return () => {
    emitter.off('dataChanged', fetchDataOnChangeEvent);
  };
  }, []);


  async function updateRoomHireStatus(roomHireID, status) {
    try {
        await axios.put('http://localhost:3001/roomHire/changeStatus', { status }, {
            params: {
                roomHireID
            }
        });
        console.log('Status updated successfully');
        //console.log(roomHireID)
    } catch (error) {
        console.error('Error updating room hire status:', error);
    }
  };


  const handleAccept = useCallback(async (row) => {
    await updateRoomHireStatus(row._id, 'accepted');
    emitter.emit('requestAccepted', row);
    await fetchRoomHires();
  }, []);

  const handleDecline = useCallback(async (row) => {
    await updateRoomHireStatus(row._id, 'rejected');
    await fetchRoomHires();
  }, []);

  const handleCancel = useCallback(async (row) => {
     console.log("CANCEL",row)
     await updateRoomHireStatus(row._id, 'rejected');
     await fetchRoomHires();
  },[]);



  // Filter accept requests
  const acceptedRequest = data.filter(item => item.status === "accepted");
  //console.log("ACCEPT REQUEST", acceptedRequest)

  // Filter decline requests
  const rejectedRequest = data.filter(item => item.status === 'declined' || item.status === 'rejected');
  //console.log("DECLINE RESQUEST", rejectedRequest)

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const openInfoDialog = (row) => {
    setSelectedPerson(row);
    setOpenDialog(true);
  }

  const closeInfoDialog = () => {
    setOpenDialog(false)
  }

  const [open, setOpen] = useState(Array(acceptedRequest.length).fill(false));

  useEffect(() => {
    // This will run whenever acceptedRequest changes, updating the open state accordingly
    setOpen(prevOpen => {
      if (prevOpen.length !== acceptedRequest.length) {
        return Array(acceptedRequest.length).fill(false);
      }
      return prevOpen;
    });
  }, [acceptedRequest]);

  const handleToggle = (index) => {
    const newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
  };
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  return (

    <>

    <Layout>
    <div className='roombooking-head'> 
        <h1>Room Booking</h1>
    </div>

    <div className='request-list'>
    <TableContainer className='table-container'>
      <Table>
        <TableHead className='table-header'>
          <TableRow>
            <TableCell className='table-cell-head'><h3>Name</h3></TableCell>
            <TableCell className='table-cell'><h3>Room</h3></TableCell>
            <TableCell className='table-cell'><h3>Date</h3></TableCell>
            <TableCell className='table-cell'><h3>More Information</h3></TableCell>
            <TableCell className='table-cell'><h3>Status</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data
          .filter((row) => row.status === "pending")
          .map((row)=> 
            <TableRow key={row._id}>
              <TableCell className='table-cell-head'><h3>{row.fullName}</h3></TableCell>
              <TableCell className='table-cell'><h3>{row.chosenRoom}</h3></TableCell>
              <TableCell className='table-cell'><h3>{row.eventDate}</h3></TableCell>
              <TableCell className='table-cell'>
                <h3>
                  <Button
                    variant='contained'
                    onClick={() => openInfoDialog(row)}
                    className='info-button'
                  >
                    More Info
                  </Button>
                  </h3>
                </TableCell>
              <TableCell className='table-cell'>
                <h3>
                {row.status == "pending" ? (
                  <>
                  <Button 
                  variant='contained' 
                  onClick={() => handleAccept(row)} 
                  className='accept-button'>
                    Accept
                  </Button>
                  <Button 
                  variant='contained' 
                  onClick={() => handleDecline(row)} 
                  className='decline-button'>
                    Decline
                  </Button>
                  </>
                ):(
                  row.status
                )}
                </h3>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog open={openDialog} onClose={closeInfoDialog}>
        <DialogTitle>{selectedPerson && selectedPerson.name} Details</DialogTitle>
        <DialogContent>
          {selectedPerson && (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Activity:</TableCell>
                  <TableCell>{selectedPerson.activity}</TableCell>
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
          <Button onClick={closeInfoDialog} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    
    </div>
    
    <div className='admin-timetable'>
        <RoomTimetable></RoomTimetable>
    </div>

    <div className='accept-container'>
      <h2>List of Accepted Requests</h2>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>Room</TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>Event Date</TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {acceptedRequest.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <React.Fragment key={index}>
                <TableRow sx={{ borderBottom: open[index] ? 0 : '1px solid rgba(224, 224, 224, 1)' }}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleToggle(index)}
                    >
                      {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell align="right">{row.chosenRoom}</TableCell>
                  <TableCell align="right">{row.eventDate}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }} component="div">
                          Additional Details
                        </Typography>
                        <Table size="small" aria-label="details">
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ fontWeight: 'bold' }}>Event Start</TableCell>
                              <TableCell style={{ fontWeight: 'bold' }}>Event End</TableCell>
                              <TableCell style={{ fontWeight: 'bold' }}>Decline</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>{row.startTime}</TableCell>
                              <TableCell>{row.endTime}</TableCell>
                              <TableCell><Button onClick={() => handleCancel(row)}>Yes</Button></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={acceptedRequest.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
    
    <div className='reject-container'>
      <h2>List of Rejected Requests</h2>
       <DeclineList>{rejectedRequest}</DeclineList>
    </div>
    </Layout>
    </>
    
    )
}


export default RoomBookingAdmin