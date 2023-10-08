import { Card, Form, Input, Button, Checkbox, Alert} from 'antd'
import '../../style/login.css'
import { Link } from 'react-router-dom';
import {enUS} from '../../locales/en-us'
import { useState } from 'react';

import Layout from '../../../Layout';

// This component provides a login interface
const Login = () => {
    // Defines whether the username exists
    const [isUsernameExist, setIsUsernameExist] = useState(false);

    // Defines whether the password correct
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    // Modify isUsernameExist status
    const onUsernameChange = () => {
        setIsUsernameExist(false);
    }

    // Modify isPasswordCorrect status
    const onPasswordChange = () => {
        setIsPasswordCorrect(false);
    }

    // Send login request to backend
    const onFinish = async (values) => {
        // console.log(values);
        try {
            // Send form values to backend for login
            const response = await fetch("http://localhost:5000/api/users/auth", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:'application/json',
                    'Access-Control-Allow-Origin':'*',
                },
                body: JSON.stringify(values),
            });

            const responseData = await response.json();
    
            if (response.status===200) {
                console.log(responseData)
                console.log(responseData.data["token"])
                console.log(responseData.data["auth_token"])
                console.log(responseData.data["role"])
                // localStorage.setItem('token', responseData.data);
                localStorage.setItem('token', responseData.data["token"]);
                localStorage.setItem('auth_token', responseData.data["auth_token"]);
                // localStorage.setItem('role', responseData.data["role"]);
                // Login successful, jump to member page
                window.location.href = "/personal-info";
            } else if (response.status === 201) {
                // Email is not verified
                window.location.href = "/email-verification";
            } else if (response.status === 401) {
                // Password is not correct
                    console.log("password is not correct");
                    setIsPasswordCorrect(true);
            } else if (response.status === 404) {
                // User not found
                    console.log("User not found");
                    setIsUsernameExist(true);     
            } else {
                // Login failed, processing error message
                const errorData = await response.json();
                console.error('Login failed:', errorData.message);
            }
        } catch (error) {
            console.error('Login request error:', error);
        }
    };
    

  return (
    <Layout>
    <div className="loginSection">
    <div className="login">
        <Card className="login-container">
            <Form
                name="form-login"
                labelCol={{ span: 6 }} 
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >   
                {/* Username form*/}
                <Form.Item
                    name="username"
                    label={enUS.form_label.username}
                    rules={[
                        {
                          required: true,
                          message: enUS.form_message.username,
                        },
                    ]}
                >
                    <Input size="large" placeholder={enUS.input_placeholder.username} onChange={onUsernameChange}/>
                </Form.Item>
                
                {/* Username does not exist warning */}
                {isUsernameExist && (
                    <Alert message={enUS.alert_message.username_not_exist} type="error" showIcon className="alert"/>
                )}
                    
                {/* Password form*/}
                <Form.Item
                    name="password"
                    label={enUS.form_label.password}
                    rules={[
                        {
                          required: true,
                          message: enUS.form_message.password,
                        },
                    ]}
                >
                    <Input.Password size="large" placeholder={enUS.input_placeholder.password} onChange={onPasswordChange} autoComplete="password"/>
                </Form.Item>

                {/* Incorrect password warning */}
                {isPasswordCorrect && (
                    <Alert message={enUS.alert_message.password_incorrect} type="error" showIcon className="alert"/>
                )}
                
                {/* Remember me and Forgot password*/}
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>{enUS.general.remember_me}</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="/forgot-password">
                        {enUS.link.forgot_password}
                    </a>
                </Form.Item>
                
                {/* Login button */}
                <Form.Item>
                    {/* <Link to="/personal-info"> */}
                        <Button type="primary" htmlType="submit" size="large" block className="button">
                            {enUS.buttons.login}
                        </Button>
                    {/* </Link> */}
                </Form.Item>
                
                {/* Register button */}
                <Form.Item>
                    <Link to="/register">
                        <Button type="primary" htmlType="submit" size="large" block className="button">
                            {enUS.buttons.register}
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </Card>
    </div>
    </div>
    </Layout>
  )
}

export default Login