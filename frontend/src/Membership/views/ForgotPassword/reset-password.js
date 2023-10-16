import { Card, Form, Input, Button, message} from "antd"
import '../../style/forgot-password.css'
import { enUS } from "../../locales/en-us"
import { useState } from 'react'
import { useParams } from 'react-router-dom';

import Layout from '../../../Layout';


// This component will display a password reset form
// where the user can enter a new password
const ResetPassword = () => {

    // Get name and token from url
    const { username, token } = useParams();

    const [messageApi, contextHolder] = message.useMessage();

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

    const onFinish = async (values) =>{

        try {
            const payload = {
                username: username,
                token: token,
                password: values["new-password"]
            };
            console.log(payload);
            // Send form values to backend for reset password
            const response = await fetch("http://localhost:8000/api/users/reset-password", {
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
                errorOutOfTime()
                console.log("Token Out Of Time");     
            } else {
                // Reset password failed, processing error message
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
            }
        } catch (error) {
            console.error('Registration request error:', error);
        }
    }

    const errorOutOfTime = () => {
        messageApi.open({
          type: 'error',
          content: enUS.alert_message.out_of_time,
        });
    };


    return (
        <Layout>
        <div className="loginSection">
        <div className="forgot-password-form">
        {contextHolder}
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
                        tooltip={enUS.form_tooltip.passowrd}
                        rules={[
                        {
                            required: true,
                            message: enUS.form_message.new_password,
                        },
                        ]}
                        hasFeedback
                        validateStatus={isPasswordValid ? "success" : "error"}
                        help={isPasswordValid ? "" : enUS.alert_message.password_invalid}
                    >
                        <Input.Password onChange={handlePasswordChange} autoComplete="new-password"/>
                    </Form.Item>
                    
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
                        <Input.Password autoComplete="new-password"/>
                    </Form.Item>
                    
                    {/* Submit button */}
                    <Form.Item>
                        {/* <Link to="/reset-jump"> */}
                            <Button type="primary" disabled={!(isPasswordValid)} htmlType="submit" size="large" block className="reset-Password">
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