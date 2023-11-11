import React from 'react'
import { useState } from 'react';
import './DonationAdmin.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@mui/material';
import Layout from '../Layout';

function DonationAdmin() {

  const [donations, setDonations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Dummy data for demonstration
  const dummyData = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      donationAmount: 100,
      comments: "Thank you for your support!",
      date: "2023-09-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-07-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 3,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-07-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 4,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-11-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 5,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-03-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 6,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-03-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 7,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-11-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 8,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-11-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 9,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-12-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 10,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-12-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 11,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-09-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 12,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-08-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 13,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-08-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
    {
      id: 14,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      donationAmount: 50,
      comments: "Keep up the great work!",
      date: "2023-10-09T07:00:05.478Z",
      status: "Finished",
      __v: 0
    },
  ];

  // Populate the donations state with dummy data
  useState(() => {
    setDonations(dummyData);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedDate(new Date(selectedMonth));
  };

  const filteredDonations = selectedDate
    ? donations.filter(
      (donation) =>
        donation.date.slice(0, 7) ===
        selectedDate.toISOString().slice(0, 7)
    )
    : donations;

  const handleResetFilter = () => {
    setSelectedDate(null);
  };


  return (
    <>
      <Layout>
      <div className='admin-head'>
        <h1>Donation</h1>
      </div>

      <div className='filter-section'>
        <label htmlFor='filterMonth'>Filter by Month: </label>
        <input
          type='month'
          id='filterMonth'
          value={
            selectedDate
              ? selectedDate.toISOString().slice(0, 7)
              : ''
          }
          onChange={handleMonthChange}
        />
        <Button onClick={handleResetFilter} className='filter-reset-btn'>
          Reset Filter
        </Button>
      </div>

      <div className='donate-list-section'>
        <h2>List of donations</h2>

        <div className='donate-table'>
          <table>
            <thead className='table-head'>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Donation Amount</th>
                <th>Comments</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.id}</td>
                  <td>{donation.firstName}</td>
                  <td>{donation.lastName}</td>
                  <td>{donation.email}</td>
                  <td>${donation.donationAmount}</td>
                  <td>{donation.comments}</td>
                  <td>{new Date(donation.date).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </Layout>
    </>
  );
}

export default DonationAdmin