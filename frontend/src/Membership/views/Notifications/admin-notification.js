import AdminSider from "../../components/admin-sider"
import { Card} from 'antd';
import "../../style/admin-notification.css"
import React from 'react';
import { Input } from 'antd';
import { Select, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload,Checkbox } from 'antd';
import AdminDrawerSider from "../../components/admin-drawer-sider";
import { useMediaQuery } from 'react-responsive';

import Layout from '../../../Layout';

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
const { TextArea } = Input;
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const AdminNotification = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <Layout>
        <div className="loginSection">
        <div className="membership">
            <div className="membership-card">
              {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider"/>}
                <Card className="content">
                    <Space
                    style={{
                    width: '100%',
                    }}
                        direction="vertical"
                    >
                        <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Recipients"
                        defaultValue={[]}
                        onChange={handleChange}
                        options={options}
                        />
                    </Space>
                    <br />
                    <br />
                    <Input placeholder="Subject" />
                    <br />
                    <br />
                    <TextArea rows={15} style = {{resize: "none"}}/> 
                    <br />
                    <br />
                    <Space wrap>
                        <Button type="primary">Send</Button>
                        <Upload {...props} showUploadList = {false}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        <Checkbox>{"Send to email"}</Checkbox>
                    </Space>
                </Card>
            </div>
        </div>
        </div>
        </Layout>
    )
}
  
export default AdminNotification