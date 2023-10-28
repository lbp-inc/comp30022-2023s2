import AdminSider from "../../components/admin-sider"
import { Card, Form} from 'antd';
import "../../style/admin-notification.css"
import React from 'react';
import { Input } from 'antd';
import { Select, Space } from 'antd';
import { Button, message, Checkbox } from 'antd';
import AdminDrawerSider from "../../components/admin-drawer-sider";
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Layout from '../../../Layout';

const { TextArea } = Input;


const AdminNotification = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });

    const [messageApi, contextHolder] = message.useMessage();

    const { t } = useTranslation();

    const [userGroupOption, SetUserGroupOption] = useState()

    useEffect(() => {
      const token = localStorage.getItem('token');

      const fetchUserGroup = async () => {
        try {
          // Send a request to obtain user groups
          const response = await fetch("http://localhost:8000/api/users/get-user-groups", {
            method: "GET",
            headers: {
              'Authorization': token,
            },
          });
          const UserGroup = await response.json();
          console.log(UserGroup);
          if (response.ok) {
            // Fetch user groups successful
            SetUserGroupOption(UserGroup)
            console.log("Fetch user groups successful");
          } else {
            // Fetch failed
            console.log("Fetch user group failed");
          }
        } catch (error) {
          console.error("Fetch user group error:", error);
        }
      };
      fetchUserGroup();
    }, []);

    const options = userGroupOption ? userGroupOption.map((item, index) => ({
      label: item,
      value: item,
    })) : [];

    const onFinish = async (values) => {
      console.log(values);
      try {
        const dataToSend = {
            subject: values["subject"],
            text: values["text"],
            isEmail: values["isEmail"],
            recipients: values["recipients"],
            token: localStorage.getItem('token'), // username
            // auth_token: localStorage.getItem('auth_token'), // If it is admin 
        };
        console.log(dataToSend);
        // Send notification values to backend for sending notification
        const response = await fetch("http://localhost:8000/api/users/send-message", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept:'application/json',
                'Access-Control-Allow-Origin':'*',
            },
            body: JSON.stringify(dataToSend),
        });
    
        if (response.status===201) {
          console.log("Send notification successful")
          sendSuccess()
        } else if (response.status===403) {
          console.log("Unauthorized user")
          errorUnauthorized()
        } else {
          console.log("Send notification failed")
          errorSend()
        }
      } catch (error) {
        console.error('Send notification request error:', error);
        errorInternal()
      }
    };

    const sendSuccess = () => {
      messageApi.open({
        type: "success",
        content: t("alert_message_notification_success"),
      });
    };

    const errorUnauthorized = () => {
      messageApi.open({
        type: "error",
        content: t("alert_message_notification_unauthorized"),
      });
    };

    const errorSend = () => {
      messageApi.open({
        type: "error",
        content: t("alert_message_notification_failed"),
      });
    };

    const errorInternal = () => {
      messageApi.open({
        type: "error",
        content: t("alert_message_network_error"),
      });
    };

    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
          {contextHolder}
            <div className="membership-card">
              {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>}
                <Card className="membership-content-main">
                  <Form
                    name="admin-notification"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="recipients"
                      initialValue={[]}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Recipients"
                        options={options}
                      />
                    </Form.Item>

                    <Form.Item
                      name="subject"
                    >
                      <Input placeholder="Subject" />
                    </Form.Item>

                    <Form.Item
                      name="text"
                    >
                      <TextArea rows={15} style = {{resize: "none"}}/> 
                    </Form.Item>

                    <Form.Item
                      name="isEmail"
                    >
                      <Space wrap>
                        <Button type="primary" htmlType="submit"  block className="button">Send</Button>
                        {/* <Upload {...props} showUploadList = {false}>
                          <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload> */}
                        <Checkbox>{"Send to email"}</Checkbox>
                      </Space>
                    </Form.Item>

                  </Form>
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default AdminNotification