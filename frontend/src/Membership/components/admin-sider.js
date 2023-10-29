import { Link } from 'react-router-dom';
import { Card , Button, Space} from 'antd'
import { useTranslation } from 'react-i18next';
import "../style/admin-sider.css"
import { useState, useEffect } from 'react';
// import LanguageSelector from "../locales/change"

// This component will display the menu in large screen sizes (Admin version)
const AdminSider = () => {
    const { t } = useTranslation();
    const [role, setRole] = useState();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Send a request to obtain role
                const response = await fetch("http://localhost:8000/api/users/get-role", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept:'application/json',
                        'Access-Control-Allow-Origin':'*',
                    },
                    body: JSON.stringify({ token: localStorage.getItem('token') }),
                });
                const responseData = await response.json();
    
                if (response.status===200) {
                    // Fetch successful
                    setRole(responseData["role"])
                    console.log("Fetch role successful")
                    console.log(responseData["role"])
                    console.log(role)
                } else if (response.status===500) {
                    console.log("Login token out of time")
                    window.location.href = "/login";
                    localStorage.setItem('outOftime', "true")
                } else {
                    // Fetch failed
                    console.log("Fetch role failed")
                }
        
            } catch (error) {
                console.error('Fetch role request error:', error);
            }
        }
        fetchProfile();
    }, [role]);

    return (
        <Card className="sider">
            {/* <LanguageSelector /> */}
                <Space
                    className="admin-button-space"
                    direction="vertical"
                    size="large"
                >   
                    <Link to='/personal-info'>
                        <Button type="text" shape="round" size="large" block className="sider-button">{t('button_personal_info')}</Button>
                    </Link>
                    <Link to='/my-booking'>
                        <Button type="text" shape="round" size="large" block className="sider-button">{t('button_booking')}</Button>
                    </Link>
                    <Link to='/notifications'>
                        <Button type="text" shape="round" size="large" block className="sider-button">{t('button_notification')}</Button>
                    </Link>

                    {role === 'admin' 
                       ?<><Link to='/admin-personal-info'>
                            <Button type="text" shape="round" size="large" block className="sider-button">{t('button_view_personal_info')}</Button>
                        </Link>
                        <Link to='/admin-notification'>
                            <Button type="text" shape="round" size="large" block className="sider-button">{t('button_edit_notification')}</Button>
                        </Link>
                        <Link to='/admin-timetable'>
                            <Button type="text" shape="round" size="large" block className="sider-button">{t('button_timetable')}</Button>
                        </Link>
                        <Link to='/Editor'>
                            <Button type="text" shape="round" size="large" block className="sider-button">{t('button_admin')}</Button>
                        </Link>
                        </> 
                       :(role === 'tutor' 
                       ?<>
                        {/* <Link to=''> */}
                            <Button type="text" shape="round" size="large" block className="sider-button">{t('button_tutor')}</Button>
                        {/* </Link> */}
                        </> : null)}
                    
                </Space>
        </Card>
    )
}
  
export default AdminSider