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
import * as SagaActionTypes from "../../../../redux/constants/constant";

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const StaffInforDetail = ({ staff }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const handleEnableModify = () => {
    setEnableModify(true);
    setComponentDisabled(false);
  };
  const handleCancel = () => {
    setEnableModify(false);
    setComponentDisabled(true);
    onReset();
  };

  const onFinish = (values) => {
    let newStaff = {
      fullname: values.staff_name,
      birthday: values.staff_birth.toISOString(),
      identityNumber: values.staff_cccd,
      gender: values.staff_gender,
      phoneNumber: values.staff_phone_number,
      email: values.staff_email,
      address: values.staff_address,
      other: values.staff_other_information,
      avatar: staff.avatar,
      role: staff.role,
    };
    console.log(newStaff);
    // dispatch({
    //   type: SagaActionTypes.POST_USER_SAGA,
    //   values: newStaff,
    // });
    // dispatch(staffActions.editStaffs(newStaff));
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };

  const handleModify = () => {};

  const handleClose = () => {
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };
  const onReset = () => {
    form.resetFields();
  };
  // let staff = {
  //   id: "1",
  //   name: "Nguyễn Văn A",
  //   birth: moment("1-11-2020", dateFormat),
  //   cccd: "091230192039",
  //   gender: "male",
  //   phoneNumber: "1231231312",
  //   email: "123@gmail.com",
  //   address: "KTX khu A",
  //   ortherInfor: "nothing",
  // };
  return (
    <FormCustomed
      name="staff_infor_detail_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        staff_id: staff.id,
        staff_name: staff.fullname,
        staff_birth: moment(staff.birthday),
        staff_cccd: staff.identityNumber,
        staff_gender: staff.gender,
        staff_phone_number: staff.phoneNumber,
        staff_email: staff.email,
        staff_address: staff.address,
        staff_other_information: staff.other,
      }}
    >
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
        <Input placeholder="Họ và tên" disabled={componentDisabled} />
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
          disabled={componentDisabled}
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
        <Input placeholder="CCCD" disabled={componentDisabled} />
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
          disabled={componentDisabled}
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
            pattern: "^([-]?[0-9]*|0)$",
            message: "Số Điện Thoại không hợp lệ",
          },
          { required: true },
        ]}
      >
        <Input placeholder="Số điện thoại" disabled={componentDisabled} />
      </Form.Item>
      <Form.Item
        name="staff_email"
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input placeholder="Email" disabled={componentDisabled} />
      </Form.Item>
      <Form.Item
        name="staff_address"
        label="Địa chỉ"
        rules={[{ required: true }]}
      >
        <TextArea rows={2} placeholder="Địa chỉ" disabled={componentDisabled} />
      </Form.Item>
      <Form.Item name="staff_other_information" label="Khác">
        <TextArea rows={2} placeholder="Khác" disabled={componentDisabled} />
      </Form.Item>
      <Form.Item
        name="staff_image"
        label="Ảnh nhân viên"
        valuePropName="fileList"
      >
        <Upload
          action="/upload.do"
          listType="picture-card"
          disabled={componentDisabled}
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
      {enableModify === false ? (
        <Form.Item
          wrapperCol={{
            span: 26,
          }}
          style={{
            textAlign: "end",
          }}
        >
          <Button
            className="edit-reader-button mr-4"
            onClick={handleEnableModify}
          >
            Chỉnh sửa
          </Button>
          <Button onClick={handleClose}>Đóng</Button>
        </Form.Item>
      ) : (
        <Form.Item
          wrapperCol={{
            span: 26,
          }}
          style={{
            textAlign: "end",
          }}
        >
          <Button
            className="cancel-edit-reader-button mr-4"
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button onClick={handleModify} htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      )}
    </FormCustomed>
  );
};
export default StaffInforDetail;
