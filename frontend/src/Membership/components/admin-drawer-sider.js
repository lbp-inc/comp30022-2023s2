import { Link } from 'react-router-dom';
import "../style/membership-sider.css"
import { Button, Drawer, Menu } from 'antd'
import { enUS } from '../locales/en-us';
import { useState } from 'react';
import "../style/drawer-sider.css";

// This component will return a menu suitable for mobile phone display (Admin version)
const AdminDrawerSider = () => {
    // Define the state of the menu
    const [open, setOpen] = useState(false);

    // Change status to open
    const showDrawer = () => {
        setOpen(true);
    };

    // Change status to close
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>  
            {/* Menu switch button */}
            <Button className="drawer-button" type="primary" block onClick={showDrawer}>Menu</Button>
            
            {/* All buttons in the menu */}
            <Drawer
                title="Menu"
                placement="left"
                closable={true}
                onClose={onClose}
                open={open}
            >
                <Menu>
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
                    {/* <Link to='/admin-notification'> */}
                        <Button type="text" shape="round" size="large" block className="sider-button">{enUS.buttons.admin}</Button>
                    {/* </Link> */}
                </Menu>
            </Drawer>
        </>
    )
}
  
export default AdminDrawerSider