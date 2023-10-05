import { Card, Result, Button } from "antd"
import '../../style/register-jump.css'
import { enUS } from "../../locales/en-us"
import { Link } from "react-router-dom"

import Layout from '../../../Layout';

// This component will return a jump
// page for successfully resetting the password.
const ResetJump = () => {
    return (
        <Layout>
        <div className="loginSection">
        <div className="register-jump">
            <Card className="register-jump-container">
                <Result
                    name="reset"
                    className="result-body"
                    status="success"
                    title={enUS.jump.reset_success}
                    extra={[
                        <Link to="/login">
                            <Button type="primary" htmlType="submit" size="large" className="button">
                                {enUS.buttons.go_login}
                            </Button>
                        </Link>
                    ]}
                />
            </Card>
        </div>
        </div>
        </Layout>
    )
}

export default ResetJump