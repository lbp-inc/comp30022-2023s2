import { Link } from "react-router-dom";
import MembershipSider from "../../components/membership-sider"
import { Button, Card } from 'antd';
import { enUS } from "../../locales/en-us";
import DrawerSider from "../../components/drawer-sider";
import { useMediaQuery } from 'react-responsive';

import Layout from '../../../Layout';

// This component will display information about the notification content
const Content = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    
    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
                {isDesktop ? <MembershipSider /> : <DrawerSider className="drawersider"/>};
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