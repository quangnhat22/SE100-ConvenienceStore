import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Avatar } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import DrawerCustomed from "../common/Drawer/Drawer";
import SiderCustomed from "../common/Sider/Sider";
import SalePage from "../containers/Staff/Sale";
import ProfilePage from "../containers/Admin/Profile";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../redux/constants/constant";

const AdminLayout = (props) => {
  const dispatch = useDispatch();
  const uid = localStorage.getItem("id");
  const { staffLogin } = useSelector((state) => state.staffsSlice);
  console.log(staffLogin);
  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_USER_LOGIN_SAGA,
      id: uid,
    });
  }, []);
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
            <Avatar
              className=" bg-black"
              src={staffLogin.avatar}
              icon={<UserOutlined style={{ color: "#999" }} />}
            />
            {!visibleButton && (
              <p className="mb-0 ml-1">{staffLogin.fullname}</p>
            )}
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
            return (
              <Route>
                <Route exact path="/sales" component={SalePage} />
                <Route exact path="/profile" component={ProfilePage} />
              </Route>
            );
          }
        }

        // return to auth page
        return <Redirect to="/" />;
      }}
    />
  );
}
