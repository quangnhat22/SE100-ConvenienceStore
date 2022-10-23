import React, { useState } from "react";
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
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const AddStaffForm = () => {
  return (
    <FormCustomed>
      <Form.Item label="Mã nhân viên">
        <Input
          style={{
            width: "80%",
          }}
          placeholder="Mã nhân viên"
          disabled="true"
        />
      </Form.Item>
      <Form.Item
        name={["staff", "name"]}
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
        name={["staff", "birth"]}
        label="Ngày sinh"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker placeholder="Ngày sinh" format="DD-MM-YYYY" />
      </Form.Item>
      <Form.Item
        name={["staff", "id"]}
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
        name={["staff", "gender"]}
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
        name={["staff", "phoneNumber"]}
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
        name={["staff", "email"]}
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name={["staff", "address "]}
        label="Địa chỉ"
        rules={[{ required: true }]}
      >
        <TextArea rows={2} placeholder="Địa chỉ" />
      </Form.Item>
      <Form.Item name={["staff", "otherInfomation "]} label="Khác">
        <TextArea rows={2} placeholder="Khác" />
      </Form.Item>
      <Form.Item
        name={["staff", "image"]}
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
