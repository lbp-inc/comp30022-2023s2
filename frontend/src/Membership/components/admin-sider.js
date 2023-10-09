import { Link } from 'react-router-dom';
import { Card , Button, Space} from 'antd'
import { enUS } from '../locales/en-us';
import "../style/admin-sider.css"

// This component will display the menu in large screen sizes (Admin version)
const AdminSider = () => {

    return (
        <Card className="sider">
                <Space
                    className="admin-button-space"
                    direction="vertical"
                    size="large"
                >   
                    <Link to='/personal-info'>
                        <Button type="text" shape="round" size="large" block className="sider-button">{enUS.buttons.personal_info}</Button>
                    </Link>
                    <Link to='/my-booking'>
                        <Button type="text" shape="round" size="large" block className="sider-button">{enUS.buttons.booking}</Button>
                    </Link>
                    <Link to='/notifications'>
                        <Button type="text" shape="round" size="large" block className="sider-button">{enUS.buttons.notification}</Button>
                    </Link>
                    <Link to='/admin-personal-info'>
                        <Button type="text" shape="round" size="large" block className="sider-button">{enUS.buttons.view_personal_info}</Button>
                    </Link>
                    <Link to='/admin-notification'>
                        <Button type="text" shape="round" size="large" block className="sider-button">{enUS.buttons.edit_notification}</Button>
                    </Link>
                    <Link to='/Editor'>
                        <Button type="text" shape="round" size="large" block className="sider-button">{enUS.buttons.admin}</Button>
                    </Link>
                    
                </Space>
        </Card>
    )
}
  
export default AdminSider