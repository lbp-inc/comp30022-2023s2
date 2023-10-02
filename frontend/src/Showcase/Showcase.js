import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import './Showcase.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

import slideImage from '../image/event.webp';

function useLoadContentFromDatabase(ref, pageKey) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/load/${pageKey}`);
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
    }, [ref, pageKey]);
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


function Showcase() {

    const Showcaseref = useRef(null);
    useLoadContentFromDatabase(Showcaseref, 'Showcase');

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
        <div ref={Showcaseref} id="Showcase">
        <div id="content-only">    
            <div className='showcasePageContainer'>
                <div className='showcasebanner'>
                    <h1>Showcase</h1>
                </div>

            <div className='enjoy'>Please enjoy this collection that showcases the groups and courses we offer at LBP. </div>

            <div className='gallery'>
                <h1>Gallery</h1>
                <div className="galleryItem">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={10}
                        slidesPreview={3}
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
        </div>
        </Layout>
    );
}

export default Showcase;
