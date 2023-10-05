import { Card, Form, Input, Button, Alert } from "antd"
import '../../style/forgot-password.css'
import { enUS } from "../../locales/en-us";
import { useState } from 'react';

import Layout from '../../../Layout';


// This component will allow users to enter their registered 
// email address and send a password reset link to their email address.
const EmailVerification = () => {
    const [form] = Form.useForm();

    // Defines whether verification information is sent
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
    
    // Defines whether email is exist
    const [isEmailExist, setIsEmailExist] = useState(false);

    // Modify isEmailExist status
    const onEmailChange = () => {
        setIsEmailExist(false);
    }

    // Link backend request to send email verification email
    const getVerificationCode = async () => {
        const email = form.getFieldValue("email")
        console.log(email)
        try {
            // Send a request to the backend to send an email verification link to the user's email
            const response = await fetch("http://localhost:5000/api/users/verify-email", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ email }),
            });

            if (response.status === 200) {
                // Sent successfully
                console.log("Password reset link sent successfully");
                setIsVerificationCodeSent(true);
            } else if (response.status === 211) {
                // Email not found
                setIsEmailExist(true)
                console.log("User not found");
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
            }
        } catch (error) {
            console.error('Request error:', error);
        }     
    }

    return (
        <Layout>
        <div className="loginSection">
        <div className="forgot-password-form">
            <Card className="forgot-password-container">
                <Form
                    name="forgot-password"
                    onFinish={getVerificationCode}
                    labelCol={{ span: 4 }}
                    form={form}
                >   
                    {/* Enter email form */}
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

                    {/* Alert message */}
                    {isEmailExist && (
                        <Alert message={enUS.alert_message.email_not_exist} type="error" showIcon className="alert"/>
                    )}
                    
                    {/* Send button */}
                    <Form.Item >
                        <Button htmlType="submit" size="large" type="primary" block className="reset-Password">
                            {enUS.buttons.verify_email}
                        </Button>
                    </Form.Item>
                    
                    {/* Alert message */}
                    {isVerificationCodeSent && (
                        <Alert message={enUS.alert_message.verification_email} type="success" showIcon className="alert"/>
                    )}
                </Form>
            </Card>
        </div>
        </div>
        </Layout>
    )
}
  
export default EmailVerification