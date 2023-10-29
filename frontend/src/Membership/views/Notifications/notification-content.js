import { Link, useParams } from "react-router-dom";
import AdminSider from "../../components/admin-sider"
import { Button, Card, Input } from 'antd';
import AdminDrawerSider from "../../components/admin-drawer-sider";
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import "../../style/notification-content.css";
import { useState, useEffect } from "react";

import Layout from '../../../Layout';

const { TextArea } = Input;

// This component will display information about the notification content
const NotificationContent = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    
    const { t } = useTranslation();

    const [notification_content, setNotification] = useState({});
    const [loading, setLoading] = useState(true);

    const { notification } = useParams();

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            // Send a request to obtain user's notification
            const response = await fetch(`http://localhost:8000/api/users/get-single-msg/${notification}`, {
              method: "GET",
              headers: {
                'Authorization': localStorage.getItem('token'),
              },
            });
            const responseData = await response.json();
            console.log(responseData);
            if (response.status === 200) {
              // Fetch user's notification successful
              setNotification(responseData);
              setLoading(false);
              console.log("Fetch user's notification successful");
            } else if (response.status === 400) {
                console.log("User Not Found");
            } else if (response.status === 404) {
                console.log("Message not found");
            } else {
              // Fetch user info failed
              console.log("Fetch user's notification failed");
            }
          } catch (error) {
            console.error("Fetch user's notification request error:", error);
          }
        };
        fetchUserInfo();
    }, [notification]);

    const transDate = (createdAt) => {
        const date = new Date(createdAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
                {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>}
                <Card className="membership-content-main">
                    {!loading && (
                        <div class="structured-text">
                            <div class="text-title">{notification_content['title']}</div>
                            <div class="text-date">{transDate(notification_content['createdAt'])}</div>
                            <TextArea
                                className="textarea"
                                rows={isDesktop ? 21 : 16}
                                style = {{resize: "none", marginBottom: "10px"} }
                                readOnly
                                value={notification_content['content']}
                                bordered={false}
                            />
                        </div>
                    )}
                    <Link to='/notifications'>
                        <Button style = {{marginTop: "10px"} } type="primary" htmlType="submit" className="save-button">{t('button_back')}</Button>
                    </Link>
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default NotificationContent