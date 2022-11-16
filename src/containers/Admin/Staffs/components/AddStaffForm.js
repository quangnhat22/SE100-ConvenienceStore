import React, { useState } from "react";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { useSelector, useDispatch } from "react-redux";
import { staffActions } from "../../../../redux/reducer/StaffReducer";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const AddStaffForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    let newStaff = {
      maNhanVien: moment().valueOf(),
      hoTen: values.staff_name,
      ngaySinh: values.staff_birth.format(dateFormat),
      CCCD: values.staff_cccd,
      gioiTinh: values.staff_gender,
      soDienThoai: values.staff_phone_number,
      email: values.staff_email,
      diaChi: values.staff_address,
      khac: values.staff_other_information,
    };
    console.log(newStaff);
    dispatch(staffActions.addNewStaffs(newStaff));
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };
  return (
    <FormCustomed name="add_staff_form" form={form} onFinish={onFinish}>
      <Form.Item
        name="staff_name"
        label="Họ và tên"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Họ và tên" />
      </Form.Item>
      <Form.Item
        name="staff_birth"
        label="Ngày sinh"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker
          placeholder="Ngày sinh"
          format={dateFormat}
          disabledDate={(current) => current.isAfter(moment())}
        />
      </Form.Item>
      <Form.Item
        name="staff_cccd"
        label="CCCD"
        rules={[
          {
            pattern: "^([-]?[0-9]*|0)$",
            message: "CCCD không hợp lệ",
          },
          { required: true },
        ]}
      >
        <Input placeholder="CCCD" />
      </Form.Item>
      <Form.Item
        name="staff_gender"
        label="Giới tính"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Giới tính"
          allowClear
          style={{
            width: "40%",
          }}
        >
          <Option value="male">Nam</Option>
          <Option value="female">Nữ</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="staff_phone_number"
        label="Số Điện Thoại"
        rules={[
          {
            pattern: "^([-]?[0-9]*|0)$",
            message: "Số Điện Thoại không hợp lệ",
          },
          { required: true },
        ]}
      >
        <Input placeholder="Số điện thoại" />
      </Form.Item>
      <Form.Item
        name="staff_email"
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="staff_address"
        label="Địa chỉ"
        rules={[{ required: true }]}
      >
        <TextArea rows={2} placeholder="Địa chỉ" />
      </Form.Item>
      <Form.Item name="staff_other_information" label="Khác">
        <TextArea rows={2} placeholder="Khác" />
      </Form.Item>
      <Form.Item
        name="staff_image"
        label="Ảnh nhân viên"
        valuePropName="fileList"
      >
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Tải lên
            </div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 20,
          offset: 20,
        }}
      >
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default AddStaffForm;
