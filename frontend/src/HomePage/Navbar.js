import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();
    const [hamburgerActive, setHamburgerActive] = useState(false);
  
    const toggleHamburger = () => {
      setHamburgerActive(!hamburgerActive);
    };

    useEffect(() => {
        const hash = location.hash.substring(1); // remove the '#' symbol
        // Scroll to the element
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    useEffect(() => {
        // Handle window resize
        const handleResize = () => {
          if (window.innerWidth > 768) {
            setHamburgerActive(false); // Disable hamburger menu on large screens
          }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      return (
        <div className="navBar">
          <div className={`hamburger-menu ${hamburgerActive ? 'active' : ''}`} onClick={toggleHamburger}>
            ☰
          </div>
          <div className={`hamburger-content ${hamburgerActive ? 'active' : ''}`}>
            <Link to="/">HOME</Link>
            <Link to="/AboutUs">ABOUT US</Link>
            <Link to="/Activities">ACTIVITIES</Link>
            <Link to="/Showcase">SHOWCASE</Link>
            <Link to="/Events">EVENTS</Link>
            <Link to="/Getinvolved">GET INVOLVED</Link>
            <Link to="/RoomHire">ROOM HIRE</Link>
            <Link to="/Contact">CONTACT</Link>
          </div>
          <table>
          <tr>
                      <td><Link to="/">HOME</Link></td>
                      <td onMouseEnter={() => setActiveDropdown('about')} onMouseLeave={() => setActiveDropdown(null)}>
                      <Link to="/AboutUs">ABOUT US</Link>
                          {activeDropdown === 'about' && (
                              <div className="dropdownContent">
                                  <table>
                                      <tr><Link to="/AboutUs#history"><td>History</td></Link></tr>
                                      <tr><Link to="/AboutUs#philosophy"><td>Philosophy</td></Link></tr>
                                      <tr><Link to="/AboutUs#governanceCommittee"><td>Governance committee</td></Link></tr>
                                      <tr><Link to="/AboutUs#members"><td>Meet our team</td></Link></tr>
                                  </table>
                              </div>
                          )}
                      </td>
                      <td onMouseEnter={() => setActiveDropdown('activities')} onMouseLeave={() => setActiveDropdown(null)}>
                      <Link to="/Activities">ACTIVITIES</Link>
                          {activeDropdown === 'activities' && (
                              <div className="dropdownContent">
                                  <table>
                                      <tr><td>Timetable</td></tr>
                                      <tr><td>Brochure</td></tr>
                                  </table>
                              </div>
                          )}
                      </td>
                      <td><Link to="/Showcase">SHOWCASE</Link></td>
                      <td><Link to="/Events">EVENTS</Link></td>
                      <td><Link to="/Getinvolved">GETINVOLVED</Link></td>
                      <td><Link to="/RoomHire">ROOMHIRE</Link></td>
                      <td><Link to="/Contact">CONTACT</Link></td>
                  </tr>
          </table>
        </div>
      );
    }
  
    export default Navbar;