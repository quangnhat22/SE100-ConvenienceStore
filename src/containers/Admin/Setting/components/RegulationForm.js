import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, InputNumber, Upload } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { Colorpicker } from "antd-colorpicker";

const RegualtionForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  //const initialValues = { color: { r: 26, g: 14, b: 85, a: 1 } };

  return (
    <FormCustomed name="add_product_form" form={form} onFinish={onFinish}>
      <Form.Item
        name="product_name"
        label="Tên trạng thái"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên sản phẩm" />
      </Form.Item>
      <Form.Item
        name="product_buyprice"
        label="Số lượng tối thiểu"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          style={{
            width: "50%",
          }}
          placeholder="Giá nhập"
        />
      </Form.Item>
      <Form.Item
        name="product_sellprice"
        label="Số lượng tối đa"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          style={{
            width: "50%",
          }}
          placeholder="Giá bán"
        />
      </Form.Item>

      <Form.Item label={"Colorpicker"} name={`color`}>
        <Colorpicker
          onChange={(value) => {
            console.log(value);
          }}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 20,
          offset: 20,
        }}
      >
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default RegualtionForm;
