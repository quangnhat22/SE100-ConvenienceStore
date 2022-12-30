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

const AddStaffForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { submitSuccess } = useSelector((state) => state.staffsSlice);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imageChange, setImageChange] = useState("");
  const [progress, setProgress] = useState(0);

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
    let newStaff = {
      fullname: values.staff_name,
      birthday: values.staff_birth.toISOString(),
      identityNumber: values.staff_cccd,
      gender: values.staff_gender,
      phoneNumber: values.staff_phone_number,
      email: values.staff_email,
      address: values.staff_address,
      other: values.staff_other_information,
      password: "12345678",
      avatar: imageChange,
      role: "EMPLOYEE",
    };
    console.log(newStaff);
    dispatch({
      type: SagaActionTypes.POST_USER_SAGA,
      newStaff: newStaff,
    });
  };
  return (
    <FormCustomed
      name="add_staff_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        staff_other_information: "",
      }}
    >
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
          // {
          //   pattern: "^([-]?[0-9]*|0)$",
          //   message: "CCCD không hợp lệ",
          // },
          // {
          //   pattern: /^(?:\d*)$/,
          //   message: "CCCD không hợp lệ",
          // },
          {
            pattern: /^[\d]{12,12}$/,
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
        className="w-fit rounded"
        name="avatar"
        label="Ảnh nhân viên"
      >
        <Upload 
        accept=".png, .jpg, .jpeg, tiff, .nef, .gif, .svg, .psd, .pdf, .eps, .ai, .heic, .raw, .bmp"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        customRequest={uploadImage}
        onChange={handleOnChange}
        maxCount="1"
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
      <Form.Item
        wrapperCol={{
          span: 20,
          offset: 20,
        }}
      >
        <Button
          className="rounded bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Lưu
        </Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default AddStaffForm;
