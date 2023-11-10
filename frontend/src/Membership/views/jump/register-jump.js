import { Card, Result, Button } from "antd";
import "../../style/register-jump.css";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import Layout from "../../../Layout";

// This component will return a successfully registered jump page
const RegisterJump = () => {

  const { t } = useTranslation();
  return (
    <Layout>
      <div className="loginSection">
        <div className="register-jump">
          <Card className="register-jump-container">
            <Result
              className="result-body"
              status="success"
              title={t('jump_register_success')}
              extra={[
                <Link to="/login">
                  <Button type="primary" htmlType="submit" size="large" className="button">
                    {t('button_go_login')}
                  </Button>
                </Link>,
              ]}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterJump;
