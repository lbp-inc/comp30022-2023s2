import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import './Home.css';
import MainContent from './MainContent';
import Navbar from './Navbar';
import BottomPart from './BottomPart';
import Sponser from './Sponser';
import UserMenu from './UserMenu';
// import Login from './Login';
import WhatsNew from './WhatsNew';
import SocialMedia from './SocialMedia';
import TitleLogo from './TitleLogo';

function useLoadContentFromDatabase(ref, pageKey) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://longbeachbackend-2c4b09f98b44.herokuapp.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/load/${pageKey}`);
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
    
//   useEffect(() => {
//   //  const mapContainer = document.getElementById(mapID); 
//     const savedHtml = localStorage.getItem(`savedHtml${pageKey}`);
//     const savedCss = localStorage.getItem(`savedCss${pageKey}`);
//     if (savedHtml && savedCss && ref.current) {
//       ref.current.innerHTML = savedHtml;

//       const styleElement = document.createElement('style');
//       styleElement.type = 'text/css';
//       styleElement.innerHTML = savedCss;
//       document.head.appendChild(styleElement);

//       }
//   }, [ref, pageKey]);
// }

function Home() {

  const HomeRef = useRef(null);
  useLoadContentFromDatabase(HomeRef, 'Home');

  return (
    <div>
    <div ref={HomeRef} id="Home">
    <div id="content-only">    
      <div className="Home"> 
        <UserMenu />
        <TitleLogo />
        <SocialMedia />
        <Navbar />
        <MainContent />
        <WhatsNew />
        <Sponser />
      </div>
    </div>
    </div>
      <BottomPart />
    </div>
  );
}

export default Home;
