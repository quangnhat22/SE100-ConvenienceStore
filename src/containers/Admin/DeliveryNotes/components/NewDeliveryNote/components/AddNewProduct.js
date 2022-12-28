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
import FormCustomed from "../../../../../../common/Form/FormCustomed";
import { useSelector, useDispatch } from "react-redux";
import { editDeliveryNotesActions } from "../../../../../../redux/reducer/EditDeliveryNotesReducer";
import { modalActions } from "../../../../../../redux/reducer/ModalReducer";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const AddNewProduct = () => {
  let { productOfProvider } = useSelector((state) => state.providerSlice);
  const optionsProductLines = productOfProvider.map(function (productLine) {
    return {
      value: productLine.id,
      label: `${productLine.id} - ${productLine.title}`,
    };
  });
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    let newProduct = {
      productId: values.product_name,
      cost: values.product_buyprice,
      price: values.product_sellprice,
      MFG: values.product_expiry_date[0].toISOString(),
      EXP: values.product_expiry_date[1].toISOString(),
      quantity: values.product_quantity,
      description: values.product_description,
      image: "string", // fix sau
    };
    console.log(newProduct);
    dispatch(editDeliveryNotesActions.addNewProductItem(newProduct));
    dispatch(modalActions.hideModal());
  };
  return (
    <FormCustomed
      name="add_product_form"
      form={form}
      onFinish={onFinish}
      initialValues={{ description: "", image: "" }}
    >
      <Form.Item
        name="product_name"
        label="Tên dòng sản phẩm"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          showSearch
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
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          min={0}
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
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          min={0}
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
          //   disabledDate={(current) => current.isAfter(moment())}
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
          min={1}
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
export default AddNewProduct;
