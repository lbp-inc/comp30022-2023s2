import React from 'react';
import './MainContent.css';
// import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

import swiperImage1 from '../image/All Abil Comms - Website.jpg';
import swiperImage2 from '../image/NewImage/Art.png';
import swiperImage3 from '../image/Website Pic - EAL.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';


//Swiper.use([Autoplay]);
//SwiperCore.use([Navigation]);

function MainContent() {

    const slides = [
        { 
            image: swiperImage1, 
            text: 'Improve reading, writing and numeracy skills for everyday life! \nClasses include the practice of money recognition, measuring and weighing skills. Classes also focus on writing, vocabulary and word recognition skills.',
            time: 'Thursdays 10:30am',
            fee: ''
        },
        { 
            image: swiperImage2, 
            text: 'Come and join others in our relaxed environment as we explore visual arts across a range of mediums. Every fortnight you\'ll paint still life with watercolours or acrylics, learn to sketch and enjoy a chat and a cuppa, then take home your masterpieces! Learn about colours, form and perspective and let you creativity go wild.' ,
            time: '',
            fee: ''
        },
        { 
            image: swiperImage3, 
            text: 'Friendly and supportive English classes designed using blended learning to develop communication skills for everyday life or the workplace. Classes include the practice of reading, writing, speaking and listening.',
            time: 'Monday 9:30 am Friday 10:30 am',
            fee: '$14 per session non-residents'
        },
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
                                <div className="image-part">
                                    <img src={slide.image} alt={slide.text}/>
                                </div>
                                
                                <div className="text-part">
                                    <p>{slide.text}</p>
                                    <p>{slide.time}</p>
                                    <p>{slide.fee}</p>
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
