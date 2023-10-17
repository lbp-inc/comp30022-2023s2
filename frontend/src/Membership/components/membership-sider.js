import { Link } from "react-router-dom";
import "../style/membership-sider.css";
import { Card, Button, Space } from "antd";
import { enUS } from "../locales/en-us";

// This component will display the menu in large screen sizes (Normal version)
const MembershipSider = () => {
  return (
    <Card className="sider">
      <Space className="button-space" direction="vertical" size="large">
        <Link to="/personal-info">
          <Button type="text" shape="round" size="large" block className="sider-button">
            {enUS.buttons.personal_info}
          </Button>
        </Link>
        <Link to="/my-booking">
          <Button type="text" shape="round" size="large" block className="sider-button">
            {enUS.buttons.booking}
          </Button>
        </Link>
        <Link to="/notifications">
          <Button type="text" shape="round" size="large" block className="sider-button">
            {enUS.buttons.notification}
          </Button>
        </Link>
      </Space>
    </Card>
  );
};

export default MembershipSider;
