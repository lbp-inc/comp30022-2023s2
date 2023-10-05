import "../../style/personal-info.css"
import MembershipSider from "../../components/membership-sider"
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Form, Input, Radio, DatePicker, Button } from 'antd';
import { enUS } from "../../locales/en-us";
import DrawerSider from "../../components/drawer-sider";
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from "react";
import moment from 'moment';
import AdminSider from "../../components/admin-sider"
import AdminDrawerSider from "../../components/admin-drawer-sider";

import Layout from '../../../Layout';

// This component will display the member's personal information
const PersonalInfo = () => {
    // Check monitor size
    const isDesktop = useMediaQuery({ minWidth: 768 });

    // Data received from database
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const role = localStorage.getItem("role");

    // Define personal information constants
    // const [name, setName] = useState();
    // const [gender, setGender] = useState();
    // const [birthday, setBirthday] = useState();
    // const [email, setEmail] = useState();
    // const [phone, setPhone] = useState();

    // const handleNameChange = (e) => {
    //     setName(e.target.value);
    // };
    
    // const handleGenderChange = (e) => {
    //     setGender(e.target.value);
    // };

    // const handleBirthdayChange = (e) => {
    //     setBirthday(e.target.value)
    // };
    
    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // };
    // const handlePhoneChange = (e) => {
    //     setPhone(e.target.value);
    // };

 
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Send a request to obtain personal information
                const response = await fetch("http://localhost:5000/api/users/getInfo", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept:'application/json',
                        'Access-Control-Allow-Origin':'*',
                    },
                    body: JSON.stringify({ token: localStorage.getItem('token') }),
                });
                const responseData = await response.json();
    
                if (response.status===200) {
                    // Fetch successful
                    setUserInfo(responseData["data"])
                    setLoading(false);
                    console.log("Fetch successful")
                } else {
                    // Fetch failed
                    console.log("Fetch failed")
                }
        
            } catch (error) {
                console.error('Fetch personal info request error:', error);
            }
        }
        fetchProfile();
    }, []);

    const onFinish = async (values) => {
        console.log(values)
        try {
            const dataToSend = {
                token: localStorage.getItem('token'),
                name: values["name"],
                gender: values["gender"],
                birthday: values["birthday"],
                email: values["email"],
                phone: values["phone"],
            };

            // Send form values to backend for update personal info
            const response = await fetch("http://localhost:5000/api/users/updateInfo", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:'application/json',
                    'Access-Control-Allow-Origin':'*',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.status===200) {
                // Update successful
                console.log("Update successful")
            } else {
                // Update failed
                console.log("Update failed")
            }
    
        } catch (error) {
            console.error('Update personal info request error:', error);
        }
    };
    

    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
                {role === "user"
                    ? (isDesktop ? <MembershipSider /> : <DrawerSider className="drawersider"/>)
                    : (isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>)}
                {/* {isDesktop ? <MembershipSider /> : <DrawerSider className="drawersider"/>}; */}

                <Card className="content">
                    <div className="avatar">
                        <Avatar size={64} icon={<UserOutlined />}/>
                    </div>
                    {/* <Button type="primary" htmlType="submit" className="save-button" onClick={onFinishs}>{enUS.buttons.save}</Button> */}
                    <div className="personal-info">
                    {!loading && (
                        <Form
                            labelCol={{ span: 5}}
                            onFinish={onFinish}
                            // initialValues={userInfo}
                        >   
                            {/* Name form */}
                            <Form.Item 
                                className="form-item"
                                name="name"
                                label={enUS.form_label.name}
                                initialValue={userInfo.name}
                                // onChange={handleNameChange}
                            >
                                <Input/>
                            </Form.Item>
                            
                            {/* Gender form */}
                            <Form.Item
                                className="form-item"
                                name="gender"
                                label={enUS.form_label.gender}
                                initialValue={userInfo.gender}
                                // onChange={handleGenderChange}
                            >
                                <Radio.Group>
                                    <Radio value="male">{enUS.form_label.male}</Radio>
                                    <Radio value="female">{enUS.form_label.female}</Radio>
                                </Radio.Group>
                            </Form.Item>
                            

                            {/* Birthday form */}
                            <Form.Item
                                className="form-item"
                                name="birthday"
                                label={enUS.form_label.birthday}
                                initialValue={userInfo.birthday ? moment(userInfo.birthday) : null}
                                // onChange={handleBirthdayChange}
                            >
                                <DatePicker/>
                            </Form.Item>

                            {/* Email form */}
                            <Form.Item
                                className="form-item"
                                name="email"
                                label={enUS.form_label.email}
                                initialValue={userInfo.email}
                                // onChange={handleEmailChange}
                            >
                                <Input/>
                            </Form.Item>

                            {/* Phone form */}
                            <Form.Item 
                                className="form-item"
                                name="phone"
                                label={enUS.form_label.phone}
                                initialValue={userInfo.phone}
                                // onChange={handlePhoneChange}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item 
                                className="form-item"
                                label=" " colon={false}
                            >
                                <Button type="primary" htmlType="submit" className="save-button">{enUS.buttons.save}</Button>
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
  
export default PersonalInfo