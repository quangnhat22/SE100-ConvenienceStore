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
import axios from "axios";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

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

  const defaultValues = {
    productId: `${product.product.id} - ${product.product.title}`,
    deliveryNoteId: `${product.deliveryNote.id} - ${product.deliveryNote.provider.name}`,
    MFG: moment(product.MFG),
    EXP: moment(product.EXP),
    cost: product.cost,
    price: product.price,
    quantity: product.quantity,
    initialQuantity: product.initialQuantity,
    description: product.description,
  };
  const [form] = Form.useForm();
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [fileList, setFileList] = useState([{ url: product.image }]);
  const [imageChange, setImageChange] = useState(product.image);
  const [progress, setProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleEnableModify = () => {
    setEnableModify(true);
    setComponentDisabled(false);
  };
  const handleCancel = () => {
    setEnableModify(false);
    setComponentDisabled(true);
    onReset();
  };

  const handleCancelPreview = () => setPreviewOpen(false);

  const handleClose = () => {
    history.goBack();
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleModify = () => {};

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      console.log(file.preview);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("image", file);
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost/image/upload",
        data: fmData,
        ...config,
      });

      let { data, status } = res;
      console.log("server res: ", res);
      setImageChange(data["path"]);
      onSuccess("Ok");
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    //console.log(fileList);
    setFileList(fileList);
    if (fileList.length == 0) {
      setImageChange(
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
      );
    }
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };

  const dispatch = useDispatch();
  const onFinish = (values) => {
    let editProduct = {
      price: values.price,
      description: values.description,
      // image: values.image.filename,
      image: imageChange, /////////////Cần sửa ở đây
    };
    console.log("values: ", editProduct);
    dispatch({
      type: SagaActionTypes.PUT_PRODUCT_ITEM_SAGA,
      id: product.id,
      editProduct: editProduct,
    });
  };

  return (
    <Form
      name="detail_product_form"
      form={form}
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={defaultValues}
    >
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col xs={24} sm={24} lg={12} key={1}>
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
        <Col xs={24} sm={24} lg={12} key={2}>
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
        <Col xs={24} sm={12} key={3}>
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
        <Col xs={24} sm={12} key={4}>
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
        <Col xs={24} sm={12} md={24} lg={12} key={5}>
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
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={6}>
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
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              disabled={componentDisabled}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={7}>
          <Form.Item
            name="initialQuantity"
            label="Số lượng nhập"
            min={1}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              className="rounded"
              addonAfter={""}
              min={1}
              placeholder="Số lượng nhập"
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={7}>
          <Form.Item
            name="quantity"
            label="Số lượng còn lại"
            min={1}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              className="rounded"
              addonAfter={""}
              min={1}
              placeholder="Số lượng còn lại"
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
        <Col span={24} key={9}>
          <Form.Item className="w-fit rounded" label="Hình ảnh sản phẩm">
            <>
              <Upload
                accept=".png, .jpg, .jpeg, tiff, .nef, .gif, .svg, .psd, .pdf, .eps, .ai, .heic, .raw, .bmp"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                customRequest={uploadImage}
                onChange={handleOnChange}
                maxCount="1"
                disabled={componentDisabled}
              >
                <Space className="flex flex-col text-base">
                  <PlusOutlined />
                  Tải ảnh
                </Space>
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancelPreview}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </>
          </Form.Item>
        </Col>
      </Row>
      {enableModify === false ? (
        <Space className="flex justify-end">
          <Button
            className="rounded bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
            type="primary"
            size="large"
            onClick={() => handleEnableModify()}
          >
            Chỉnh sửa
          </Button>
          <Button
            className="rounded bg-red-500 opacity-90 text-white hover:opacity-100 shadow-md"
            size="large"
            type="primary"
            danger
            onClick={() => handleClose()}
          >
            Đóng
          </Button>
        </Space>
      ) : (
        <Space className="flex justify-end">
          <Button
            className="rounded bg-red-500 opacity-90 text-white hover:opacity-100 shadow-md"
            size="large"
            type="primary"
            danger
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button
            className="rounded bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
            size="large"
            type="primary"
            onClick={handleModify}
            htmlType="submit"
          >
            Lưu
          </Button>
        </Space>
      )}
    </Form>
  );
};

export default DetailProductForm;
