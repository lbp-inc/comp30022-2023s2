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
          const response = await axios.get(`http://localhost:8000/api/load/${pageKey}`);
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

            <div className='enjoy1'><h1>The Indigenous and Multicultural Garden project – Longbeach Place</h1>
            <div className='enjoy2'>The Indigenous and Multicultural Garden in consultation with Edible Eden Garden Design,
            City of Kingston and Carrum Indigenous Nursery to design and develop this amazing garden
            full of edible plants for the community to enjoy!</div>
            </div>
            
            <div className='section2'>
                <div className='enjoyText'>
                    <p>Our launch on Monday 28 November 2022 featured an official "Turning of the Sod"
                    ceremony and workshops that showed how to make delicious Indigenous teas and
                    explained their health benefits. We also learnt how to plant and enjoy a sensory garden.</p>

                    <p>LBP recently had 25 people attend a very informative Coastal Foraging workshop where
                    uses of plants are identified from natural curing skin ailments, quenching thirst and a plant
                    soap. Part of the amazing day was also spent in the afternoon experimenting with
                    flavoured toffees, chocolates and truffles using indigenous plants. Great feedback and fun
                    and laughter was had.</p>
                    </div>
                <div className='enjoyPic'>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
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

            <div className='enjoy'> LBP also delivered a weaving, indigenous pharmacy and pampering workshops with Eco silk
            dyeing and bush survival workshops coming up that are already booked out.</div>

            <div className='enjoy'> The showcase garden is open during office hours for people to take a self-guided tour. All
            plants are signed and coded for their uses. </div>

            <div className='gallery'>
                <h1>Gallery</h1>
                <div className="galleryItem">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={10}
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

                <div className="galleryItemResponsive">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
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
