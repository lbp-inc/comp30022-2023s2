import { Card, Form, Input, Button, Checkbox, message } from "antd"
import '../../style/register.css'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import Layout from '../../../Layout';

// This component returns a registration form
const Register = () => {
    const { t } = useTranslation();

    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    // Defines whether the username is valid
    const [isUsernameValid, setIsUsernameValid] = useState(false);

    // Define whether the password is valid
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    // Check if Password valid
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]+/.test(password);
        const hasMinLength = password.length > 8;
      
        if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar && hasMinLength) {
            console.log("Password valid")
            setIsPasswordValid(true)
        }else{
            console.log("Password not valid")
            setIsPasswordValid(false)
        }
    };

    // Check if Username valid
    const onUsernameChange = (e) => {
        const username = e.target.value;

        if (/\s/.test(username)) {
            console.log("Username not valid");
            setIsUsernameValid(false);
        } else {
            console.log("Username valid");
            setIsUsernameValid(true);
        }
    }

    // Send registration request to backend
    const onFinish = async (values) => {
        // console.log(values)
        try {
            // Send form values to backend for registration
            const response = await fetch("http://localhost:8000/api/users/register", {
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
                console.log("Email and username already exist");
                errorUE() 
            } else if (response.status === 411) {
                // Username already exist
                console.log("Username already exist");
                errorUsername()
            } else if (response.status === 422) {
                // Email already exist
                console.log("Email already exist"); 
                errorEmail()        
            } else {
                // Registration failed, processing error message
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
            }
        } catch (error) {
            console.error('Registration request error:', error);
        }
    };

    const errorUsername = () => {
        messageApi.open({
          type: 'error',
          content: t('alert_message_username_exist'),
        });
    };

    const errorEmail = () => {
        messageApi.open({
          type: 'error',
          content: t('alert_message_email_exist'),
        });
    };

    const errorUE = () => {
        messageApi.open({
          type: 'error',
          content: t('alert_message_ue_exist'),
        });
    };

    return (
        <Layout>
        <div className="loginSection">
        <div className="register-form">
        {contextHolder}
            <Card className='register-container'>
                <Form
                    name="register"
                    onFinish={onFinish}
                    labelCol={{ span: 9 }}
                    form={form}
                >   
                    {/* Username form */}
                    <Form.Item
                        name="username"
                        label={t('form_label_username')}
                        tooltip={t('form_tooltip_username')}
                        rules={[
                        {
                            required: true,
                            message: t('form_message_username'),
                            whitespace: true,
                        },
                        ]}
                        hasFeedback
                        validateStatus={isUsernameValid ? "success" : "error"}
                        help={isUsernameValid ? "" : t('alert_message_username_space')}
                    >
                        <Input onChange={onUsernameChange} autoComplete="username"/>
                    </Form.Item>

                    {/* Email form */}
                    <Form.Item
                        name="email"
                        label={t('form_label_email')}
                        rules={[
                        {
                            type: 'email',
                            message: t('form_message_email_not_valid'),
                        },
                        {
                            required: true,
                            message: t('form_message_email'),
                        },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        label={t('form_label_password')}
                        tooltip={t('form_tooltip_passowrd')}
                        rules={[
                        {
                            required: true,
                            message: t('form_message_password'),
                        },
                        ]}
                        hasFeedback
                        validateStatus={isPasswordValid ? "success" : "error"}
                        help={isPasswordValid ? "" : t('alert_message_password_invalid')}
                    >
                        <Input.Password 
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                        />
                    </Form.Item>
                    
                    {/* Enter confirm new password form */}
                    <Form.Item
                        name="confirm"
                        label={t('form_label_confirm_password')}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: t('form_message_password_confirm'),
                        },

                        // Check if the 'confirm password' is empty or 'confirm password' is the same as 'password'
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(t('form_message_password_not_match')));
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
                            value ? Promise.resolve() : Promise.reject(new Error(t('form_message_agreement'))),
                        },
                        ]}
                    >
                        <Checkbox>
                            {t('link_agree')} <a href="/register">{t('link_agreement')}</a>
                        </Checkbox>
                    </Form.Item>
                    
                    {/* Submit button */}
                    <Form.Item>
                        <Button type="primary" disabled={!(isUsernameValid && isPasswordValid)} htmlType="submit" size="large" block className="register-button">
                            {t('button_register_')}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
        </div>
        </Layout>
    )
}
  
export default Register