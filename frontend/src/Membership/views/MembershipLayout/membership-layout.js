import { Button, message } from "antd";
import "../../style/membership-layout.css";
import { Link, Outlet } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
// import {enUS} from '../../locales/en-us'
import { Dropdown } from "antd";
import React, { useState, useEffect } from "react";

import Layout from "../../../Layout";

// const logout = [
//   {
//     key: '1',
//     label: (
//       <Link to='/login'>
//         <div>
//           Log In
//         </div>
//       </Link>
//     ),
//   },
// ];

// const login = [
//   {
//     key: '1',
//     label: (
//       <Link to='/personal-info'>
//         <div>
//           Personal Info
//         </div>
//       </Link>
//     ),
//   },
//   {
//     key: '2',
//     label: (
//       <Link to='/my-booking'>
//         <div>
//           My Booking
//         </div>
//       </Link>
//     ),
//   },
//   {
//     key: '3',
//     label: (
//       <Link to='/notifications'>
//         <div>
//           Notification
//         </div>
//       </Link>
//     ),
//   },
//   {
//     key: '4',
//     label: (
//       <Link to='/'>
//         <div>
//           Sign out
//         </div>
//       </Link>
//     ),
//   },
// ];

// This component returns the layout of the web page
const MembershipLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if localStorage has JWT
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const onClick = ({ key }) => {
    if (key === "4") {
      localStorage.removeItem("token");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      console.log("logout successful");
      messageApi.open({
        type: "success",
        content: "Successfully logged out",
      });
    }
  };

  // Signout menu
  const signout = [
    {
      key: "1",
      label: (
        <Link to="/login">
          <div>Log In</div>
        </Link>
      ),
    },
  ];

  // Login menu
  const login = [
    {
      key: "1",
      label: (
        <Link to="/personal-info">
          <div>Personal Info</div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/my-booking">
          <div>My Booking</div>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="/notifications">
          <div>Notification</div>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link to="/">
          <div>Sign out</div>
        </Link>
      ),
    },
  ];

  return (
    <Layout>
      <div className="loginSection">
        <div className="layout">
          {contextHolder}
          <header className="header">
            {/* <div className="header-top">
          <div className="web-logo"></div>
          <h1 className="web-name">{enUS.page_name.home_page}</h1> */}
            <div className="login-button-form">
              {/* <Dropdown menu={{items: login,onClick}} placement="bottomRight"> */}
              <Dropdown menu={{ items: isLoggedIn ? login : signout, onClick }} placement="bottomRight">
                {/* <Link to='/login'> */}
                <Button type="primary" className="login-button" shape="circle" size="large" icon={<UserOutlined />} />
                {/* </Link> */}
              </Dropdown>
              {/* <Link to='/admin-notification'>
              <Button type='primary' className='login-button' size='large' icon={<UserOutlined />} />
            </Link> */}
            </div>
            {/* </div>
        <div className="header-bottom">
          <div className="menu-bar">
            <div className="menu-item">HOME</div>
            <div className="menu-item">ABOUT US</div>
            <div className="menu-item">ACTIVITIES</div>
            <div className="menu-item">SHOWCASE</div>
            <div className="menu-item">EVENTS</div>
            <div className="menu-item">GET INVOLVED</div>
            <div className="menu-item">ROOM HIRE</div>
            <div className="menu-item">CONTACT</div>
          </div>
        </div> */}
          </header>

          <main className="main">
            <Outlet />
          </main>

          <footer className="footer"></footer>
        </div>
      </div>
    </Layout>
  );
};

export default MembershipLayout;
