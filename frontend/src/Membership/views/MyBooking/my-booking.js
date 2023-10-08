import MembershipSider from "../../components/membership-sider"
import { Card ,Table, Tooltip} from 'antd';
import { enUS } from "../../locales/en-us";
import { useMediaQuery } from 'react-responsive';
import DrawerSider from "../../components/drawer-sider";
import AdminSider from "../../components/admin-sider"
import AdminDrawerSider from "../../components/admin-drawer-sider";

import Layout from '../../../Layout';

import "../../style/my-booking.css"

// Test Data
const columns = [
    {
        title: enUS.title.course,
        dataIndex: 'course',
        key: 'course',
        width:150,
    },
    {
        title: enUS.title.location,
        dataIndex: 'location',
        key: 'location',
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
        ),
    },
    {
        title: enUS.title.time,
        dataIndex: 'time',
        key: 'time',
        width:170,
    }
];

// Test Data
const columnsSmall = [
    {
        title: enUS.title.course,
        dataIndex: 'course',
        key: 'course',
        width:150,
    },
    // {
    //     title: enUS.title.location,
    //     dataIndex: 'location',
    //     key: 'location',
    //     ellipsis: true,
    //     render: (text) => (
    //         <Tooltip title={text} placement="topLeft">
    //           {text}
    //         </Tooltip>
    //     ),
    // },
    {
        title: enUS.title.time,
        dataIndex: 'time',
        key: 'time',
        width:170,
    }
];

// Test Data
const data = [
    {
        key: '1',
        course: 'IT Project',
        location: '200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A',
        time: '2023/9/7 12:30:00'
    },
    {
        key: '2',
        course: 'IT Project',
        location: '200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A',
        time: '2023/9/7 12:30:00'
    },
    {
        key: '3',
        course: 'IT Project',
        location: '200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A',
        time: '2023/9/7 12:30:00'
    },
    {
        key: '4',
        course: 'IT Project',
        location: '200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A',
        time: '2023/9/7 12:30:00'
    },
    {
        key: '5',
        course: 'IT Project',
        location: '200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A',
        time: '2023/9/7 12:30:00'
    },
    {
        key: '6',
        course: 'IT Project',
        location: '200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A',
        time: '2023/9/7 12:30:00'
    },
    {
        key: '7',
        course: 'IT Project',
        location: '200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A',
        time: '2023/9/7 12:30:00'
    },
    {
        key: '8',
        course: 'IT Project',
        location: '200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A',
        time: '2023/9/7 12:30:00'
    },
    {
        key: '9',
        course: 'IT Project',
        location: '200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A',
        time: '2023/9/7 12:30:00'
    },
    {
        key: '10',
        course: 'IT Project',
        location: '200 BERKELEY ST, PAR-200 Berkeley St-101and102 Floor:1 Room:101A',
        time: '2023/9/7 12:30:00'
    },
];

// This component will display the functions of
// the My booking part of the member meeting
const MyBooking = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });

    const role = localStorage.getItem("role");

    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
                {/* Membership Sider */}
                {role === "user"
                    ? (isDesktop ? <MembershipSider /> : <DrawerSider className="drawersider"/>)
                    : (isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>)}
                {/* {isDesktop ? <MembershipSider /> : <DrawerSider className="drawersider"/>}; */}
                <Card className="content">
                    <Table 
                        // columns={columns}
                        // className="booking-table"
                        columns={isDesktop ? columns : columnsSmall}
                        dataSource={data}
                        pagination={{
                            pageSize: 7,
                        }} 
                    />
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default MyBooking