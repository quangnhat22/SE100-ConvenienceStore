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
import { productActions } from "../../../../redux/reducer/ProductReducer";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    let newProduct = {
      maSanPham: moment().valueOf(),
      tenSanPham: values.product_name,
      giaNhap: values.product_buyprice,
      giaBan: values.product_sellprice,
      thue: values.product_tax,
      ngaySanXuat: values.product_expiry_date[0].format(dateFormat),
      thoiHan: values.product_expiry_date[1].format(dateFormat),
      soLuong: values.product_quantity,
      moTa: values.product_description,
    };
    console.log(newProduct);
    dispatch(productActions.addNewProduct(newProduct));
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };
  return (
    <FormCustomed
      name="bill_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        bill_date: moment(),
      }}
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
        <Input placeholder="Tên cửa hàng" />
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
        <DatePicker placeholder="Ngày lập hóa đơn" format={dateFormat} />
      </Form.Item>
      <Form.Item
        name="store_staff"
        label="Người lập hóa đơn"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên người lập hóa đơn" />
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
        <InputNumber addonAfter={"VNĐ"} placeholder="Tổng giá" />
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
        <InputNumber addonAfter={"%"} placeholder="Thuế VAT" />
      </Form.Item>
      <Form.Item
        name="bill_customer_pay"
        label="Tiền khách trả"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
          },
        ]}
      >
        <InputNumber addonAfter={"VNĐ"} placeholder="Tiền khách trả" />
      </Form.Item>
      <Form.Item
        name="bill_customer_repay"
        label="Tiền trả lại cho khách"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
          },
        ]}
      >
        <InputNumber addonAfter={"VNĐ"} placeholder="Tiền trả lại cho khách" />
      </Form.Item>
      <Form.Item
        name="bill_note"
        label="Ghi chú"
        rules={[
          {
            required: true,
          },
        ]}
      >
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
        <Button>In hóa đơn</Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default PaymentForm;
