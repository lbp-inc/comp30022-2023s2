import { Card, Result, Button } from "antd";
import "../../style/register-jump.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Layout from "../../../Layout";

// This component will return a jump
// page for successfully resetting the password.
const ResetJump = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="loginSection">
        <div className="register-jump">
          <Card className="register-jump-container">
            <Result
              name="reset"
              className="result-body"
              status="success"
              title={t('jump_reset_success')}
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

export default ResetJump;
