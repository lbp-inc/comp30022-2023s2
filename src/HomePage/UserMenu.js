import React, { useState } from 'react';
import './UserMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function TopCorner({onClick}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   
    return (
        <div className="userMenuContainer">
            <FontAwesomeIcon icon={faUser} 
                             className="userIcon" 
                             onMouseEnter={() => setIsDropdownOpen(true)} 
                             onMouseLeave={() => setIsDropdownOpen(false)}
            />

            {isDropdownOpen && (
                <div className="dropdownMenu" 
                     onMouseEnter={() => setIsDropdownOpen(true)} 
                     onMouseLeave={() => setIsDropdownOpen(false)}>
                    
                    <table className='menuItem'>
                        <tr><td><Link to="/LogIn">Login</Link></td></tr>
                        <tr><td>Register</td></tr>
                    </table>

                </div>
            )}

        </div>
    );
}

export default TopCorner;

// <div className="menuItem">
// <Link to = "/LogIn" className="Link">
// <button onClick={onClick} className="menuLoginButton">Login</button>
// </Link>
// </div>

// <div className="menuItem">Register</div>