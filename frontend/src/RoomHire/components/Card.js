import React from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CCardGroup, CCardImage } from '@coreui/react';
import roomImage1 from '../../image/Room 1 and 2 combined.jpg';
import roomImage3 from '../../image/Room 3.webp';
import roomImage4 from '../../image/Room 4.webp';
import roomImage5 from '../../image/Room 5.jpg';
import roomImage6 from '../../image/Room 6.jpg';
import './Card.css'
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export function Card() {

    const [click, setClick] = useState(false)
    const handleClick = () => {console.log("CLICK")}

  return (
    <>
        <CCardGroup className='rh-card-group'>
            <CCard className='rh-card'>
                <CCardTitle className='card-title'>Room 1 and 2</CCardTitle>
                <CCardImage orientation='top' src={roomImage1} className='card-image'></CCardImage>
                <div className="card-btns">
                    <Link to="/Room1and2">
                        <Button
                        className= 'btns'
                        onClick={handleClick}
                        variant='contained'
                        >
                            Explore 
                        </Button>
                    </Link>
                </div>
            </CCard>
            <CCard className='rh-card'>
                <CCardTitle className='card-title'>Room 3</CCardTitle>
                <CCardImage orientation='top' src={roomImage3} className='card-image'></CCardImage>
                <div className="card-btns">
                    <Link to="/Room3">
                        <Button
                        variant='contained'
                        className='btns'
                        onClick={handleClick}
                        >
                            Explore
                        </Button>
                    </Link>
                </div>
            </CCard>
            <CCard className='rh-card'>
                <CCardTitle className='card-title'>Room 4</CCardTitle>
                <CCardImage orientation='top' src={roomImage4} className='card-image'></CCardImage>
                <div className="card-btns">
                    <Link to="/Room4">
                        <Button
                        className= 'btns'
                        onClick={handleClick}
                        variant='contained'
                        >
                            Explore
                        </Button>
                    </Link>
                </div>
            </CCard>
            <CCard className='rh-card'>
                <CCardTitle className='card-title'>Room 5</CCardTitle>
                <CCardImage orientation='top' src={roomImage5} className='card-image'></CCardImage>
                <div className="card-btns">
                    <Link to="/Room5">
                        <Button
                        className= 'btns'
                        onClick={handleClick}
                        variant='contained'
                        >
                            Explore
                        </Button>
                    </Link>
                </div>
            </CCard>
            <CCard className='rh-card'>
                <CCardTitle className='card-title'>Room 6</CCardTitle>
                <CCardImage orientation='top' src={roomImage6} className='card-image'></CCardImage>
                <div className="card-btns">
                    <Link to="/Room6">
                        <Button
                        className= 'btns'
                        onClick={handleClick}
                        variant='contained'
                        >
                            Explore
                        </Button>
                    </Link>
                </div>
            </CCard>
        </CCardGroup>
    </>
  )
}

