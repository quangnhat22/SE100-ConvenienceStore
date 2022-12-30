import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Space } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const DetailProductLinesForm = ({ productLine }) => {
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
    console.log(values);
    let newProductLine = {
      title: values.title,
      tax: values.tax,
    };
    dispatch({
      type: SagaActionTypes.PUT_PRODUCTS_SAGA,
      id: productLine.id,
      products: newProductLine,
    });
  };
  return (
    <FormCustomed
      name="add_product_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        id: productLine.id,
        title: productLine.title,
        tax: productLine.tax,
      }}
    >
      <Form.Item
        label="Mã dòng sản phẩm"
        name="id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Mã dòng sản phẩm" disabled={true} />
      </Form.Item>
      <Form.Item
        label="Tên dòng sản phẩm"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên dòng sản phẩm" disabled={componentDisabled} />
      </Form.Item>
      <Form.Item
        name="tax"
        label="Thuế"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          addonAfter={"%"}
          style={{
            width: "30%",
          }}
          placeholder="Thuế"
          min={0}
          disabled={componentDisabled}
        />
      </Form.Item>
      {enableModify === false ? (
        <Space className="flex justify-end">
          <Button
            className="rounded bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
            type="primary"
            size="large"
            onClick={() => handleEnableModify()}
          >
            Chỉnh sửa
          </Button>
          <Button
            className="rounded bg-red-500 opacity-90 text-white hover:opacity-100 shadow-md"
            size="large"
            type="primary"
            danger
            onClick={() => handleClose()}
          >
            Đóng
          </Button>
        </Space>
      ) : (
        <Space className="flex justify-end">
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
            onClick={handleModify}
            htmlType="submit"
          >
            Lưu
          </Button>
        </Space>
      )}
    </FormCustomed>
  );
};
export default DetailProductLinesForm;
