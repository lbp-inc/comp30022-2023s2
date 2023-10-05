import { Link } from "react-router-dom";
import AdminSider from "../../components/admin-sider"
import { Button, Card } from 'antd';
import { enUS } from "../../locales/en-us";
import AdminDrawerSider from "../../components/admin-drawer-sider";
import { useMediaQuery } from 'react-responsive';

import Layout from '../../../Layout';

const PersonalInfoContent = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    
    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
                {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>};
                <Card className="content">
                    <Card className="list-container">
                        <Link to='/admin-personal-info'><Button>{enUS.buttons.back}</Button></Link>
                    </Card>
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default PersonalInfoContent