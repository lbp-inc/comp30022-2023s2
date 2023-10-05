import React from 'react';
import './UserMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function TopCorner() {  
    return (
        <div className="userMenuContainer">
            {/* <Link to="/LogIn"> */}
            <Link to="/login">
                <FontAwesomeIcon icon={faUser} 
                 className="userIcon" 
            /></Link>
        </div>
    );
}

export default TopCorner;

