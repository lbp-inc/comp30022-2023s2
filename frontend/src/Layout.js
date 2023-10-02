import React from 'react';
import Navbar from './HomePage/Navbar';
import Footer from './HomePage/BottomPart'; 
import TitleLogo from './HomePage/TitleLogo';
import './Layout.css';
import UserMenu from './HomePage/UserMenu';
// import Login from './HomePage/Login';
import SocialMedia from './HomePage/SocialMedia';


const Layout = ({ children }) => {
    return (
        <div className="app">
            <SocialMedia />
            <UserMenu />
            <TitleLogo />
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;

// * <Login />