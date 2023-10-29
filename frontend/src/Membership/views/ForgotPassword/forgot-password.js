import { Card, Form, Input, Button, message } from "antd";
import "../../style/forgot-password.css";
import { useTranslation } from 'react-i18next';
import Layout from "../../../Layout";

// This component will allow users to enter their registered
// email address and send a password reset link to their email address.
const ForgotPassword = () => {
  const { t } = useTranslation();
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
      content: t('alert_message_email_not_exist'),
    });
  };

  const successEmail = () => {
    messageApi.open({
      type: "success",
      content: t('alert_message_verification_code_sent'),
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
                label={t('form_label_email')}
                rules={[
                  {
                    type: "email",
                    message: t('form_message_email_not_valid'),
                  },
                  {
                    required: true,
                    message: t('form_message_email'),
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Send button */}
              <Form.Item>
                <Button htmlType="submit" size="large" type="primary" block className="reset-Password">
                  {t('button_reset')}
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
