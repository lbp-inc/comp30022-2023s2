import { Card, List } from 'antd';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import AdminSider from "../../components/admin-sider"
import AdminDrawerSider from "../../components/admin-drawer-sider";

import Layout from '../../../Layout';

// Test data
const data = [
    'Notifications 1',
    'Notifications 2',
    'Notifications 3',
    'Notifications 4',
    'Notifications 5',
    'Notifications 6',
    'Notifications 7',
    'Notifications 8',
    'Notifications 9',
    'Notifications 10',
    'Notifications 11',
    'Notifications 12',
];

// This component will display all notifications
const Notifications = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
            {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>}
                <Card className="membership-content-main">
                    <Card className="list-container">
                        <List
                            dataSource={data}
                            // itemLayout="horizontal"
                            pagination={{
                                pageSize: 9,
                            }}
                            renderItem={(item) => (
                                <List.Item>
                                    <Link to='/content'>{item}</Link>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default Notifications