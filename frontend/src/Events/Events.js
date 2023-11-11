import React, { useEffect, useRef } from 'react';
import Layout from '../Layout';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import carouseImage1 from '../image/whatsNew.webp';
import carouseImage2 from '../image/whatsNew.webp';
import carouseImage3 from '../image/whatsNew.webp';
import './Events.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';


function useLoadContentFromDatabase(ref, pageKey) {
  const backendUrl  = 'http://localhost:8000';

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
//       const savedHtml = localStorage.getItem(`savedHtml${pageKey}`);
//       const savedCss = localStorage.getItem(`savedCss${pageKey}`);
//       if (savedHtml && savedCss && ref.current) {
//         ref.current.innerHTML = savedHtml;

//         const styleElement = document.createElement('style');
//         styleElement.type = 'text/css';
//         styleElement.innerHTML = savedCss;
//         document.head.appendChild(styleElement);

//         }
//     }, [ref, pageKey]);
//   }

function Events() {

    const EventsRef = useRef(null);
    useLoadContentFromDatabase(EventsRef, 'Events');

    const slides = [
        {
          image: carouseImage1,
          title: 'Event 1 title',
          body: 'Event 1 Body Text',
        },
        {
          image: carouseImage2,
          title: 'Event 2 Title',
          body: 'Event 2 Body Text',
        },
        {
          image: carouseImage3,
          title: 'Event 3 Text',
          body: 'Event 3 Body Text',
        },
      ];
    return (
        <Layout>
        <div ref={EventsRef} id="Events">
        <div id="content-only">
            <div className="eventsbanner">
                <h1>Events</h1>
            </div>
            <div className="carousel-container">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={50}
                    slidesPreview={1}
                    loop={true}
                    navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}

                >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="carousel-slide">
                        <img src={slide.image} alt={`Slide ${index + 1}`} />
                        <div className="carousel-text">
                            <div className="carousel-title">{slide.title}</div>
                            <div className="carousel-body">{slide.body}</div>
                        </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-button-prev"><FontAwesomeIcon icon={faCircleLeft} color='#fff'></FontAwesomeIcon></div>
                <div className="swiper-button-next"><FontAwesomeIcon icon={faCircleRight} color='#fff'></FontAwesomeIcon></div>
                </Swiper>
            </div>
        </div>
        </div>
        </Layout>
    );
}

export default Events;
