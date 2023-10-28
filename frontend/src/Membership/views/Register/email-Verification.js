import { Card, Form, Input, Button, message, Row, Col } from "antd"
import '../../style/forgot-password.css'
import { useTranslation } from 'react-i18next';

import Layout from '../../../Layout';


// This component will allow users to enter their registered 
// email address and send a varification email to their email address.
const EmailVerification = () => {
    const { t } = useTranslation();

    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    // Link backend to request sending a verification email
    const getVerificationCode = async () => {
        const email = form.getFieldValue("email")
        console.log(email)
        try {
            // Send a request to the backend to send an verification code email to the user's email
            const response = await fetch("http://localhost:8000/api/users/verify-email", {
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
                console.log("Verification code sent successfully");
                successCode()
            } else if (response.status === 211) {
                // Email not found
                errorCode()
                console.log("Email not found");
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                networkError()
            }
        } catch (error) {
            console.error('Request error:', error);
            networkError()
        }     
    }

    // Link backend request to send email verification email
    const sendVerificationCode = async (values) => {
        // const email = form.getFieldValue("email")
        // console.log(email)
        console.log(values)
        try {
            // Send a request to the backend to send an email verification link to the user's email
            const response = await fetch("http://localhost:8000/api/users/match_code", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(values),
            });

            if (response.status === 200) {
                // Email verified successfully
                console.log("Email verified successfully");
                successEmail()
                window.location.href = "/register-jump";    
            } else if (response.status === 211) {
                // Email verified fail!
                errorEmail()
                console.log("Email verified fail!");
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                networkError()
            }
        } catch (error) {
            console.error('Email verified error:', error);
            networkError()
        }     
    }

    const errorEmail = () => {
        messageApi.open({
          type: 'error',
          content: t('alert_message_error_email'),
        });
    };

    const successEmail = () => {
        messageApi.open({
          type: 'success',
          content: t('alert_message_success_email'),
        });
    };

    const errorCode = () => {
        messageApi.open({
          type: 'error',
          content: t('alert_message_error_code'),
        });
    };

    const successCode = () => {
        messageApi.open({
          type: 'success',
          content: t('alert_message_success_code'),
        });
    };

    const networkError = () => {
        messageApi.open({
          type: 'success',
          content: t('alert_message_network_error'),
        });
    };

    return (
        <Layout>
        <div className="loginSection">
        <div className="forgot-password-form">
            {contextHolder}
            <Card className="email-verification-container">
                <Form
                    name="forgot-password"
                    onFinish={sendVerificationCode}
                    labelCol={{ span: 4 }}
                    form={form}
                >   
                    {/* Enter email form */}
                    <Form.Item
                        name="email"
                        label={t('form_label_email')}
                        tooltip={t('form_tooltip_email')}
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

                    <Form.Item label={t('form_label_captcha')}>
                        <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                            name="code"
                            noStyle
                            rules={[
                                {
                                required: true,
                                message: t('form_message_code'),
                                },
                            ]}
                            >
                            <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button onClick={getVerificationCode}>{t('button_captcha')}</Button>
                        </Col>
                        </Row>
                    </Form.Item>
                    
                    {/* Send button */}
                    <Form.Item >
                        <Button htmlType="submit" size="large" type="primary" block className="reset-Password">
                            {t('button_verify_email')}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
        </div>
        </Layout>
    )
}
  
export default EmailVerification