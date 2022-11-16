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
const AddProductForm = () => {
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
    <FormCustomed name="add_product_form" form={form} onFinish={onFinish}>
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
        name="product_name"
        label="Tên sản phẩm"
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
        label="Giá nhập"
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
          style={{
            width: "60%",
          }}
          placeholder="Giá nhập"
        />
      </Form.Item>
      <Form.Item
        name="product_sellprice"
        label="Giá bán"
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
          style={{
            width: "60%",
          }}
          placeholder="Giá bán"
        />
      </Form.Item>
      <Form.Item
        name="product_tax"
        label="Thuế"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
            max: 100,
          },
        ]}
      >
        <InputNumber
          addonAfter={"%"}
          style={{
            width: "40%",
          }}
          placeholder="Thuế"
        />
      </Form.Item>
      <Form.Item
        name="product_expiry_date"
        label="Thời hạn"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <RangePicker
          style={{
            width: "100%",
          }}
          placeholder={["Ngày sản xuất", "Ngày hết hạn"]}
          format={dateFormat}
        />
      </Form.Item>
      <Form.Item
        name="product_quantity"
        label="Số lượng"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
          },
        ]}
      >
        <InputNumber
          style={{
            width: "30%",
          }}
          placeholder="Số lượng"
        />
      </Form.Item>
      <Form.Item name="product_description" label="Mô tả">
        <TextArea rows={4} placeholder="Mô tả" />
      </Form.Item>
      <Form.Item
        name="product_images"
        label="Ảnh sản phẩm"
        valuePropName="fileList"
      >
        <Upload action="/upload.do" listType="picture-card">
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
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default AddProductForm;
