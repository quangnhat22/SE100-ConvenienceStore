import React, { useState } from "react";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Upload,
} from "antd";
import { InfoCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useHistory } from "react-router-dom";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { useDispatch } from "react-redux";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

const AddProductPage = ({ data }) => {
  const history = useHistory();
  const [productInformationForm] = Form.useForm();
  const [importInformationForm] = Form.useForm();
  const dispatch = useDispatch();
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
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onFinish = () => {
    let newProduct = {
      productId: productInformationForm.getFieldValue().productId,
      deliveryNoteId: productInformationForm.getFieldValue().deliveryNoteId,
      MFG: productInformationForm.getFieldValue().MFG,
      EXP: productInformationForm.getFieldValue().EXP,
      cost: importInformationForm.getFieldValue().cost,
      price: importInformationForm.getFieldValue().price,
      quantity: productInformationForm.getFieldValue().quantity,
      description: importInformationForm.getFieldValue().description,
      image: importInformationForm.image.filename,
    };
    console.log(newProduct);
    // dispatch({
    //   type: SagaActionTypes.POST_PRODUCT_ITEM_SAGA,
    //   newProduct: newProduct,
    // });
    history.goBack();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="gap-8 mt-10 flex flex-col w-full lg:w-3/5 md:flex-row mx-10">
        {/* Thông tin sản phẩm */}
        <div className="rounded bg-white shadow-xl px-5 py-8">
          <header className="font-bold text-xl mb-5">Thông tin sản phẩm</header>
          <Form
            form={productInformationForm}
            layout="vertical"
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
            <Form.Item
              name="productId"
              label="Mã sản phẩm"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="rounded" placeholder="Mã sản phẩm" />
            </Form.Item>
            <Form.Item
              name="deliveryNoteId"
              label="Mã đơn vận chuyển"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="rounded" placeholder="Mã đơn vận chuyển" />
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
              />
            </Form.Item>
          </Form>
        </div>

        {/* Thông tin nhập hàng */}
        <div className="rounded bg-white shadow-xl  px-5 py-8">
          <header className="font-bold text-xl whitespace-nowrap mb-5">
            Thông tin nhập hàng
            <InfoCircleTwoTone className="ml-1" />
          </header>
          <Form
            form={importInformationForm}
            layout="vertical"
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
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
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
              <TextArea className="rounded" placeholder="Mô tả..." rows={4} />
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
          </Form>

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
                onClick={() => {
                  productInformationForm.submit();
                  importInformationForm.submit();
                }}
              >
                Lưu
              </button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
