import React from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import moment from "moment";
import { providerActions } from "../../../../redux/reducer/ProviderReducer";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import FormCustomed from "../../../../common/Form/FormCustomed";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const AddProviderForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    let newProvider = {
      name: values.name,
      email: values.email,
      address: values.address,
      phone: values.phone,
      representative: values.representative,
    };
    console.log(newProvider);
    dispatch({
      type: SagaActionTypes.POST_PROVIDER_SAGA,
      newProvider: newProvider,
    });
  };

  return (
    <FormCustomed
      name="add_provider_form"
      form={form}
      onFinish={onFinish}
      initialValues={{ representative: "" }}
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
        <Input className="rounded" placeholder="Tên nhà cung cấp" />
      </Form.Item>
      <Form.Item
        name="phone"
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
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            type: "email",
          },
        ]}
      >
        <Input className="rounded" placeholder="example@host.com" />
      </Form.Item>
      <Form.Item name="representative" label="Người đại diện">
        <Input className="rounded" placeholder="Tên người đại diện" />
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
          className="rounded"
          placeholder="Thôn (Xóm), Xã (Phường, Thị trấn), Tỉnh (Thành phố)..."
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 30,
          offset: 21,
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

export default AddProviderForm;
