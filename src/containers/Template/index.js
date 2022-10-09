import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import { UserOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import SiderCustomed from "../../components/Sider/Sider";
import DrawerCustomed from "../../components/Drawer/Drawer";
const { Header, Content } = Layout;

function LayoutAdmin(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderCustomed setVisibleButton={setVisibleButton} />
      <DrawerCustomed collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header
          style={{ padding: 0, background: "#fff" }}
          className="bg-white flex justify-between"
        >
          {/* className="bg-white site-layout-sub-header-background" */}
          <div>
            {visibleButton && (
              <MenuUnfoldOutlined
                className="text-xl ml-7 hover:text-blue-500"
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </div>
          <div className="flex items-center justify-end mr-7">
            <UserOutlined
              className="p-2  rounded-full bg-black"
              style={{ color: "#999" }}
            />
            {!visibleButton && <p className="mb-0 ml-1">Quản trị viên</p>}
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}

export default LayoutAdmin;
