import React, { useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber, Upload } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { useDispatch } from "react-redux";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const ProductLinesForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    let newProductLine = {
      title: values.title,
      tax: 0,
    };
    dispatch({
      type: SagaActionTypes.POST_PRODUCTS_SAGA,
      newProducts: newProductLine,
    });
  };
  return (
    <FormCustomed name="add_product_form" form={form} onFinish={onFinish}>
      <Form.Item
        label="Tên dòng sản phẩm"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên dòng sản phẩm" />
      </Form.Item>
      {/* <Form.Item
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
          min={0}
          style={{
            width: "30%",
          }}
          placeholder="Thuế"
        />
      </Form.Item> */}
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
export default ProductLinesForm;
