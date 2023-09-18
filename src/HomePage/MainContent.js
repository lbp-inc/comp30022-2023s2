import React from 'react';
import './MainContent.css';
// import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

import swiperImage1 from '../image/whatsNew.webp';
import swiperImage2 from '../image/whatsNew.webp';
import swiperImage3 from '../image/whatsNew.webp';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

//Swiper.use([Autoplay]);
//SwiperCore.use([Navigation]);

function MainContent() {

    const slides = [
        { image: swiperImage1, text: 'Text for image 1' },
        { image: swiperImage2, text: 'Text for image 2' },
        { image: swiperImage3, text: 'Text for image 3' },
    ];
   
    return (
        <div className="pageContainer">

            <div className="swiper-container">
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

                        <div className="background-container">
                            
                            <div className="split-container">
                                
                                <div className="text-part">
                                    {slide.text}
                                </div>

                                <div className="image-part">
                                    <img src={slide.image} alt={slide.text}/>
                                </div>

                            </div>

                        </div>
                    </SwiperSlide>
                ))}

                <div className="swiper-button-prev"><FontAwesomeIcon icon={faCircleLeft} color='#fff'></FontAwesomeIcon></div>
                <div className="swiper-button-next"><FontAwesomeIcon icon={faCircleRight} color='#fff'></FontAwesomeIcon></div>
                </Swiper>


            </div>

        </div>
    );
}

export default MainContent;
