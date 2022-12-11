import React from "react";
import { Layout, Menu, Popconfirm } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  SolutionOutlined,
  ProfileOutlined,
  ExportOutlined,
  DashboardOutlined,
  ShopOutlined,
  LineChartOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import AlertCustom from "../Notification/Alert";
// import Swal from "sweetalert2";

const SiderCustomed = ({ setVisibleButton }) => {
  const location = useLocation();
  const history = useHistory();
  const handleLogout = () => {
    Swal.fire({
      title: "Bạn có chắc muốn đăng xuất?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#9b9b9b",
      confirmButtonText: "Đăng xuất",
    }).then((result) => {
      if (result.isConfirmed) {
        AlertCustom({ type: "success", title: "Đăng xuất thành công" });
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        history.replace("/");
      }
    });
  };
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
          src={require("../../assets/logo.png")}
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
              location.pathname === "/add_product" ||
              location.pathname.includes("/detail_product")
            ? "2"
            : location.pathname === "/staffs"
            ? "3"
            : location.pathname === "/financial"
            ? "4"
            : location.pathname === "/profile"
            ? "5"
            : location.pathname === "/setting"
            ? "6"
            : location.pathname === "/providers"
            ? "8"
            : location.pathname === "/productlines"
            ? "9"
            : location.pathname === "/delivery_notes"
            ? "10"
            : "-1",
        ]}
        defaultOpenKeys={["sub1"]}
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
        <Menu.SubMenu
          title="Sản phẩm"
          icon={<CodeSandboxOutlined />}
          key="sub1"
        >
          <Menu.Item
            key="2"
            onClick={() => {
              history.push("/products");
            }}
          >
            Danh sách sản phẩm
          </Menu.Item>
          <Menu.Item
            key="9"
            onClick={() => {
              history.push("/productlines");
            }}
          >
            Dòng sản phẩm
          </Menu.Item>
          <Menu.Item
            key="8"
            onClick={() => {
              history.push("/providers");
            }}
          >
            Nhà cung cấp
          </Menu.Item>
          <Menu.Item
            key="10"
            onClick={() => {
              history.push("/delivery_notes");
            }}
          >
            Phiếu nhập kho
          </Menu.Item>
        </Menu.SubMenu>

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
          icon={<UserOutlined />}
          onClick={() => {
            history.push("/profile");
          }}
        >
          Thay đổi thông tin
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<SettingOutlined />}
          onClick={() => {
            history.push("/setting");
          }}
        >
          Cài đặt
        </Menu.Item>
        <Menu.Item key="7" icon={<ExportOutlined />} onClick={handleLogout}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SiderCustomed;
