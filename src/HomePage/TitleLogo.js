import React from 'react';
import './TitleLogo.css';
import Logo from '../image/logo-1.webp';

function TitleLogo() {
    return (
        <div className="pageContainer">
            
            <div className="logo">
                <img src={Logo} alt="The logo of LongBeach Place Inc"/>
            </div>

            <div className="title">
                LongBeach Place Inc
            </div>

        </div>
    );
}

export default TitleLogo;
