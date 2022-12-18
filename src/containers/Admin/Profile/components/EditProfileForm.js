import React, { useState } from "react";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, DatePicker, Upload, Modal } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import * as moment from "moment";

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const EditProfileForm = ({ account }) => {
  const [form] = Form.useForm();

  // const [listImage, setListimage] = useState(account.images);
  // const handleChange = (info) => {
  //   let listImage = [...info.listImage];
  //   listImage = listImage.slice(-1);
  //   setListimage(listImage);
  const handleSave = () => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Xác nhận thay đổi?",
      okText: "Ok",
      cancelText: "Hủy",
      destroyOnClose: true,
      centered: true,
      maskClosable: true,
      // onOk: () => {},
      // onCancel: () => {},
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="h-fit lg:w-1/2 xl:w-1/3 mx-10 bg-white shadow-md px-10">
        <FormCustomed name="edit_profile" form={form}>
          <Form.Item name="id" label="Mã nhân viên" initialValue={account.id}>
            <Input
              style={{
                width: "80%",
              }}
              placeholder="Mã nhân viên"
              disabled={true}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Họ và tên"
            initialValue={account.name}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            name="birth"
            label="Ngày sinh"
            initialValue={moment(account.birth)}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker placeholder="Ngày sinh" format={dateFormat} />
          </Form.Item>
          <Form.Item
            name="cccd"
            label="CCCD"
            initialValue={account.cccd}
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
            name="gender"
            label="Giới tính"
            initialValue={account.gender}
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
            name="phone_number"
            label="Số Điện Thoại"
            initialValue={account.phone_number}
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
            name="email"
            label="Email"
            initialValue={account.email}
            rules={[{ type: "email", required: true }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            initialValue={account.address}
            rules={[{ required: true }]}
          >
            <TextArea rows={2} placeholder="Địa chỉ" />
          </Form.Item>
          <Form.Item
            name="other_infor"
            initialValue={account.other_infor}
            label="Khác"
          >
            <TextArea rows={2} placeholder="Khác" />
          </Form.Item>
          <Form.Item
            name="images"
            label="Ảnh nhân viên"
            valuePropName="fileList"
          >
            <Upload
              accept=".png, .jpg, .jpeg, tiff, .nef, .gif, .svg, .psd, .pdf, .eps, .ai, .heic, .raw, .bmp"
              action="/upload.do"
              listType="picture-card"
              fileList={account.image}
              // onPreview={() => {}}
              // onRemove={() => {}}
              // onChange={handleChange}
            >
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
            <Button
              className="border-gray-300"
              htmlType="submit"
              onClick={handleSave}
            >
              Lưu
            </Button>
          </Form.Item>
        </FormCustomed>
      </div>
    </div>
  );
};
export default EditProfileForm;
