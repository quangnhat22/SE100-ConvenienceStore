import React from "react";
import {
  DownOutlined,
  SmileOutlined,
  UserOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Menu } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import AlertCustom from "../../../../common/Notification/Alert";

const DropDownAvatar = () => {
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
        history.go(0);
      }
    });
  };
  const menu = (
    <Menu mode="inline">
      <Menu.Item
        icon={<UserOutlined />}
        onClick={() => {
          history.push("/profile");
        }}
      >
        Thay đổi thông tin
      </Menu.Item>
      <Menu.Item icon={<ExportOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <UserOutlined
        className="p-2 rounded-full bg-blue-300"
        style={{ color: "#9900FF" }}
      />
    </Dropdown>
  );
};
export default DropDownAvatar;
