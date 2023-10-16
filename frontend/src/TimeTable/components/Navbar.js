import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation  } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const hash = location.hash.substring(1); // remove the '#' symbol
        setActiveSection(hash);
        // Scroll to the element
        const element = document.getElementById(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);


    return (
        <div className="navBar">
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
                    <td onMouseEnter={() => setActiveDropdown('showcase')} onMouseLeave={() => setActiveDropdown(null)}>
                    <Link to="/Showcase">SHOWCASE</Link>
                        {activeDropdown === 'showcase' && (
                            <div className="dropdownContent">
                                <table>
                                    <tr><td>Showcase 1</td></tr>
                                    <tr><td>Showcase 2</td></tr>
                                </table>
                            </div>
                        )}
                    </td>
                    <td onMouseEnter={() => setActiveDropdown('events')} onMouseLeave={() => setActiveDropdown(null)}>
                        EVENTS
                        {activeDropdown === 'events' && (
                            <div className="dropdownContent">
                                <table>
                                    <tr><Link to="/Events"><td>Event 1</td></Link></tr>
                                    <tr><Link to="/Events"><td>Event 2</td></Link></tr>
                                </table>
                            </div>
                        )}
                    </td>
                    <td onMouseEnter={() => setActiveDropdown('involved')} onMouseLeave={() => setActiveDropdown(null)}>
                        GET INVOLVED
                        {activeDropdown === 'involved' && (
                            <div className="dropdownContent">
                                <table>
                                    <tr><Link to="/Getinvolved"><td>Involved 1</td></Link></tr>
                                    <tr><Link to="/Getinvolved"><td>Involved 2</td></Link></tr>
                                </table>
                            </div>
                        )}
                    </td>
                    <td onMouseEnter={() => setActiveDropdown('hire')} onMouseLeave={() => setActiveDropdown(null)}>
                        ROOM HIRE
                        {activeDropdown === 'hire' && (
                            <div className="dropdownContent">
                                <table>
                                    <tr><Link to="/RoomHire"><td>Hire 1</td></Link></tr>
                                    <tr><Link to="/RoomHire"><td>Hire 2</td></Link></tr>
                                </table>
                            </div>
                        )}
                    </td>
                    <td onMouseEnter={() => setActiveDropdown('contact')} onMouseLeave={() => setActiveDropdown(null)}>
                        CONTACT
                        {activeDropdown === 'contact' && (
                            <div className="dropdownContent">
                                <table>
                                    <tr><Link to="/contact"><td>Contact1</td></Link></tr>
                                </table>
                            </div>
                        )}
                    </td>
                </tr>
            </table>
        </div>
    );
}


export default Navbar;
