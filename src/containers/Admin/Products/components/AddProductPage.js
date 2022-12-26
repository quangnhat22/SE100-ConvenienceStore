import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Upload,
  Select,
} from "antd";
import { InfoCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useHistory } from "react-router-dom";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { useDispatch, useSelector } from "react-redux";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

const AddProductPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
    dispatch({ type: SagaActionTypes.GET_LIST_DELIVERY_NOTES_SAGA });
  }, []);
  const { products } = useSelector((state) => state.productsSlice);
  console.log(products);
  const { deliveryNotes } = useSelector((state) => state.deliveryNotesSlice);
  const optionsProductLines = products.map(function (productLine) {
    return {
      value: productLine.id,
      label: productLine.title,
    };
  });
  const optionsDeliveryNotes = deliveryNotes.map(function (deliveryNote) {
    return {
      value: deliveryNote.id,
      label: `${deliveryNote.id} - ${deliveryNote.provider.name} - ${moment(
        deliveryNote.date
      ).format("DD/MM/YYYY")}`,
    };
  });
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

  const handleExit = () => {
    history.goBack();
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = (values) => {
    let newProduct = {
      productId: values.productId,
      deliveryNoteId: values.deliveryNoteId,
      MFG: values.MFG.toISOString(),
      EXP: values.EXP.toISOString(),
      cost: values.cost,
      price: values.price,
      quantity: values.quantity,
      description: values.description,
      // image: values.image.filename,
      image: "http://example.com/a.jpg", /////////////Cần sửa ở đây
    };
    console.log(values);
    dispatch({
      type: SagaActionTypes.POST_PRODUCT_ITEM_SAGA,
      newProduct: newProduct,
    });
    history.goBack();
  };

  // format số
  const formatterNumber = (val) => {
    if (!val) return "";
    return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parserNumber = (val) => {
    if (!val) return "";
    return Number.parseInt(val.replace(/\$\s?|(\,*)/g, ""));
  };

  // format tiền
  const formatterPrice = (val) => {
    if (!val) return "";
    return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parserPrice = (val) => {
    if (!val) return "";
    return Number.parseFloat(val.replace(/\$\s?|(\,*)/g, "")).toFixed(3);
  };

  return (
    <Form
      layout="vertical"
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <div className="flex justify-center items-center">
        <div className="gap-8 mt-10 flex flex-col w-full lg:w-3/5 md:flex-row mx-10">
          {/* Thông tin sản phẩm */}
          <div className="rounded bg-white shadow-xl px-5 py-8">
            <header className="font-bold text-xl">Thông tin sản phẩm</header>

            <Form.Item
              name="productId"
              label="Dòng sản phẩm"
              // rules={[
              //   {
              //     required: true,
              //   },
              // ]}
            >
              <Select
                className="rounded"
                placeholder="Dòng sản phẩm"
                allowClear
                options={optionsProductLines}
              ></Select>
            </Form.Item>
            <Form.Item
              name="deliveryNoteId"
              label="Đơn vị cung cấp"
              // rules={[
              //   {
              //     required: true,
              //   },
              // ]}
            >
              <Select
                className="rounded"
                placeholder="Đơn vị cung cấp"
                allowClear
                options={optionsDeliveryNotes}
              ></Select>
            </Form.Item>
            <Form.Item>
              <Space>
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
                  />
                </Form.Item>
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
                  />
                </Form.Item>
              </Space>
            </Form.Item>

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
                formatter={(value) => formatterNumber(value)}
                parser={(value) => parserNumber(value)}
                onChange={(value) => {
                  console.log("value", value);
                }}
              />
            </Form.Item>
          </div>
          {/* Thông tin nhập hàng */}
          <div className="rounded bg-white shadow-xl  px-5 py-8">
            <header className="font-bold text-xl whitespace-nowrap">
              Thông tin nhập hàng
              <InfoCircleTwoTone className="ml-1" />
            </header>
            <Form.Item>
              <Space>
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
                    formatter={(value) => formatterPrice(value)}
                    parser={(value) => parserPrice(value)}
                  />
                </Form.Item>
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
                    formatter={(value) => formatterPrice(value)}
                    parser={(value) => parserPrice(value)}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item className="rounded" name="description" label="Mô tả">
              <TextArea placeholder="Mô tả..." rows={4} />
            </Form.Item>
            <Form.Item
              className="w-fit rounded"
              name="image"
              label="Hình ảnh sản phẩm"
            >
              <>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  beforeUpload={() => {
                    return false;
                  }}
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
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
                  onCancel={handleCancel}
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
            {/* Button Action */}
            <div className="flex justify-end">
              <Space
                size={[15]}
                className="w-full py-2 lg:w-3/5 flex justify-end"
              >
                <button
                  className="border rounded border-gray-300 py-2 px-3 bg-gray-100 hover:bg-gray-200 shadow-md hover:border-gray-300"
                  onClick={handleExit}
                >
                  Thoát
                </button>
                <button
                  className="rounded py-2 px-4 bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
                  htmlType="submit"
                >
                  Lưu
                </button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AddProductPage;
