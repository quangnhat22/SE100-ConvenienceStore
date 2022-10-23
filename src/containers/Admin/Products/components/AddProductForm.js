import React, { useState } from "react";
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
const AddProductForm = () => {
  return (
    <FormCustomed>
      <Form.Item label="Mã sản phẩm">
        <Input
          style={{
            width: "80%",
          }}
          placeholder="Mã sản phẩm"
          disabled="true"
        />
      </Form.Item>
      <Form.Item
        name={["product", "name"]}
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
        name={["product", "buyprice"]}
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
        />
      </Form.Item>
      <Form.Item
        name={["product", "sellprice"]}
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
        />
      </Form.Item>
      <Form.Item
        name={["product", "tax"]}
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
        />
      </Form.Item>
      <Form.Item
        name={["product", "expiry date"]}
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
          format="DD-MM-YYYY"
        />
      </Form.Item>
      <Form.Item
        name={["product", "quantity"]}
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
      <Form.Item name={["product", "description "]} label="Mô tả">
        <TextArea rows={4} placeholder="Mô tả" />
      </Form.Item>
      <Form.Item
        name={["product", "images "]}
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
