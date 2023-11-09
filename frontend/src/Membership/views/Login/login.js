import { Card, Form, Input, Button, Checkbox, message } from "antd";
import "../../style/login.css";
import { Link } from "react-router-dom";
import { enUS } from "../../locales/en-us";

import Layout from "../../../Layout";

// This component provides a login interface
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

  // Send login request to backend
  const onFinish = async (values) => {
    // console.log(values);
    try {
      // Send form values to backend for login
      const response = await fetch("http://localhost:8000/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        console.log(responseData);
        console.log(responseData.data["token"]);
        console.log(responseData.data["auth_token"]);
        console.log(responseData.data["role"]);
        // localStorage.setItem('token', responseData.data);
        localStorage.setItem("token", responseData.data["token"]);
        localStorage.setItem("auth_token", responseData.data["auth_token"]);
        // localStorage.setItem('role', responseData.data["role"]);
        // Login successful, jump to member page
        window.location.href = "/personal-info";
      } else if (response.status === 201) {
        // Email is not verified
        window.location.href = "/email-verification";
      } else if (response.status === 401) {
        // Password is not correct
        console.log("password is not correct");
        errorLogin();
      } else if (response.status === 404) {
        // User not found
        console.log("User not found");
        errorLogin();
      } else {
        // Login failed, processing error message
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
      }
    } catch (error) {
      console.error("Login request error:", error);
    }
  };

  // const errorUsername = () => {
  //     messageApi.open({
  //       type: 'error',
  //       content: enUS.alert_message.username_not_exist,
  //     });
  // };
  const errorLogin = () => {
    messageApi.open({
      type: "error",
      content: enUS.alert_message.login_alert,
    });
  };

  // const errorPassword = () => {
  //     messageApi.open({
  //       type: 'error',
  //       content: enUS.alert_message.password_incorrect,
  //     });
  // };

  return (
    <Layout>
      <div className="loginSection">
        <div className="login">
          {contextHolder}
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
                <Input size="large" placeholder={enUS.input_placeholder.username} />
              </Form.Item>

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
                <Input.Password size="large" placeholder={enUS.input_placeholder.password} autoComplete="password" />
              </Form.Item>

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
  );
};

export default Login;
