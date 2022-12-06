import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import DrawerCustomed from "../common/Drawer/Drawer";
import SiderCustomed from "../common/Sider/Sider";
import SalePage from "../containers/Staff/Sale";

const AdminLayout = (props) => {
  // const location = useLocation();
  // console.log(location);
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
};

export default function AdminTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        if (localStorage.getItem("access_token") != null) {
          console.log(localStorage.getItem("role"));
          if (localStorage.getItem("role") === "MANAGER") {
            return (
              <AdminLayout>
                <Component {...propsComponent} />
              </AdminLayout>
            );
          }
          if (localStorage.getItem("role") === "EMPLOYEE") {
            return <Route exact path="/sales" component={SalePage} />;
          }
        }

        // return to auth page
        return <Redirect to="/" />;
      }}
    />
  );
}
