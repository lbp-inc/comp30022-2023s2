import { Link, useParams } from "react-router-dom";
import { Button, Card, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import AdminSider from "../../components/admin-sider"
import AdminDrawerSider from "../../components/admin-drawer-sider";
import { useState, useEffect } from "react";

import Layout from '../../../Layout';

// This component will display information about the notification content
const Content = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    
    const { t } = useTranslation();

    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const { username } = useParams();

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const dataToSend = {
                token: localStorage.getItem('token'), // username
                username: username,
            };

            // Send a request to obtain user info
            const response = await fetch("http://localhost:8000/api/users/get-user-Info", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(dataToSend),
            });
            const responseData = await response.json();
    
            if (response.status === 200) {
              // Fetch user info successful
              setUserInfo(responseData["data"]);
              setLoading(false);
              console.log(responseData["data"]);
              console.log("Fetch user info successful");
            } else if (response.status === 404) {
                console.log("User Not Found");
            } else if (response.status === 403) {
                console.log("Permission Denied");
            } else {
              // Fetch user info failed
              console.log("Fetch user info failed");
            }
          } catch (error) {
            console.error("Fetch user info request error:", error);
          }
        };
        fetchUserInfo();
    }, [username]);

    const transDate = () => {
        const date = new Date(userInfo.birthday);

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
                    <div className="personal-info">
                        {!loading && (
                            <Form
                            labelCol={{ span: 5 }}
                            // initialValues={userInfo}
                            >
                                {/* Name form */}
                                <Form.Item
                                    className="form-item left-align"
                                    name="name"
                                    label={t("form_label_name")}
                                    initialValue={userInfo.name}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Gender form */}
                                <Form.Item
                                    className="form-item left-align"
                                    name="gender"
                                    label={t("form_label_gender")}
                                    initialValue={userInfo.gender}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Birthday form */}
                                <Form.Item
                                    className="form-item left-align"
                                    name="birthday"
                                    label={t("form_label_birthday")}
                                    initialValue={userInfo.birthday ? transDate() : null}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Email form */}
                                <Form.Item
                                    className="form-item left-align"
                                    name="email"
                                    label={t("form_label_email")}
                                    initialValue={userInfo.email}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Phone form */}
                                <Form.Item
                                    className="form-item left-align"
                                    name="phone"
                                    label={t("form_label_phone")}
                                    initialValue={userInfo.phone}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="form-item left-align"
                                    label=" " 
                                    colon={false}
                                >
                                    <Link to='/admin-personal-info'>
                                        <Button type="primary" htmlType="submit" className="save-button">{t('button_back')}</Button>
                                    </Link>
                                </Form.Item>

                            </Form>
                        )}
                    </div>
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default Content