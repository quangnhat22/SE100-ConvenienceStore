import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const DetailProviderForm = ({ provider }) => {
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

  const onReset = () => {
    form.resetFields();
  };
  const handleModify = () => {};

  const handleClose = () => {
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };
  const dispatch = useDispatch();
  const onFinish = (values) => {
    let editedProvider = {
      name: values.name,
      email: values.email,
      address: values.address,
    };
    console.log(values);
    // dispatch(providerActions.addNewProduct(editedProvider));
    dispatch({
      type: SagaActionTypes.PUT_PROVIDER_SAGA,
      id: provider.id,
      provider: editedProvider,
    });
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };

  return (
    <FormCustomed
      name="edit_provider_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: provider.name,
        email: provider.email,
        address: provider.address,
      }}
    >
      <Form.Item
        name="name"
        label="Tên nhà cung cấp"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên nhà cung cấp" disabled={componentDisabled} />
      </Form.Item>
      {/* <Form.Item name="nhomNhaCungCap" label="Nhóm nhà cung cấp">
        <Select
          className="rounded"
          placeholder="Nhóm nhà cung cấp"
          disabled={componentDisabled}
        />
      </Form.Item>
      <Form.Item
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
        <Input placeholder="Số điện thoại" disabled={componentDisabled} />
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
        <Input placeholder="example@host.com" disabled={componentDisabled} />
      </Form.Item>
      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Thôn (Xóm), Xã (Phường, Thị trấn), Tỉnh (Thành phố)..."
          disabled={componentDisabled}
        />
      </Form.Item>
      {/* <Form.Item name="nhanVien" label="Nhân viên phụ trách">
        <Select className="rounded" placeholder="Chọn nhân viên" />
      </Form.Item>
      <Form.Item name="moTa" label="Mô tả">
        <TextArea
          className="rounded"
          rows={4}
          placeholder="Mô tả"
          disabled={componentDisabled}
        />
      </Form.Item> */}

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

export default DetailProviderForm;
