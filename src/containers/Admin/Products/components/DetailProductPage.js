import React, { useState } from "react";
import moment from "moment";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Upload,
  Spin,
} from "antd";
import { InfoCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

const DetailProductPage = (props) => {
  const history = useHistory();
  const { id } = props.match.params;

  // Get data by id
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PRODUCT_BY_ID_SAGA, id: id });
  }, []);
  const { productById, loading } = useSelector((state) => state.productSlice);
  console.log(productById);

  // ValidateMessagees
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

  // //Set view
  // const [isView, setIsView] = useState(true);

  const handleExit = () => {
    history.goBack();
  };

  // const handleSetView = () => {
  //   setIsView(true);
  // };

  // const handleSetEdit = () => {
  //   setIsView(false);
  // };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    { url: productById ? productById.image : "" },
  ]);
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
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const initialValues = {
    productId: productById.product.title,
    deliveryNoteId: `${productById.deliveryNote.id} - ${productById.deliveryNote.provider.name}`,
    MFG: moment(productById.MFG),
    EXP: moment(productById.EXP),
    cost: productById.cost,
    price: productById.price,
    quantity: productById.quantity,
    description: productById.description,
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

  if (loading === true) {
    return (
      <div className="w-full flex items-center justify-center mb-12 h-4/5">
        <Space size="middle ">
          <Spin size="large" tip="Loading..." />
        </Space>
      </div>
    );
  }

  return (
    <Form
      layout="vertical"
      validateMessages={validateMessages}
      initialValues={initialValues}
    >
      <div className="flex justify-center items-center">
        <div className="gap-8 mt-10 flex w-full lg:w-3/5 flex-col md:flex-row mx-10">
          {/* Thông tin sản phẩm */}
          <div className="rounded bg-white shadow-xl px-5 py-8">
            <header className="font-bold text-xl">Thông tin sản phẩm</header>
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
                    disabled={true}
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
                    disabled={true}
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
                disabled={true}
              />
            </Form.Item>
          </div>

          <div className="rounded bg-white shadow-xl  px-5 py-8">
            {/* Thông tin nhập hàng */}
            <div>
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
                      disabled={true}
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
              <Form.Item name="description" label="Mô tả">
                <TextArea className="rounded" placeholder="Mô tả..." rows={4} />
              </Form.Item>
              <Form.Item className="w-fit rounded" label="Hình ảnh sản phẩm">
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
                    maxCount="1"
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
            </div>

            {/* Button Action */}
            <div className="flex justify-end">
              {/* <Space
                size={[15]}
                hidden={isView}
                className="w-full py-2 lg:w-3/5 flex justify-end"
              >
                <button
                  className="border rounded border-gray-300 py-2 px-3 bg-gray-100 hover:bg-gray-200 shadow-md hover:border-gray-300"
                  onClick={handleSetView}
                >
                  Trở lại
                </button>
                <button
                  className="rounded py-2 px-3 bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
                  htmlType="submit"
                >
                  Lưu
                </button>
              </Space> */}
              <Space
                size={[15]}
                className="w-full py-2 lg:w-3/5 flex justify-end"
              >
                {/* <button
                  className="border rounded border-gray-300 py-2 px-3 bg-gray-100 hover:bg-gray-200 shadow-md hover:border-gray-300 whitespace-nowrap"
                  onClick={handleSetEdit}
                >
                  Chỉnh sửa
                </button> */}
                <button
                  className="rounded border border-gray-400 text-gray-600 py-2 px-3 bg-gray-100 opacity-90 hover:opacity-100 hover:text-gray-800 hover:border-gray-500 shadow-md"
                  onClick={handleExit}
                >
                  Thoát
                </button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default DetailProductPage;
