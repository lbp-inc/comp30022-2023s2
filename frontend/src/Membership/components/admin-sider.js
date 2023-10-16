import { Link } from "react-router-dom";
import { Card, Button, Space } from "antd";
import { enUS } from "../locales/en-us";
import "../style/admin-sider.css";
import { useState, useEffect } from "react";

// This component will display the menu in large screen sizes (Admin version)
const AdminSider = () => {
  const [role, setRole] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Send a request to obtain role
        const response = await fetch("http://localhost:8000/api/users/get-role", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ token: localStorage.getItem("token") }),
        });
        const responseData = await response.json();

        if (response.status === 200) {
          // Fetch successful
          setRole(responseData["role"]);
          console.log("Fetch role successful");
          console.log(responseData["role"]);
          console.log(role);
        } else {
          // Fetch failed
          console.log("Fetch role failed");
        }
      } catch (error) {
        console.error("Fetch role request error:", error);
      }
    };
    fetchProfile();
  }, [role]);

  return (
    <Card className="sider">
      <Space className="admin-button-space" direction="vertical" size="large">
        <Link to="/personal-info">
          <Button type="text" shape="round" size="large" block className="sider-button">
            {enUS.buttons.personal_info}
          </Button>
        </Link>
        <Link to="/my-booking">
          <Button type="text" shape="round" size="large" block className="sider-button">
            {enUS.buttons.booking}
          </Button>
        </Link>
        <Link to="/notifications">
          <Button type="text" shape="round" size="large" block className="sider-button">
            {enUS.buttons.notification}
          </Button>
        </Link>

        {role === "admin" ? (
          <>
            <Link to="/admin-personal-info">
              <Button type="text" shape="round" size="large" block className="sider-button">
                {enUS.buttons.view_personal_info}
              </Button>
            </Link>
            <Link to="/admin-notification">
              <Button type="text" shape="round" size="large" block className="sider-button">
                {enUS.buttons.edit_notification}
              </Button>
            </Link>
            <Link to="/Editor">
              <Button type="text" shape="round" size="large" block className="sider-button">
                {enUS.buttons.admin}
              </Button>
            </Link>
          </>
        ) : role === "tutor" ? (
          <>
            {/* <Link to='/Editor'> */}
            <Button type="text" shape="round" size="large" block className="sider-button">
              {enUS.buttons.tutor}
            </Button>
            {/* </Link> */}
          </>
        ) : null}
      </Space>
    </Card>
  );
};

export default AdminSider;
