// import React from 'react';
import './UserMenu.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// function TopCorner() {  
//     return (
//         <div className="userMenuContainer">
//             {/* <Link to="/LogIn"> */}
//             <Link to="/login">
//                 <FontAwesomeIcon icon={faUser} 
//                  className="userIcon" 
//             /></Link>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import {Dropdown, message} from 'antd'
import {Button} from 'antd'
import {UserOutlined} from '@ant-design/icons'

function TopCorner() { 
 
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if localStorage has JWT
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }

        const outOftime = localStorage.getItem('outOftime');
        if (outOftime === "true"){
        console.log("token out of time")
        localStorage.removeItem("outOftime");
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role");
        messageApi.open({
            type: 'error',
            content: 'The login token has expired, please log in again',
        });
        }else {
        // console.log("check bbb")
        }
    }, [messageApi]);

    const onClick = ({ key }) => {
        if (key === '4') {
            localStorage.removeItem("token");
            localStorage.removeItem("auth_token");
            localStorage.removeItem("role");
            setIsLoggedIn(false)
            console.log("logout successful");
            messageApi.open({
              type: 'success',
              content: 'Successfully logged out',
            });
        }
    };

    // Signout menu
    const signout = [
        {
        key: '1',
        label: (
            <Link to='/login'>
            <div>
                Log In
            </div>
            </Link>
        ),
        },
    ];

    // Login menu
    const login = [
        {
        key: '1',
        label: (
            <Link to='/personal-info'>
            <div>
                Personal Info
            </div>
            </Link>
        ),
        },
        {
        key: '2',
        label: (
            <Link to='/my-booking'>
            <div>
                My Booking
            </div>
            </Link>
        ),
        },
        {
        key: '3',
        label: (
            <Link to='/notifications'>
            <div>
                Notification
            </div>
            </Link>
        ),
        },
        {
        key: '4',
        label: (
            <Link to='/login'>
            <div>
                Sign out
            </div>
            </Link>
        ),
        },
    ];

    return (
        <div className="userMenuContainer">
            {/* {contextHolder} */}
            {contextHolder}
            <Dropdown menu={{items:(isLoggedIn ? login : signout),onClick}} placement="bottom">
                <Button type='primary' className='login-button' shape='circle' size='large' icon={<UserOutlined />} />
            </Dropdown>
        </div>
    );
}

export default TopCorner;

