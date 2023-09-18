import React, { useState } from 'react';
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

const defaultTheme = createTheme();

function ContactPage () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Feedback from ${firstName} ${lastName} with email ${email} is: ${feedback}`);
    };

    return (
        <Layout>

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
                        <h2>Subsciption & Feedback Form</h2>
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

/*  
            <h2>Subsciption & Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="feedbackform-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="feedbackform-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="feedbackform-group">
                    <label htmlFor="feedback">Please write down your feedback</label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        value={feedback}
                        onChange={e => setFeedback(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="feedbackform-group">
                    <Button variant="contained">
                        Submit
                    </Button>
                </div>
            </form>
*/

/*
function Contact() {
    return (
        <div className="contactSection">
            <h2>Contact Us</h2>
            
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

            <div className="socialMediaLinks">
                <a href="https://www.facebook.com/people/Longbeach-Place-Inc/100070987424590/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-square"></i>
                </a>
                <a href="https://www.instagram.com/longbeachplace/?hl=en" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
        </div>
    );
}

export default Contact;
*/