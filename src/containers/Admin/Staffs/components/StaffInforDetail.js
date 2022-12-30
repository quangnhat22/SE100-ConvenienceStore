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
  Space,
  Modal,
} from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { useSelector, useDispatch } from "react-redux";
import { staffActions } from "../../../../redux/reducer/StaffReducer";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

const StaffInforDetail = ({ staff }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([{ url: staff.avatar }]);
  const [imageChange, setImageChange] = useState(staff.avatar);
  const handleCancelPreview = () => setPreviewOpen(false);

  const handleEnableModify = () => {
    setEnableModify(true);
    setComponentDisabled(false);
  };
  const handleCancel = () => {
    setEnableModify(false);
    setComponentDisabled(true);
    onReset();
  };

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
    if (fileList.length == 0) {
      setImageChange("");
    }
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };

  const onFinish = (values) => {
    let editedStaff = {
      fullname: values.staff_name,
      birthday: values.staff_birth.toISOString(),
      identityNumber: values.staff_cccd,
      gender: values.staff_gender,
      phoneNumber: values.staff_phone_number,
      email: values.staff_email,
      address: values.staff_address,
      other: values.staff_other_information,
      avatar: imageChange,
      role: staff.role,
      active: values.staff_active,
    };
    console.log(staff);
    dispatch({
      type: SagaActionTypes.PUT_USER_SAGA,
      id: staff.id,
      staff: editedStaff,
    });
    // dispatch(staffActions.editStaffs(editedStaff));
  };

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
        staff_active: staff.active,
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
        name="staff_active"
        label="Trạng thái tài khoản"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Trạng thái"
          allowClear
          style={{
            width: "60%",
          }}
          disabled={componentDisabled}
        >
          <Option value={true}>Đang hoat động</Option>
          <Option value={false}>Tạm ngừng</Option>
        </Select>
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
            pattern: /^[\d]{12,12}$/,
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
            pattern: /^[\d]{10,10}$/,
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
        <Input placeholder="Email" disabled={true} />
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
      <Form.Item name="avatar" label="Ảnh nhân viên">
        <>
          <Upload
            accept=".png, .jpg, .jpeg, tiff, .nef, .gif, .svg, .psd, .pdf, .eps, .ai, .heic, .raw, .bmp"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            customRequest={uploadImage}
            onChange={handleOnChange}
            maxCount="1"
            disabled={componentDisabled}
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
            onCancel={handleCancelPreview}
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
      {enableModify === false ? (
        <Form.Item
          wrapperCol={{
            span: 26,
          }}
          style={{
            textAlign: "end",
          }}
        >
          <Space className="flex justify-end">
            <Button
              className="rounded bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
              type="primary"
              size="large"
              onClick={handleEnableModify}
            >
              Chỉnh sửa
            </Button>
            <Button
              className="rounded bg-red-500 opacity-90 text-white hover:opacity-100 shadow-md"
              size="large"
              type="primary"
              danger
              onClick={handleClose}
            >
              Đóng
            </Button>
          </Space>
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
          <Space>
            <Button
              className="rounded bg-red-500 opacity-90 text-white hover:opacity-100 shadow-md"
              size="large"
              type="primary"
              danger
              onClick={handleCancel}
            >
              Hủy
            </Button>
            <Button
              className="rounded bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
              size="large"
              type="primary"
              htmlType="submit"
            >
              Lưu
            </Button>
          </Space>
        </Form.Item>
      )}
    </FormCustomed>
  );
};
export default StaffInforDetail;
