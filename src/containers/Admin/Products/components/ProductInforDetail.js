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
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const ProductInforDetail = () => {
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

  const onFinish = (values) => {
    console.log(values);
  };

  const handleModify = () => {};

  const handleClose = () => {};
  const onReset = () => {
    form.resetFields();
  };
  let product = {
    id: "1",
    name: "bánh",
    buyprice: 10000,
    sellprice: 11000,
    tax: 10,
    expirydate: [
      moment("1-11-2020", dateFormat),
      moment("2-12-2022", dateFormat),
    ],
    quantity: 20,
    description: "đây là mô tả",
  };

  return (
    <FormCustomed
      name="product_infor_form"
      initialValues={{
        product_id: product.id,
        product_name: product.name,
        product_buyprice: product.buyprice,
        product_sellprice: product.sellprice,
        product_tax: product.tax,
        product_expiry_date: product.expirydate,
        product_quantity: product.quantity,
        product_description: product.description,
      }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item name="product_id" label="Mã sản phẩm">
        <Input
          style={{
            width: "80%",
          }}
          placeholder="Mã sản phẩm"
          disabled={true}
        />
      </Form.Item>
      <Form.Item
        name="product_name"
        label="Tên sản phẩm"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên sản phẩm" disabled={componentDisabled} />
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
            width: "50%",
          }}
          placeholder="Giá nhập"
          disabled={componentDisabled}
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
            width: "50%",
          }}
          placeholder="Giá bán"
          disabled={componentDisabled}
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
            width: "30%",
          }}
          placeholder="Thuế"
          disabled={componentDisabled}
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
          disabled={componentDisabled}
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
          disabled={componentDisabled}
        />
      </Form.Item>
      <Form.Item name="product_description" label="Mô tả">
        <TextArea rows={4} placeholder="Mô tả" disabled={componentDisabled} />
      </Form.Item>
      <Form.Item
        name="product_images"
        label="Ảnh sản phẩm"
        valuePropName="fileList"
      >
        <Upload
          action="/upload.do"
          listType="picture-card"
          disabled={componentDisabled}
        >
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
            className="edit-product-button mr-4 rounded-md sm:text-yellow-600 hover:border-green-500"
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
          <Button onClick={handleCancel}>Hủy</Button>
          <Button onClick={handleModify} htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      )}
    </FormCustomed>
  );
};
export default ProductInforDetail;
