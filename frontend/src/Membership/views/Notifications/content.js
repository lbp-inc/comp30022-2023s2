import { Link } from "react-router-dom";
import { Button, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import AdminSider from "../../components/admin-sider"
import AdminDrawerSider from "../../components/admin-drawer-sider";

import Layout from '../../../Layout';

// This component will display information about the notification content
const Content = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    
    const { t } = useTranslation();

    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
                {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>}
                <Card className="content">
                    <Card className="list-container">
                        <Link to='/notifications'><Button>{t('button_back')}</Button></Link>
                    </Card>
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default Content