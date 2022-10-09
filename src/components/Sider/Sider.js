import React from "react";
import { Layout, Menu, Popconfirm } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  SolutionOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

const SiderCustomed = ({ setVisibleButton }) => {
  const location = useLocation();
  const navigate = useNavigate();
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
        {/* <img
          className="w-5/6 mt-3 mb-1"
          style={{ objectFit: "cover" }}
          src={require("../../assets/img/logo_remakewhite1.png")}
          alt="icon avatar"
        ></img> */}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        className="h-screen"
        //style={{ height: '100%' }}
        selectedKeys={[
          location.pathname === "/user"
            ? "1"
            : location.pathname === "/team" ||
              location.pathname.indexOf("team-detail") !== -1
            ? "2"
            : location.pathname === "/support"
            ? "3"
            : "4",
        ]}
      >
        {/* <div className="logo"></div> */}
        <Menu.Item
          key="1"
          icon={<UserOutlined />}
          onClick={() => {
            navigate("/user");
          }}
        >
          Thí sinh
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<TeamOutlined />}
          onClick={() => {
            navigate("/team");
          }}
        >
          Đội
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<SolutionOutlined />}
          onClick={() => {
            navigate("/support");
          }}
        >
          Yêu cầu hỗ trợ
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<SettingOutlined />}
          onClick={() => {
            navigate("/setting");
          }}
        >
          Cài đặt
        </Menu.Item>
        <Menu.Item key="5" icon={<ExportOutlined />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SiderCustomed;
