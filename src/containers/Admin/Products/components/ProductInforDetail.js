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
const ProductInforDetail = ({ product }) => {
  const dispatch = useDispatch();
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
    let newProduct = {
      maSanPham: values.product_id,
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
    dispatch(productActions.editProduct(newProduct));
    //auto close modal
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };

  const handleModify = () => {};

  const handleClose = () => {
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <FormCustomed
      name="product_infor_form"
      initialValues={{
        product_id: product.maSanPham,
        product_name: product.tenSanPham,
        product_buyprice: product.giaNhap,
        product_sellprice: product.giaBan,
        product_tax: product.thue,
        product_expiry_date: [
          moment(product.ngaySanXuat, dateFormat),
          moment(product.thoiHan, dateFormat),
        ],
        product_quantity: product.soLuong,
        product_description: product.moTa,
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
            min: 0,
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
            className="edit-reader-button mr-4"
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
          <Button
            className="cancel-edit-reader-button mr-4"
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button onClick={handleModify} htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      )}
    </FormCustomed>
  );
};
export default ProductInforDetail;
