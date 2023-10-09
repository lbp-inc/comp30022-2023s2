import "../../style/personal-info.css"
import MembershipSider from "../../components/membership-sider"
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Form, Input, DatePicker, Button } from 'antd';
import { enUS } from "../../locales/en-us";
import DrawerSider from "../../components/drawer-sider";
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from "react";
import moment from 'moment';
import AdminSider from "../../components/admin-sider"
import AdminDrawerSider from "../../components/admin-drawer-sider";

import Layout from '../../../Layout';

import {Select, message} from 'antd';
const { Option } = Select;

// This component will display the member's personal information
const PersonalInfo = () => {
    // Check monitor size
    const isDesktop = useMediaQuery({ minWidth: 768 });

    const [messageApi, contextHolder] = message.useMessage();

    // Data received from database
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const [role, setRole] = useState();

    const saveSuccess = () => {
        messageApi.open({
          type: 'success',
          content: enUS.message.update_s,
        });
    };
 
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
                    setRole(responseData["role"])
                    console.log("Fetch successful")
                    console.log(responseData["role"])
                    console.log(role)
                } else {
                    // Fetch failed
                    console.log("Fetch failed")
                }
        
            } catch (error) {
                console.error('Fetch personal info request error:', error);
            }
        }
        fetchProfile();
    }, [role]);

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
                saveSuccess()
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
        {/* <div className="membership"> */}
            {contextHolder}
            <div className="membership-card">
                {role === "user"
                    ? (isDesktop ? <MembershipSider /> : <DrawerSider className="drawersider"/>)
                    : (isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>)}

                <Card className="content">
                    <div className="personal-content">
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
                                        className="form-item left-align"
                                        name="name"
                                        label={enUS.form_label.name}
                                        initialValue={userInfo.name}
                                        // onChange={handleNameChange}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    
                                    {/* Gender form */}
                                    <Form.Item
                                        className="form-item left-align"
                                        name="gender"
                                        label={enUS.form_label.gender}
                                        initialValue={userInfo.gender}
                                        // onChange={handleGenderChange}
                                    >
                                        <Select
                                            // onChange={onGenderChange}
                                            className="left-align"
                                            allowClear
                                        >   
                                            <Option value="Woman">Woman</Option>
                                            <Option value="Man">Man</Option>
                                            <Option value="Transgender Man">Transgender Man</Option>
                                            <Option value="Transgender Woman">Transgender Woman</Option>
                                            <Option value="Trans person">Trans person</Option>
                                            <Option value="Trans Man">Trans Man</Option>
                                            <Option value="Trans Woman">Trans Woman</Option>
                                            <Option value="Female to Male">Female to Male</Option>
                                            <Option value="Male to Female">Male to Female</Option>
                                            <Option value="Transsexual">Transsexual</Option>
                                            <Option value="Cisgender">Cisgender</Option>
                                            <Option value="Cis Female">Cis Female</Option>
                                            <Option value="Cis Male">Cis Male</Option>
                                            <Option value="Gender Non-Conforming">Gender Non-Conforming</Option>
                                            <Option value="None Gender">None Gender</Option>
                                            <Option value="Non-Binary">Non-Binary</Option>
                                            <Option value="Neutrois">Neutrois</Option>
                                            <Option value="Genderfluid">Genderfluid</Option>
                                            <Option value="Genderqueer">Genderqueer</Option>
                                            <Option value="Demigender">Demigender</Option>
                                            <Option value="Demigirl">Demigirl</Option>
                                            <Option value="Demiboy">Demiboy</Option>
                                            <Option value="Agender">Agender</Option>
                                            <Option value="Intergender">Intergender</Option>
                                            <Option value="Intersex">Intersex</Option>
                                            <Option value="Pangender">Pangender</Option>
                                            <Option value="Poligender">Poligender</Option>
                                            <Option value="Omnigender">Omnigender</Option>
                                            <Option value="Bigender">Bigender</Option>
                                            <Option value="Androgyne">Androgyne</Option>
                                            <Option value="Androgyny">Androgyny</Option>
                                            <Option value="Third Gender">Third Gender</Option>
                                            <Option value="Trigender">Trigender</Option>
                                        </Select>
                                    </Form.Item>
                                    

                                    {/* Birthday form */}
                                    <Form.Item
                                        className="form-item left-align"
                                        name="birthday"
                                        label={enUS.form_label.birthday}
                                        initialValue={userInfo.birthday ? moment(userInfo.birthday) : null}
                                        // onChange={handleBirthdayChange}
                                    >
                                        <DatePicker/>
                                    </Form.Item>

                                    {/* Email form */}
                                    <Form.Item
                                        className="form-item left-align"
                                        name="email"
                                        label={enUS.form_label.email}
                                        initialValue={userInfo.email}
                                        // onChange={handleEmailChange}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    {/* Phone form */}
                                    <Form.Item 
                                        className="form-item left-align"
                                        name="phone"
                                        label={enUS.form_label.phone}
                                        initialValue={userInfo.phone}
                                        // onChange={handlePhoneChange}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item 
                                        className="form-item left-align"
                                        label=" " colon={false}
                                    >
                                        <Button type="primary" htmlType="submit" className="save-button">{enUS.buttons.save}</Button>
                                    </Form.Item>
                                </Form>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        {/* </div> */}
        </div>
        </Layout>
    )
}
  
export default PersonalInfo