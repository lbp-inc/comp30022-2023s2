import { Card } from 'antd';
import { useMediaQuery } from 'react-responsive';
import AdminSider from "../../components/admin-sider"
import AdminDrawerSider from "../../components/admin-drawer-sider";
import EventsTimetable from '../../../TimeTable/EventsTimetable.js';
import Layout from '../../../Layout';

// This component will display the edit timetable event function
const TimeTable = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    
    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
                {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>}
                <Card className="content">
                    <EventsTimetable />
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default TimeTable