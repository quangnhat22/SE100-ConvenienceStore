import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Form,
  Input,
  Select,
  Button,
  Col,
  Row,
  Spin,
  Space,
  DatePicker,
  InputNumber,
  Upload,
  Modal,
} from "antd";
import { InfoCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { useHistory } from "react-router-dom";

const DetailProductForm = ({ product }) => {
  const history = useHistory();
  const validateMessages = {
    required: "Cần nhập ${label}!",
    types: {
      email: "${label} không hợp lệ!",
      number: "",
    },
    number: {
      min: "${label} phải ít nhất từ ${min} trở lên",
      range: "${label} phải trong khoảng từ ${min} đến ${max}",
    },
  };
  console.log("product:", product);
  const defaultValues = {
    productId: `${product.product.id} - ${product.product.title}`,
    deliveryNoteId: `${product.deliveryNote.id} - ${product.deliveryNote.provider.name}`,
    MFG: moment(product.MFG),
    EXP: moment(product.EXP),
    cost: product.cost,
    price: product.price,
    quantity: product.quantity,
    description: product.description,
  };
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

  const onReset = () => {
    form.resetFields();
  };
  const handleModify = () => {};

  const dispatch = useDispatch();
  const onFinish = (values) => {
    let editProduct = {
      price: values.price,
      description: values.description,
      // image: values.image.filename,
      image: "http://example.com/a.jpg", /////////////Cần sửa ở đây
    };
    console.log(values);
    dispatch({
      type: SagaActionTypes.PUT_PRODUCT_ITEM_SAGA,
      id: product.id,
      editProduct: editProduct,
    });
    history.go(0);
  };

  return (
    <Form
      name="detail_product_form"
      form={form}
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={defaultValues}
    >
      <Row gutter={24}>
        <Col span={12} key={1}>
          <Form.Item
            name="productId"
            label="Dòng sản phẩm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              className="rounded"
              placeholder="Dòng sản phẩm"
              disabled={true}
            ></Input>
          </Form.Item>
        </Col>
        <Col span={12} key={2}>
          <Form.Item
            name="deliveryNoteId"
            label="Mã phiếu nhập kho"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              className="rounded"
              placeholder="Phiếu nhập kho"
              disabled={true}
            ></Input>
          </Form.Item>
        </Col>
        <Col span={12} key={3}>
          <Form.Item
            name="MFG"
            label="Ngày sản xuất"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              className="rounded"
              placeholder="Ngày sản xuất"
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col span={12} key={4}>
          <Form.Item
            name="EXP"
            label="Ngày hết hạn"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              className="rounded"
              placeholder="Ngày hết hạn"
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col span={8} key={5}>
          <Form.Item
            name="cost"
            label="Giá nhập"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              className="rounded"
              min={0}
              addonAfter={<div>VNĐ</div>}
              placeholder="Giá nhập"
              //   formatter={(value) => formatterPrice(value)}
              //   parser={(value) => parserPrice(value)}
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col span={8} key={6}>
          <Form.Item
            name="price"
            label="Giá bán"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              className="rounded"
              min={0}
              addonAfter={<div>VNĐ</div>}
              placeholder="Giá bán"
              //   formatter={(value) => formatterPrice(value)}
              //   parser={(value) => parserPrice(value)}
              disabled={componentDisabled}
            />
          </Form.Item>
        </Col>
        <Col span={8} key={7}>
          <Form.Item
            name="quantity"
            label="Số lượng"
            min={1}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              className="w-full rounded"
              min={1}
              placeholder="Số lượng"
              // formatter={(value) => formatterNumber(value)}
              // parser={(value) => parserNumber(value)}
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col span={24} key={8}>
          <Form.Item name="description" label="Mô tả">
            <TextArea
              className="rounded"
              placeholder="Mô tả..."
              rows={2}
              disabled={componentDisabled}
            />
          </Form.Item>
        </Col>
        <Col span={8} key={9}>
          <Form.Item className="w-fit rounded" label="Hình ảnh sản phẩm">
            <>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                beforeUpload={() => {
                  return false;
                }}
                // fileList={fileList}
                // onPreview={handlePreview}
                // onChange={handleChange}
                maxCount="1"
                disabled={componentDisabled}
              >
                <Space className="flex flex-col text-base">
                  <PlusOutlined />
                  Tải ảnh
                </Space>
              </Upload>
              <Modal
                // open={previewOpen}
                // title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  //   src={previewImage}
                />
              </Modal>
            </>
          </Form.Item>
        </Col>
      </Row>
      {enableModify === false ? (
        <div
          style={{
            textAlign: "end",
          }}
        >
          <Button className="edit-reader-button" onClick={handleEnableModify}>
            Chỉnh sửa
          </Button>
        </div>
      ) : (
        <div
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
        </div>
      )}
    </Form>
  );
};

export default DetailProductForm;
