import React, { useState, useEffect } from "react";
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
import { productActions } from "../../../../redux/reducer/ProductReducer";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";

const totalPrice = (cartItems) => {
  if (cartItems) {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].quantity * cartItems[i].price;
    }
    return total;
  }
};

const PaymentForm = ({ data }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const defaultValues = {
    store_name: "Convenience Store",
    bill_date: moment(),
    bill_creater: "Quang Kotex",
    bill_price: totalPrice(data),
    bill_tax: 8,
    bill_finalprice: (totalPrice(data) * 108) / 100,
  };
  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);
  const onFinish = (values) => {
    console.log(values);
  };

  const onChange = (value) => {
    form.setFieldsValue({
      bill_customer_repay: value - form.getFieldValue().bill_finalprice,
    });
  };

  return (
    <FormCustomed
      name="bill_form"
      form={form}
      onFinish={onFinish}
      initialValues={defaultValues}
    >
      {/* <Form.Item name="product_id" label="Mã sản phẩm">
        <Input
          style={{
            width: "80%",
          }}
          placeholder="Mã sản phẩm"
          disabled={true}
        />
      </Form.Item> */}
      <Form.Item
        name="store_name"
        label="Tên cửa hàng"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên cửa hàng" disabled={true} />
      </Form.Item>
      <Form.Item
        name="bill_date"
        label="Ngày lập hóa đơn"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker
          placeholder="Ngày lập hóa đơn"
          format={dateFormat}
          disabled={true}
        />
      </Form.Item>
      <Form.Item
        name="bill_creater"
        label="Người lập hóa đơn"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên người lập hóa đơn" disabled={true} />
      </Form.Item>
      <Form.Item
        name="bill_price"
        label="Tổng tiền hàng"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
          },
        ]}
      >
        <InputNumber
          addonAfter={"VNĐ"}
          placeholder="Tổng giá"
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          disabled={true}
        />
      </Form.Item>
      <Form.Item
        name="bill_tax"
        label="Thuế VAT"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber addonAfter={"%"} placeholder="Thuế VAT" disabled={true} />
      </Form.Item>
      <Form.Item
        name="bill_finalprice"
        label="Tiền sau thuế"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
          },
        ]}
      >
        <InputNumber
          addonAfter={"VNĐ"}
          placeholder="Tổng giá"
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          disabled={true}
        />
      </Form.Item>
      <Form.Item
        name="bill_customer_pay"
        label="Tiền khách trả"
        rules={[
          {
            required: true,
            type: "number",
          },
        ]}
      >
        <InputNumber
          addonAfter={"VNĐ"}
          min={(totalPrice(data) * 108) / 100}
          placeholder="Tiền khách trả"
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          onChange={(value) => onChange(value)}
        />
      </Form.Item>
      <Form.Item
        name="bill_customer_repay"
        label="Tiền trả lại cho khách"
        rules={[
          {
            required: true,
            type: "number",
          },
        ]}
      >
        <InputNumber
          addonAfter={"VNĐ"}
          placeholder="Tiền trả lại cho khách"
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          disabled={true}
        />
      </Form.Item>
      <Form.Item name="bill_note" label="Ghi chú">
        <Input placeholder="Ghi chú" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 20,
          offset: 10,
        }}
      >
        <Button className="mr-4" htmlType="submit">
          Thanh toán
        </Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default PaymentForm;
