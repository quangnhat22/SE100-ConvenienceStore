import React from "react";
import moment from "moment";
import { Form, Input, Select, DatePicker, Upload } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const InfoCreatorForm = ({ creator }) => {
  const [form] = Form.useForm();

  const initialValues = {
    staff_id: creator.id,
    staff_name: creator.fullname,
    staff_birth: moment(creator.birthday),
    staff_cccd: creator.identityNumber,
    staff_gender: creator.gender,
    staff_phone_number: creator.phoneNumber,
    staff_email: creator.email,
    staff_address: creator.address,
    staff_other_information: creator.other,
    staff_role: creator.role,
  };

  return (
    <FormCustomed form={form} initialValues={initialValues}>
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
            pattern: /^[\d]{10,10}$/,
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
          <Option value="MALE">Nam</Option>
          <Option value="FEMALE">Nữ</Option>
          <Option value="OTHER">Khác</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="staff_phone_number"
        label="Số Điện Thoại"
        rules={[
          {
            pattern: /^[\d]{10,10}$/,
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
        <Input placeholder="Email" disabled={true} />
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
    </FormCustomed>
  );
};
export default InfoCreatorForm;
