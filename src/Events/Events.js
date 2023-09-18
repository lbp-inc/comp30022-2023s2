import React from 'react';
import Layout from '../Layout';
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
function Events() {
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
            <div className="newsTitleEvent">
                <h1>Event</h1>
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
        </Layout>
    );
}

export default Events;
