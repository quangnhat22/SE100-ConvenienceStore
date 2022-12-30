import React from "react";
import {
  DownOutlined,
  SmileOutlined,
  UserOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Menu, Avatar } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import AlertCustom from "../../../common/Notification/Alert";
import { useSelector, useDispatch } from "react-redux";

const DropDownAvatar = () => {
  const { staff } = useSelector((state) => state.staffsSlice);
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
      <Menu.Item icon={<ExportOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div className="flex items-center justify-end mr-2 sm:mr-7 bg-transparent cursor-pointer">
        <Avatar
          className="bg-blue-300"
          src={staff.avatar}
          icon={<UserOutlined style={{ color: "#9900FF" }} />}
        />

        <p className="mb-0 ml-1 text-white hidden sm:inline-block">
          {staff.fullname}
        </p>
      </div>
    </Dropdown>
  );
};
export default DropDownAvatar;
