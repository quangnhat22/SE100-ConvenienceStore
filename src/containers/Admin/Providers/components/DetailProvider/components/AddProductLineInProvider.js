import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Upload,
  Select,
} from "antd";
import FormCustomed from "../../../../../../common/Form/FormCustomed";
import * as SagaActionTypes from "../../../../../../redux/constants/constant";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const AddProductLineInProvider = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsSlice);
  let { id } = useParams();

  const optionsProductLines = products.map(function (productLine) {
    return {
      value: productLine.id,
      label: `${productLine.id} - ${productLine.title}`,
    };
  });
  const onFinish = (values) => {
    console.log(values.title);
    dispatch({
      type: SagaActionTypes.ADD_PRODUCT_PROVIDER_ID_SAGA,
      //   newProducts: newProductLine,
      providerId: id,
      listIdProduct: values.title,
    });
  };

  return (
    <FormCustomed
      name="add_product_line_provider"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="Tên dòng sản phẩm"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          className="rounded"
          placeholder="Dòng sản phẩm"
          options={optionsProductLines}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        ></Select>
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
export default AddProductLineInProvider;
