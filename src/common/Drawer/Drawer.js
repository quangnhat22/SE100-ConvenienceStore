import React from "react";
import { Drawer, Menu, Popconfirm } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  SolutionOutlined,
  ExportOutlined,
  DashboardOutlined,
  CodeSandboxOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import AlertCustom from "../Notification/Alert";

const DrawerCustomed = ({ setCollapsed, collapsed }) => {
  const location = useLocation();
  const history = useHistory();
  const onClose = () => {
    setCollapsed(false);
  };
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
        history.go(0);
      }
    });
  };
  return (
    <Drawer
      onClose={onClose}
      open={collapsed}
      placement="left"
      width={220}
      closable={false}
    >
      <div className="logo" style={{ background: "#001529" }}>
        <img
          className="w-25 p-5"
          src={require("../../assets/logo.png")}
          alt="avatar 1"
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
            : location.pathname === "/providers" ||
              location.pathname.includes("/provider-detail-page")
            ? "8"
            : location.pathname === "/productlines"
            ? "9"
            : location.pathname === "/delivery_notes" ||
              location.pathname.includes("/delivery-note-detail-page") ||
              location.pathname === "/new-delivery-note"
            ? "10"
            : location.pathname === "/invoice"
            ? "11"
            : "-1",
        ]}
        defaultOpenKeys={["sub1", "sub2"]}
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
        <Menu.SubMenu title="Tài chính" icon={<LineChartOutlined />} key="sub2">
          <Menu.Item
            key="4"
            onClick={() => {
              history.push("/financial");
            }}
          >
            Doanh thu
          </Menu.Item>
          <Menu.Item
            key="11"
            onClick={() => {
              history.push("/invoice");
            }}
          >
            Hóa đơn
          </Menu.Item>
        </Menu.SubMenu>

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
    </Drawer>
  );
};

export default DrawerCustomed;
