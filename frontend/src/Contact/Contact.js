import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';
import Layout from '../Layout';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import emailjs from 'emailjs-com';

const defaultTheme = createTheme();

function useLoadContentFromDatabase(ref, pageKey) {
    const backendUrl  = 'http://localhost:5000';

    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/users/load-content/${pageKey}`); 
          if (response.data.success) {
            const { html, css } = response.data;
  
            if (html && css && ref.current) {
              ref.current.innerHTML = html;
  
              const styleElement = document.createElement('style');
              styleElement.type = 'text/css';
              styleElement.innerHTML = css;
              document.head.appendChild(styleElement);
            }
          }
        } catch (error) {
          console.error("Error loading data from database:", error);
        }
      };
  
      fetchData();
    }, [ref, pageKey, backendUrl]);
  }

// function useLoadContentFromLocalStorage(ref, pageKey) {

//     useEffect(() => {
    
//     //  const mapContainer = document.getElementById(mapID); 
//         const savedHtml = localStorage.getItem(`savedHtml${pageKey}`);
//         const savedCss = localStorage.getItem(`savedCss${pageKey}`);
//         if (savedHtml && savedCss && ref.current) {
//             ref.current.innerHTML = savedHtml;

//         const styleElement = document.createElement('style');
//             styleElement.type = 'text/css';
//             styleElement.innerHTML = savedCss;
//             document.head.appendChild(styleElement);

//         }
        
        

//         }, [ref, pageKey]);


//   }


function ContactPage () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [feedback, setFeedback] = useState("");

    const ContactRef = useRef(null);
    useLoadContentFromDatabase(ContactRef, 'Contact Page');

    /*
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Feedback from ${firstName} ${lastName} ${phoneNo} with email ${email} is: ${feedback}`);
    };
    */

    const handleSubmit = (e) => {
      e.preventDefault();

      // Initialize your EmailJS user ID
      emailjs.init('P_x49JLOkWPJMQ5qc'); // Replace with your EmailJS user ID

      emailjs.sendForm('service_pp9de04', 'template_oyzc478', e.target, 'P_x49JLOkWPJMQ5qc')
        .then((result) => {
            alert('Email sent successfully!');
            console.log(result.text);
        }, (error) => {
            alert('Failed to send the email!');
            console.log(error.text);
        });
    };
      
    return (
        <Layout>
        <div ref={ContactRef} id="Contact Page">
        <div id="content-only">
            <div className="ContactSection">
                <div className="contact-content">
                    <div className="info-container">

                    <Typography component="h1" variant="h6">
                    <h2>Contact Us</h2>
                    </Typography>

                        <div className="addressInfo">
                            <h3>Longbeach PLACE Inc</h3>
                            <p>(formerly Chelsea Neighbourhood House)</p>
                            <address>
                                15 Chelsea Road<br/>
                                Chelsea<br/>
                                Victoria 3196<br/><br/>
                                Tel: <a href="tel:+0397761386">03 9776 1386</a><br/>
                                Email: <a href="mailto:reception@longbeachplace.org.au">reception@longbeachplace.org.au</a>
                            </address>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className="FeedbackForm">
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="l">
                        <CssBaseline />
                        <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                                >
                            
                            <Typography component="h1" variant="h6">
                            <h2>Contact & Enquiry Form</h2>
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={e => setFirstName(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={e => setLastName(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={e => setEmail(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="phoneNo"
                                    label="Phone No"
                                    name="phoneNo"
                                    autoComplete="tel"
                                    onChange={e => setPhoneNo(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    rowsMax={10}
                                    name="Feedback"
                                    label="Feedback"
                                    type="text"
                                    id="Feedback"
                                    variant="outlined"
                                    autoComplete="new-feedback"
                                    onChange={e => setFeedback(e.target.value)}
                                    />
                                </Grid>

                                </Grid>

                                <Button
                                type="Submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Submit
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>    
            </div>
        </Layout>
    );
}

export default ContactPage;
