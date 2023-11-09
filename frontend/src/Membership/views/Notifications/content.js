import { Link } from "react-router-dom";
import { Button, Card } from 'antd';
import { enUS } from "../../locales/en-us";
import { useMediaQuery } from 'react-responsive';
import AdminSider from "../../components/admin-sider"
import AdminDrawerSider from "../../components/admin-drawer-sider";

import Layout from '../../../Layout';

// This component will display information about the notification content
const Content = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    
    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
                {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>}
                <Card className="content">
                    <Card className="list-container">
                        <Link to='/notifications'><Button>{enUS.buttons.back}</Button></Link>
                    </Card>
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default Content