import { Card, Form, Input, Button, Progress, Alert} from "antd"
import '../../style/forgot-password.css'
import { enUS } from "../../locales/en-us"
import zxcvbn from 'zxcvbn'
import { useState } from 'react'
import { red, orange, green } from '@ant-design/colors';
import { useParams } from 'react-router-dom';

import Layout from '../../../Layout';


// This component will display a password reset form
// where the user can enter a new password
const ResetPassword = () => {
    // Define password strength
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Define whether the link is invalid
    const [isOutOfTime, setisOutOfTime] = useState(false);

    // Calculate password strength
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        const result = zxcvbn(password);
    
        const strengthPercentage = (result.score / 4) * 100;
        setPasswordStrength(strengthPercentage);
    };

    // Display corresponding status according to password strength
    const customFormat = () => {
        if (passwordStrength === 25 || passwordStrength === 50) {
            return enUS.password_strength.weak
        } else if (passwordStrength === 75) {
            return enUS.password_strength.medium
        } else if (passwordStrength === 100){
            return enUS.password_strength.strong
        }
    };

    // Get name and token from url
    const { username, token } = useParams();

    const onFinish = async (values) =>{

        try {
            const payload = {
                username: username,
                token: token,
                password: values["new-password"]
            };
            console.log(payload);
            // Send form values to backend for reset password
            const response = await fetch("http://localhost:5000/api/users/reset-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:'application/json',
                    'Access-Control-Allow-Origin':'*',
                },
                body: JSON.stringify(payload),
            });
    
            if (response.status===200) {
                // Reset password successful, jump to reset password successful page
                window.location.href = "/reset-jump";
            } else if (response.status === 211) {
                    console.log("Email does not exist!");
            } else if (response.status === 500) {
                    setisOutOfTime(true)
                    console.log("Something went wrong");     
            } else {
                // Reset password failed, processing error message
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
            }
        } catch (error) {
            console.error('Registration request error:', error);
        }
    }

    return (
        <Layout>
        <div className="loginSection">
        <div className="forgot-password-form">
            <Card className="reset-password-container">
                <Form
                    name="reset-password"
                    onFinish={onFinish}
                    labelCol={{ span: 9 }} 
                >   

                    {/* Enter new password form */}
                    <Form.Item
                        name="new-password"
                        label={enUS.form_label.new_password}
                        rules={[
                        {
                            required: true,
                            message: enUS.form_message.new_password,
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password onChange={handlePasswordChange}/>
                    </Form.Item>
                    
                    {/* Show password strength status */}
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
                    
                    {/* Enter confirm new password form */}
                    <Form.Item
                        name="confirm"
                        label={enUS.form_label.confirm_password}
                        dependencies={['new-password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: enUS.form_message.new_password_confirm,
                        },

                        // Check if the 'confirm password' is empty or 'confirm password' is the same as 'password'
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('new-password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(enUS.form_message.password_not_match));
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* Alert message */}
                    {isOutOfTime && (
                        <Alert message={enUS.alert_message.out_of_time} type="error" showIcon className="alert"/>
                    )}
                    
                    {/* Submit button */}
                    <Form.Item>
                        {/* <Link to="/reset-jump"> */}
                            <Button type="primary" htmlType="submit" size="large" block className="reset-Password">
                                {enUS.buttons.reset}
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
  
export default ResetPassword