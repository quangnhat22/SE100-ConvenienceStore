import React, { useState } from "react";
import { DatePicker, Form, Input, Modal, Select, Space, Upload } from "antd";
import {
  ExclamationCircleOutlined,
  InfoCircleTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Col, Row, Divider } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useHistory } from "react-router-dom";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";

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
  const { Option } = Select;
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

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
  const [imageChange, setImageChange] = useState(data.avatar);

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
    console.log(values);
    let editedProfile = {
      email: values.email,
      fullname: values.fullname,
      birthday: values.birthday.toISOString(),
      identityNumber: values.identityNumber,
      gender: values.gender,
      phoneNumber: values.phoneNumber,
      address: values.address,
      other: values.other,
      avatar: imageChange,
      role: "MANAGER",
    };
    console.log(editedProfile);
    dispatch({
      type: SagaActionTypes.PUT_USER_SAGA,
      id: data.id,
      staff: editedProfile,
    });
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("image", file);
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost/image/upload",
        data: fmData,
        ...config,
      });

      let { data, status } = res;
      console.log("server res: ", res);
      setImageChange(data["path"]);
      onSuccess("Ok");
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    //console.log(fileList);
    setFileList(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
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
    <div className="flex justify-center items-center">
      <div className="gap-8 mt-10 w-full lg:w-3/5 mx-10">
        {/* Thông tin cá nhân */}
        <Form
          form={personalInformationForm}
          //layout="horizontal"
          validateMessages={validateMessages}
          onFinish={onFinish}
          initialValues={initialvalue}
        >
          <Row>
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
            <div className="rounded bg-white shadow-xl px-5 py-8 grow relative">
              <header className="font-bold text-xl whitespace-nowrap mb-5">
                Thông tin liên hệ
                <InfoCircleTwoTone className="ml-1" />
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
                    accept=".png, .jpg, .jpeg, tiff, .nef, .gif, .svg, .psd, .pdf, .eps, .ai, .heic, .raw, .bmp"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    customRequest={uploadImage}
                    onChange={handleOnChange}
                    maxCount="1"
                    //showUploadList = {false}
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
              <Form.Item className="flex justify-end absolute right-5 bottom-0">
                <button
                  className="rounded py-2 px-4 bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
                  type="submit"
                >
                  Lưu
                </button>
              </Form.Item>
            </div>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default EditProfilePage;
