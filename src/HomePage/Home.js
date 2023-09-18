// import React, { useState } from 'react';
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

function Home() {

  return (
    <div className="Home"> 
      <UserMenu />
      <TitleLogo />
      <SocialMedia />
      <Navbar />
      <MainContent />
      <WhatsNew />
      <Sponser />
      <BottomPart />
      
    </div>
  );
}

export default Home;
