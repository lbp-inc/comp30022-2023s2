import "../../style/personal-info.css";
import AdminSider from "../../components/admin-sider";
import { Cascader } from "antd";
import React from "react";
import { Space } from "antd";
import { Card, List } from "antd";
import { Link } from "react-router-dom";
import AdminDrawerSider from "../../components/admin-drawer-sider";
import { useMediaQuery } from "react-responsive";
import { Input } from "antd";

import Layout from "../../../Layout";

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

const data = ["User 1", "User 2", "User 3", "User 4", "User 5", "User 6", "User 7", "User 8", "User 9", "User 10", "User 11", "User 12"];
const onChange = (value) => {
  console.log(`selected ${value}`);
};

const options = [
  {
    value: "course1",
    label: "course1",
    children: [
      {
        value: "Attend",
        label: "Attend",
        children: [
          {
            value: "new student",
            label: "new student",
          },
          {
            value: "old student",
            label: "old student",
          },
        ],
      },
      {
        value: "non-Attend",
        label: "non-Attend",
        children: [
          {
            value: "new student",
            label: "new student",
          },
          {
            value: "old student",
            label: "old student",
          },
        ],
      },
    ],
  },
  {
    value: "course2",
    label: "course2",
    children: [
      {
        value: "Attend",
        label: "Attend",
        children: [
          {
            value: "new student",
            label: "new student",
          },
          {
            value: "old student",
            label: "old student",
          },
        ],
      },
      {
        value: "non-Attend",
        label: "non-Attend",
        children: [
          {
            value: "new student",
            label: "new student",
          },
          {
            value: "old student",
            label: "old student",
          },
        ],
      },
    ],
  },
];

const AdminPersonalInfo = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <Layout>
      <div className="loginSection">
        <div className="membership">
          <div className="membership-card">
            {isDesktop ? <AdminSider /> : <AdminDrawerSider className="drawersider" />}

            <Card className="content">
              <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
              >
                <Cascader options={options} onChange={onChange} placeholder="Please select" />
              </Space>
              <br />
              <br />
              <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              <br />
              <br />
              <Card className="list-container-admin">
                <List
                  dataSource={data}
                  // itemLayout="horizontal"
                  pagination={{
                    pageSize: 7,
                  }}
                  renderItem={(item) => (
                    <List.Item>
                      <Link to="/personal-info-content">{item}</Link>
                    </List.Item>
                  )}
                />
              </Card>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPersonalInfo;
