import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, DatePicker, Upload } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const EditProfileForm = () => {
  const [form] = Form.useForm();
  return (
    <div className="flex justify-center items-center">
      <div className="h-fit lg:w-1/2 xl:w-1/3 mx-10 bg-white shadow-md px-10">
        <FormCustomed name="edit_profile" form={form}>
          <Form.Item name="staff_id" label="Mã nhân viên">
            <Input
              style={{
                width: "80%",
              }}
              placeholder="Mã nhân viên"
              disabled={true}
            />
          </Form.Item>
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
            <DatePicker placeholder="Ngày sinh" format={dateFormat} />
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
          <Form.Item className="flex justify-end">
            <Button className="border-blue-200" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </FormCustomed>
      </div>
    </div>
  );
};
export default EditProfileForm;
