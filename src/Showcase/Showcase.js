import React from 'react';
import Layout from '../Layout';
import './Showcase.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

import slideImage from '../image/event.webp';

function Showcase() {
    const slides = [
        { image: slideImage, text: 'Image 1' },
        { image: slideImage, text: 'Image 2' },
        { image: slideImage, text: 'Image 3' },
        { image: slideImage, text: 'Image 4' },
        { image: slideImage, text: 'Image 5' },
        { image: slideImage, text: 'Image 6' },
    ];

    return (
        <Layout>
            <div className='showcasePageContainer'>
                <div className='showcaseHeader'>
                    <h1>Showcase</h1>
                </div>

            <div className='enjoy'>Please enjoy this collection that showcases the groups and courses we offer at LBP. </div>

            <div className='gallery'>
                <h1>Gallery</h1>
                <div className='galleryItem'>
                    <div className="swiper-container">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={3}
                            loop={true}
                            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <img src={slide.image} alt={slide.text}/>
                                </SwiperSlide>
                            ))}
                            <div className="swiper-button-prev"><FontAwesomeIcon icon={faCircleLeft} color='#fff'></FontAwesomeIcon></div>
                            <div className="swiper-button-next"><FontAwesomeIcon icon={faCircleRight} color='#fff'></FontAwesomeIcon></div>
                        </Swiper>
                    </div>
                </div>
            </div>

            </div>
        </Layout>
    );
}

export default Showcase;
