import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space } from "antd";
import Search from "antd/lib/input/Search";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import TableProductLines from "./components/TableProductLines";

const ProductLinesPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: "Vui lòng nhập ${label}!",
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAddProvider = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = () => {
    form.submit();
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <div className="ml-7 mt-5 mr-3 mb-8">
        <div className="search-container flex flex-col items-center md:flex-row justify-end items-center gap-x-4 gap-y-2 w-full">
          <div className="inline-block font-semibold md:mr-auto text-base whitespace-nowrap text-2xl">
            Danh sách dòng sản phẩm
          </div>
          <Search
            className="min-w-min max-w-xs"
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            // onSearch={onSearch}
          />
          {/* button search */}
          <button
            className="flex items-center justify-center
                    bg-blue-500 h-8 w-fit p-2 text-white
                    md:mt-0 hover:bg-blue-600 shadow-lg rounded whitespace-nowrap"
            onClick={handleAddProvider}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Thêm dòng sản phẩm
          </button>
        </div>
        <Space className="mt-3">
          <Button
            className="border-none shadow-none bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700"
            type="text"
            icon={<DownloadOutlined className="text-gray-900" />}
            size="small"
            //onClick={handleImportFile}
          >
            Nhập file
          </Button>
          <Button
            className="border-none shadow-none bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700"
            type="text"
            icon={<UploadOutlined className="text-gray-900" />}
            size="small"
            //onClick={handleExportFile}
          >
            Xuất file
          </Button>
        </Space>
      </div>
      <TableProductLines />
      <Modal
        title={
          <header className="font-medium text-xl">Thêm dòng sản phẩm</header>
        }
        open={isModalOpen}
        destroyOnClose="true"
        onCancel={handleCancel}
        footer={
          <button
            className="rounded py-2 px-3 bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
            onClick={handleSubmit}
          >
            Lưu
          </button>
        }
      >
        <div className="w-full h-full">
          <Form
            {...layout}
            layout="horizontal"
            form={form}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Mã dòng sản phẩm"
              name="maDongSanPham"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Mã dòng sản phẩm" />
            </Form.Item>
            <Form.Item
              label="Tên dòng sản phẩm"
              name="tenDongSanPham"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Tên dòng sản phẩm" />
            </Form.Item>
            <Form.Item label="Mô tả" name="moTa">
              <TextArea rows={4} placeholder="Mô tả dòng sản phẩm" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ProductLinesPage;
