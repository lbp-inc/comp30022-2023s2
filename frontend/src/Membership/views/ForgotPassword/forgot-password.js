import { Card, Form, Input, Button, message } from "antd";
import "../../style/forgot-password.css";
import { enUS } from "../../locales/en-us";

import Layout from "../../../Layout";

// This component will allow users to enter their registered
// email address and send a password reset link to their email address.
const ForgotPassword = () => {
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  // Link backend request to send password reset email
  const getVerificationCode = async () => {
    const email = form.getFieldValue("email");
    console.log(email);
    try {
      // Send a request to the backend to send a reset password link to the user's email
      const response = await fetch("http://localhost:8000/api/users/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        // Sent successfully
        console.log("Password reset link sent successfully");
        successEmail();
      } else if (response.status === 211) {
        // Email not found
        errorEmail();
        console.log("User not found");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  const errorEmail = () => {
    messageApi.open({
      type: "error",
      content: enUS.alert_message.email_not_exist,
    });
  };

  const successEmail = () => {
    messageApi.open({
      type: "success",
      content: enUS.alert_message.verification_email,
    });
  };

  return (
    <Layout>
      <div className="loginSection">
        <div className="forgot-password-form">
          {contextHolder}
          <Card className="forgot-password-container">
            <Form name="forgot-password" onFinish={getVerificationCode} labelCol={{ span: 4 }} form={form}>
              {/* Enter email form */}
              <Form.Item
                name="email"
                label={enUS.form_label.email}
                rules={[
                  {
                    type: "email",
                    message: enUS.form_message.email_not_valid,
                  },
                  {
                    required: true,
                    message: enUS.form_message.email,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Send button */}
              <Form.Item>
                <Button htmlType="submit" size="large" type="primary" block className="reset-Password">
                  {enUS.buttons.reset}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
