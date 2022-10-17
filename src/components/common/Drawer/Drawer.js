import React from "react";
import { Drawer, Menu, Popconfirm } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  SolutionOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom";
// import Swal from "sweetalert2";

const DrawerCustomed = ({ setCollapsed, collapsed }) => {
  const location = useLocation();
  console.log(location);
  const history = useHistory();
  const onClose = () => {
    setCollapsed(false);
  };
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
  //         history.replace("/");
  //       }
  //     });
  //   };
  return (
    <Drawer
      onClose={onClose}
      visible={collapsed}
      placement="left"
      width={220}
      closable={false}
    >
      <div className="logo" style={{ background: "#001529" }}>
        <img
          className="w-25 p-5"
          src={require("../../../assets/logo.png")}
          alt="avatar 1"
        ></img>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        className="h-max"
        //style={{ height: '100%' }}
        selectedKeys={[
          location.pathname === "/dash-board"
            ? "1"
            : location.pathname === "/products" ||
              location.pathname.indexOf("team-detail") !== -1
            ? "2"
            : location.pathname === "/support"
            ? "3"
            : "4",
        ]}
      >
        <div className="logo"></div>
        <Menu.Item
          key="1"
          icon={<UserOutlined />}
          onClick={() => {
            history.push("/dash-board");
          }}
        >
          Dash board
        </Menu.Item>
        {/* <Menu.Item
          key="2"
          icon={<TeamOutlined />}
          onClick={() => {
            history.push("/team");
          }}
        >
          Đội
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<SolutionOutlined />}
          onClick={() => {
            history.push("/support");
          }}
        >
          Yêu cầu hỗ trợ
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<SettingOutlined />}
          onClick={() => {
            history.push("/setting");
          }}
        >
          Cài đặt
        </Menu.Item>
        <Menu.Item key="5" icon={<ExportOutlined />}>
          Đăng xuất
        </Menu.Item> */}
      </Menu>
    </Drawer>
  );
};

export default DrawerCustomed;
