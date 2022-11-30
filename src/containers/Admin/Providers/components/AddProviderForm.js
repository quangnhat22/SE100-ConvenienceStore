import React from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { providerActions } from "../../../../redux/reducer/ProviderReducer";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import FormCustomed from "../../../../common/Form/FormCustomed";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const AddProviderForm = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    let newProvider = {
      name: values.tenNhaCungCap,
      email: values.email,
      address: values.diaChi,
    };
    console.log(newProvider);
    // dispatch(providerActions.addNewProduct(newProvider));
    dispatch({ type: SagaActionTypes.POST_PROVIDER, newProvider: newProvider });
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };

  return (
    <FormCustomed name="add_provider_form" form={form} onFinish={onFinish}>
      <Form.Item
        name="tenNhaCungCap"
        label="Tên nhà cung cấp"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input className="rounded" placeholder="Tên nhà cung cấp" />
      </Form.Item>
      {/* <Form.Item name="nhomNhaCungCap" label="Nhóm nhà cung cấp">
        <Select className="rounded" placeholder="Nhóm nhà cung cấp" />
      </Form.Item> */}
      {/* <Form.Item
        name="soDienThoai"
        label="Số điện thoại"
        rules={[
          {
            pattern: "^([-]?[0-9]*|0)$",
            message: "Số Điện Thoại không hợp lệ",
          },
          { required: true },
        ]}
      >
        <Input placeholder="Số điện thoại" />
      </Form.Item> */}
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input className="rounded" placeholder="example@host.com" />
      </Form.Item>
      <Form.Item
        name="diaChi"
        label="Địa chỉ"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea
          rows={4}
          className="rounded"
          placeholder="Thôn (Xóm), Xã (Phường, Thị trấn), Tỉnh (Thành phố)..."
        />
      </Form.Item>
      {/* <Form.Item name="nhanVien" label="Nhân viên phụ trách">
        <Select className="rounded" placeholder="Chọn nhân viên" />
      </Form.Item>
      <Form.Item name="moTa" label="Mô tả">
        <TextArea className="rounded" rows={4} placeholder="Mô tả" />
      </Form.Item> */}
      <Form.Item
        wrapperCol={{
          span: 25,
          offset: 25,
        }}
      >
        <Button htmlType="submit">Lưu</Button>
      </Form.Item>
    </FormCustomed>
  );
};

export default AddProviderForm;