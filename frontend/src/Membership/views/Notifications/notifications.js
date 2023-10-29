import { Card, List } from "antd";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import AdminSider from "../../components/admin-sider";
import AdminDrawerSider from "../../components/admin-drawer-sider";
import { useEffect, useState } from "react";
import Layout from '../../../Layout';

// This component will display all notifications
const Notifications = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });

    const [notificationList, setNotificationList] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem('token');
  
      const fetchUserNotifications = async () => {
        try {
          // Send a request to obtain user notifications
          const response = await fetch("http://localhost:8000/api/users/get-msg-list", {
            method: "GET",
            headers: {
              'Authorization': token,
            },
          });
          const UserNotifications = await response.json();
          console.log(UserNotifications);
          if (response.ok) {
            // Fetch user notifications
            setNotificationList(UserNotifications.reverse())
            console.log("Fetch user notifications successful");
          } else {
            // Fetch failed
            console.log("Fetch user notifications failed");
          }
        } catch (error) {
          console.error("Fetch user notifications error:", error);
        }
      };
      fetchUserNotifications();
    }, []);
  
    const customLocale = {
      emptyText: 'No Notification',
    };
  
    const transDate = (createdAt) => {
      const date = new Date(createdAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
  
      return `${year}-${month}-${day}`;
    }

    const checkPageSize = () => {
      if (isDesktop) {
        return 10;
      } else {
        return 8;
      }
    }

    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
            {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>}
                <Card className="membership-content-main">
                    <Card className="list-container">
                      <List
                        // dataSource={data}
                        dataSource={notificationList}
                        pagination={{
                          pageSize: checkPageSize(),
                        }}
                        renderItem={(item) => (
                          <List.Item>
                            <Link to={`/notification-content/${item._id}`}>{item.title}</Link>
                            <div>{transDate(item.createdAt)}</div>
                          </List.Item>
                        )}
                        locale={customLocale}
                      />
                    </Card>
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default Notifications