import React from 'react';
import './TitleLogo.css';
import Logo from '../image/logo_new.png';

function TitleLogo() {
    return (
        <div className="pageContainer">
            
            <div className="logo">
                <img src={Logo} alt="The logo of LongBeach Place Inc"/>
            </div>

            <div className="title">
                Longbeach Place Inc.
            </div>

        </div>
    );
}

export default TitleLogo;
