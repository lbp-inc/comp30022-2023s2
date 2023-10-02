import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';
import { Link, useNavigate } from 'react-router-dom';
import './EditorLogin.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { green } from '@mui/material/colors';



const defaultTheme = createTheme();
const PRESET_ACCOUNT = "admin";
const PRESET_PASSWORD = "password123";


export default function EditSignIn() {
  
    const formRef = useRef(null);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
    event.preventDefault();
    
    if (formRef.current) {
        const data = new FormData(formRef.current);
        const accountNumber = data.get('Account Number');
        const password = data.get('password');
  
        // console.log({
        //   accountNumber: data.get('Account Number'),
        //   password: data.get('password'),
        // });
  
        if (accountNumber === PRESET_ACCOUNT && password === PRESET_PASSWORD) {

            Swal.fire({
                title: 'Welcome!',
                icon: 'success',
                timer: 1500,        
                showConfirmButton: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
            }).then(() => {
                navigate("/Editor");
            });
        } else {
            Swal.fire({
                title: 'Error!',
                icon: 'error',
                text: 'Invalid account number or password!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#000000',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
            });
        }
      }
    };


  return (

    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        <Grid className="EditLogin">
          <Link to="/">
          <FontAwesomeIcon icon={faDoorOpen} className="EditLoginButton" />
          </Link>
        </Grid>
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://picsum.photos/2560/1440)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: 'black'}}>
            </Avatar>
            <Typography component="h1" variant="h5.5">
              Administor Sign In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} ref={formRef} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Account Number"
                label="Account Number"
                name="Account Number"
                autoComplete="Account Number"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2, backgroundColor: 'black', '&:hover': { backgroundColor: 'grey' } }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}