import "../../style/personal-info.css"
import "../../style/admin-personal-list.css"
import AdminSider from "../../components/admin-sider"
import React, { useState } from 'react';
import { Card, Form, Input, List} from 'antd';
import AdminDrawerSider from "../../components/admin-drawer-sider";
import { useMediaQuery } from 'react-responsive';
import VirtualList from 'rc-virtual-list';
import { useEffect } from "react";
import { Link } from "react-router-dom";

import Layout from '../../../Layout';

const { Search } = Input;

const AdminPersonalInfo = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });

    const [searchText, setSearchText] = useState("");

    const [userList, setuserList] = useState([]);

    // const filteredData = testData.filter(
    const filteredData = userList.filter(
      (user) =>
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
      // const token = localStorage.getItem('token');
  
      const fetchUserList = async () => {
        try {
          // Send a request to obtain all user list
          const response = await fetch("http://localhost:8000/api/users/get-users", {
            // method: "GET",
            method: 'POST',
            headers: {
              // 'Authorization': token,
              'Content-Type': 'application/json',
              Accept:'application/json',
              'Access-Control-Allow-Origin':'*',
            },
            body: JSON.stringify({ token: localStorage.getItem("token") }),
          });
          const UserList = await response.json();
          // console.log(UserList);
          // console.log(UserList["data"]);
          if (response.ok) {
            // Fetch all user list successful
            setuserList(UserList["data"])
            console.log("Fetch all user list successful");
          } else {
            // Fetch failed
            console.log("Fetch all user list failed");
          }
        } catch (error) {
          console.error("Fetch all user list error:", error);
        }
      };
      fetchUserList();
    }, []);

    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
              {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>} 
            
                <Card className="membership-content-main">
                  <Form
                    name="admin-notification"
                    >
                      <Form.Item>
                        <Search 
                          placeholder="Please input email or username"  
                          style={{ width: '100%' }}
                          onChange={(e) => setSearchText(e.target.value)}
                          value={searchText}
                        />
                      </Form.Item>

                      <Form.Item>
                        <List className="personal-info-list">
                          <VirtualList
                            data={filteredData}
                            height={isDesktop ? 530 : 430}
                            itemHeight={47}
                            itemKey={(item) => item.email}
                          >
                            {(item) => (
                              <List.Item key={item.email}>
                                <Link to={`/content/${item.username}`}>
                                <List.Item.Meta
                                  title={<span style={{ marginLeft: '20px' }}>{item.username}</span>} // Show username
                                  description={<div style={{ marginLeft: '20px' }}>{item.email}</div>} // Show email
                                />
                                </Link>
                              </List.Item>
                            )}
                          </VirtualList>
                        </List>
                      </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default AdminPersonalInfo