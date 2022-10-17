import React from "react";
import { Layout, Menu, Popconfirm } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  SolutionOutlined,
  ExportOutlined,
  DashboardOutlined,
  ShopOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";

const SiderCustomed = ({ setVisibleButton }) => {
  const location = useLocation();
  const history = useHistory();
  //   const handleLogout = () => {
  //     Swal.fire({
  //       title: "Bạn có chắc muốn đăng xuất?",
  //       text: "",
  //       icon: "question",
  //       showCancelButton: true,
  //       confirmButtonColor: "#d33",
  //       cancelButtonColor: "#9b9b9b",
  //       confirmButtonText: "Đăng xuất",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         Swal.fire({
  //           width: "400",
  //           height: "100",
  //           backdrop: "none",
  //           icon: "success",
  //           title: "Đăng xuất thành công",
  //           showConfirmButton: false,
  //           timer: 1000,
  //           timerProgressBar: true,
  //         });
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("role");
  //         history.replace("/");
  //       }
  //     });
  //   };
  return (
    <Layout.Sider
      className="hidden md:block"
      style={{ background: "#001529" }}
      trigger={null}
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        //gia tri broken thay doi khi qua breakpoint
        if (broken) {
          setVisibleButton(true);
        } else {
          setVisibleButton(false);
        }
      }}
    >
      {/* */}
      <div className="flex justify-center" style={{ background: "#001529" }}>
        <img
          className="w-5/6 mt-3 mb-1"
          style={{ objectFit: "cover", width: "50px", height: "50px" }}
          src={require("../../../assets/logo.png")}
          alt="icon avatar"
        ></img>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        className="h-screen"
        //style={{ height: '100%' }}
        selectedKeys={[
          location.pathname === "/dash-board"
            ? "1"
            : location.pathname === "/products" ||
              location.pathname.indexOf("team-detail") !== -1
            ? "2"
            : location.pathname === "/staffs"
            ? "3"
            : location.pathname === "/financial"
            ? "4"
            : location.pathname === "/setting"
            ? "5"
            : "-1",
        ]}
      >
        {/* <div className="logo"></div> */}
        <Menu.Item
          key="1"
          icon={<DashboardOutlined />}
          onClick={() => {
            history.push("/dash-board");
          }}
        >
          Trang chủ
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<ShopOutlined />}
          onClick={() => {
            history.push("/products");
          }}
        >
          Quản lý sản phẩm
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<TeamOutlined />}
          onClick={() => {
            history.push("/staffs");
          }}
        >
          Quản lý nhân viên
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<LineChartOutlined />}
          onClick={() => {
            history.push("/financial");
          }}
        >
          Quản lý tài chính
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<SettingOutlined />}
          onClick={() => {
            history.push("/setting");
          }}
        >
          Cài đặt
        </Menu.Item>
        <Menu.Item key="6" icon={<ExportOutlined />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SiderCustomed;
