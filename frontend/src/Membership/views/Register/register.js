import { Card, Form, Input, Button, Checkbox, Alert, Progress } from "antd"
import '../../style/register.css'
import { enUS } from "../../locales/en-us"
import { useState } from 'react';
import { red, orange, green } from '@ant-design/colors';
import zxcvbn from 'zxcvbn';

import Layout from '../../../Layout';

// This component returns a registration form
const Register = () => {
    const [form] = Form.useForm();

    // Define password strength
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Calculate password strength
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        const result = zxcvbn(password);
    
        const strengthPercentage = (result.score / 4) * 100;
        setPasswordStrength(strengthPercentage);
        if (strengthPercentage >= 75) {
            setIsPasswordValid(true)
        } else {
            setIsPasswordValid(false)
        }
    };

    // Display corresponding status according to password strength
    const customFormat = () => {
        if (passwordStrength === 25 || passwordStrength === 50) {
            // setIsPasswordValid(false)
            return enUS.password_strength.weak
        } else if (passwordStrength === 75) {
            // setIsPasswordValid(true)
            return enUS.password_strength.medium
        } else if (passwordStrength === 100){
            // setIsPasswordValid(true)
            return enUS.password_strength.strong
        } else {
            // return enUS.password_strength.weak
        }
    };

    // ------------------------------------------------------
    // Defines whether the username exists
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);

    // Define whether the email exists
    const [isEmailTaken, setIsEmailTaken] = useState(false);

    // Defines whether the username is valid
    const [isUsernameValid, setIsUsernameValid] = useState(false);

    // Define whether the password is valid
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [inputValue, setInputValue] = useState('');

    // Modify the status of isUsernameTaken
    const onUsernameChange = (e) => {
        setIsUsernameTaken(false);

        const value = e.target.value;
        setInputValue(value);

        if (/\s/.test(value)) {
            console.log("There's a space in the input!");
            setIsUsernameValid(true);
        } else {
            setIsUsernameValid(false);
        }
    }

    // Modify the status of isEmailTaken
    const onEmailChange = () => {
        setIsEmailTaken(false);
    }

    // Send registration request to backend
    const onFinish = async (values) => {
        console.log(values)
        try {
            // Send form values to backend for registration
            const response = await fetch("http://localhost:5000/api/users/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:'application/json',
                    'Access-Control-Allow-Origin':'*',
                },
                body: JSON.stringify(values),
            });
    
            if (response.status === 201) {
                // Registration successful, jump to email verification page
                window.location.href = "/email-verification";
            } else if (response.status === 409) {
                // Email and username already exist
                    console.log("411and 422");
                    setIsUsernameTaken(true);
                    setIsEmailTaken(true); 
            } else if (response.status === 411) {
                // Username already exist
                    console.log("411bbbbbbbb");
                    setIsUsernameTaken(true);
            } else if (response.status === 422) {
                // Email already exist
                    console.log("422aaaaaa");
                    setIsEmailTaken(true);        
            } else {
                // Registration failed, processing error message
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
            }
        } catch (error) {
            console.error('Registration request error:', error);
        }
    };

    return (
        <Layout>
        <div className="loginSection">
        <div className="register-form">
            <Card className={(isUsernameTaken || isEmailTaken) ? "register-container-alert" : 'register-container'}>
            {/* <Card className='register-container'> */}
                <Form
                    name="register"
                    onFinish={onFinish}
                    labelCol={{ span: 9 }}
                    form={form}
                >   
                    {/* Username form */}
                    <Form.Item
                        name="username"
                        label={enUS.form_label.username}
                        tooltip={enUS.form_tooltip.username}
                        rules={[
                        {
                            required: true,
                            message: enUS.form_message.username,
                            whitespace: true,
                        },
                        ]}
                    >
                        <Input value={inputValue} onChange={onUsernameChange} autoComplete="username"/>
                    </Form.Item>
                    
                    {/* Username already exists warning */}
                    {isUsernameTaken && (
                        <Alert message={enUS.alert_message.username_exist} type="error" showIcon className="alert"/>
                    )}

                    {/* Username has space warning */}
                    {isUsernameValid && (
                        <Alert message={enUS.alert_message.username_space} type="error" showIcon className="alert"/>
                    )}
                    
                    {/* Email form */}
                    <Form.Item
                        name="email"
                        label={enUS.form_label.email}
                        rules={[
                        {
                            type: 'email',
                            message: enUS.form_message.email_not_valid,
                        },
                        {
                            required: true,
                            message: enUS.form_message.email,
                        },
                        ]}
                    >
                        <Input onChange={onEmailChange}/>
                    </Form.Item>
                    
                    {/* Email already exists warning */}
                    {isEmailTaken && (
                        <Alert message={enUS.alert_message.email_exist} type="error" showIcon className="alert"/>
                    )}

                    {/* <Form.Item label={enUS.form_label.email_verification}>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="Verification code"
                                    noStyle
                                    rules={[{ required: true, message: enUS.form_message.verify}]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Button block className="verification-code">{enUS.buttons.verify}</Button>
                            </Col>
                        </Row>
                    </Form.Item> */}

                    {/* Password form */}
                    <Form.Item
                        name="password"
                        label={enUS.form_label.password}
                        rules={[
                        {
                            required: true,
                            message: enUS.form_message.password,
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password 
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                        />
                    </Form.Item>
                    
                    {/* Show password strength status */}
                    {/* {form.getFieldValue('password') && */}
                    <div className="progress">
                        <Progress
                            type="line"
                            status={passwordStrength === 100 ? 'success' : 'active'}
                            percent={passwordStrength}
                            format={customFormat}
                            showInfo={true}
                            steps={3}
                            strokeColor={[red[5], orange[5], green[5]]}
                        />
                    </div>
                    {/* } */}
                    
                    {/* Enter confirm new password form */}
                    <Form.Item
                        name="confirm"
                        label={enUS.form_label.confirm_password}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: enUS.form_message.password_confirm,
                        },

                        // Check if the 'confirm password' is empty or 'confirm password' is the same as 'password'
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(enUS.form_message.password_not_match));
                            },
                        }),
                        ]}
                    >
                        <Input.Password autoComplete="new-password"/>
                    </Form.Item>
                    
                    {/* Agree to agreement options */}
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                        {
                            validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error(enUS.form_message.agreement)),
                        },
                        ]}
                    >
                        <Checkbox>
                            {enUS.link.agree} <a href="/">{enUS.link.agreement}</a>
                        </Checkbox>
                    </Form.Item>
                    
                    {/* Submit button */}
                    <Form.Item>
                        {/* <Link to="/register-jump"> */}
                        <Button type="primary" disabled={isUsernameValid||!isPasswordValid} htmlType="submit" size="large" block className="register-button">
                        {/* <Button type="primary" htmlType="submit" size="large" block className="register-button"> */}
                            {enUS.buttons.register_}
                        </Button>
                        {/* </Link> */}
                    </Form.Item>
                </Form>
            </Card>
        </div>
        </div>
        </Layout>
    )
}
  
export default Register