import React, { useState } from "react";
import { DatePicker, Form, Input, Modal, Select, Space, Upload } from "antd";
import {
  ExclamationCircleOutlined,
  InfoCircleTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useHistory } from "react-router-dom";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { useDispatch } from "react-redux";
import moment from "moment";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

const EditProfilePage = ({ data }) => {
  console.log(data);
  const history = useHistory();
  const [personalInformationForm] = Form.useForm();
  const [contactInformationForm] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const validateMessages = {
    required: "Cần nhập ${label}!",
    types: {
      email: "${label} không hợp lệ!",
      number: "",
    },
    number: {
      min: "${label} phải ít nhất từ ${min} trở lên",
      range: "${label} phải trong khoảng từ ${min} đến ${max}",
    },
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([{ url: data.avatar }]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      console.log(file.preview);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList[0]);
  };

  const onFinish = (values) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Xác nhận thay đổi?",
      okText: "Ok",
      cancelText: "Hủy",
      destroyOnClose: true,
      centered: true,
      maskClosable: true,
      onOk: () => {
        handleSave(values);
      },
    });
  };

  const handleSave = (values) => {
    // let editedProfile = {
    //   id: personalInformationForm.getFieldValue().id,
    //   email: contactInformationForm.getFieldValue().email,
    //   fullname: personalInformationForm.getFieldValue().fullname,
    //   birthday: personalInformationForm.getFieldValue().birthday,
    //   identityNumber: personalInformationForm.getFieldValue().identityNumber,
    //   gender: personalInformationForm.getFieldValue().gender,
    //   phoneNumber: contactInformationForm.getFieldValue().phoneNumber,
    //   address: contactInformationForm.getFieldValue().address,
    //   avatar: contactInformationForm.image.filename,
    //   role: data.role,
    // };
    // console.log(editedProfile);
    // dispatch({
    //   type: SagaActionTypes.PUT_USER_SAGA,
    //   id: data.id,
    //   staff: editedProfile,
    // });
    // history.go(0);
    let editedProfile = {
      fullname: values.staff_name,
      birthday: values.staff_birth.toISOString(),
      identityNumber: values.staff_cccd,
      gender: values.staff_gender,
      phoneNumber: values.staff_phone_number,
      email: values.staff_email,
      address: values.staff_address,
      other: values.staff_other_information,
    };
    console.log(data);
    dispatch({
      type: SagaActionTypes.PUT_USER_SAGA,
      id: data.id,
      staff: editedProfile,
    });
  };

  const initialvalue = {
    id: data.id,
    email: data.email,
    fullname: data.fullname,
    birthday: moment(data.birthday),
    identityNumber: data.identityNumber,
    gender: data.gender,
    phoneNumber: data.phoneNumber,
    address: data.address,
    other: data.other,
    avatar: data.avatar,
  };

  return (
    <Form
      layout="vertical"
      validateMessages={validateMessages}
      onFinish={onFinish}
      initialValues={initialvalue}
    >
      <div className="flex justify-center items-center">
        <div className="gap-8 mt-10 flex flex-col w-full lg:w-3/5 md:flex-row mx-10">
          {/* Thông tin cá nhân */}
          <div className="rounded bg-white shadow-xl px-5 py-8 w-2/5">
            <header className="font-bold text-xl mb-5">
              Thông tin cá nhân
            </header>
            <Form.Item name="id" label="Mã nhân viên">
              <Input placeholder="Mã nhân viên" disabled={true} />
            </Form.Item>
            <Form.Item
              name="fullname"
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
              name="birthday"
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" placeholder="Ngày sinh" />
            </Form.Item>
            <Form.Item
              name="identityNumber"
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
              name="gender"
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
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Option value="MALE">Nam</Option>
                <Option value="FEMALE">Nữ</Option>
              </Select>
            </Form.Item>
            <Form.Item name="other" label="Khác">
              <TextArea rows={2} placeholder="Khác" />
            </Form.Item>
          </div>
          {/* Thông tin liên hệ */}
          <div className="rounded bg-white shadow-xl px-5 py-8 grow">
            <header className="font-bold text-xl mb-5">
              Thông tin liên hệ
            </header>
            <Form.Item
              name="phoneNumber"
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
              name="email"
              label="Email"
              rules={[{ type: "email", required: true }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item
              className="w-fit rounded"
              name="avatar"
              label="Ảnh nhân viên"
            >
              <>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  beforeUpload={(file) => {
                    return false;
                  }}
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  maxCount="1"
                >
                  <Space className="flex flex-col text-base">
                    <PlusOutlined />
                    Tải ảnh
                  </Space>
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{
                      width: "100%",
                    }}
                    src={previewImage}
                  />
                </Modal>
              </>
            </Form.Item>

            {/* Action */}
            <Form.Item className="flex justify-end right-5 bottom-0">
              <button
                className="rounded py-2 px-4 bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
                type="submit"
              >
                Lưu
              </button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default EditProfilePage;
