import { Modal, Form, Input, Upload } from "antd";
import React from "react";
import "antd/dist/antd.css";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/ModalForm.css";

function ModalForm({ titleHeader, isModalOpen, setIsModalOpen }) {
  const handleOk = () => {
    // Lưu dữ liệuvà thông báo ở đây
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      className="modalForm"
      title={titleHeader}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Lưu"
      cancelText="Hủy"
      closable={false}
      destroyOnClose={true}
    >
      <Form
        className="FormProduct"
        name="formAddProduct"
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="code"
          label="Mã sản phẩm"
          rules={[
            {
              required: true,
              message: "Mã sản phẩm là bắt buộc!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[
            {
              required: true,
              message: "Tên sản phẩm là bắt buộc!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Giá bán">
          <Input />
        </Form.Item>
        <Form.Item name="vat" label="VAT(%)">
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Ảnh" valuePropName="fileList">
          <Upload listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải lên</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default ModalForm;
