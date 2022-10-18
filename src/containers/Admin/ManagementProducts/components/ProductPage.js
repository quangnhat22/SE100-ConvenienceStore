import { Button, Switch, Table, Space, Modal, Input } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "../styles/Home.css";
import ModalForm from "./ModalForm";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const ProductPage = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "MÃ SẢN PHẨM",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "TÊN SẢN PHẨM",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "GIÁ BÁN(VNĐ)",
      dataIndex: "out_price",
      key: "out_price",
    },
    {
      title: "GIÁ NHẬP(VNĐ)",
      dataIndex: "in_price",
      key: "in_price",
    },
    {
      title: "VAT(%)",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "state",
      key: "state",
      render: (_, record) => (
        <Switch
          name="toggleState"
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          style={{ width: 20 }}
          checked={record.state}
        />
      ),
    },
    {
      title: "THAO TÁC",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <EditOutlined
            onClick={() => {
              setIsEditing(true);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              onDeleteProduct(record);
            }}
            style={{ color: "red", marginLeft: 15 }}
          />
        </div>
      ),
    },
  ];

  //Thêm dữ liệu demo
  const [dataSource, setDataSource] = useState([
    {
      number: 1,
      code: `A1`,
      name: `Sản phẩm 1`,
      out_price: 32000,
      in_price: 30000,
      vat: "10%",
      state: true,
    },
    {
      number: 2,
      code: `A2`,
      name: `Sản phẩm 2`,
      out_price: 32000,
      in_price: 30000,
      vat: "10%",
      state: true,
    },
    {
      number: 3,
      code: `A3`,
      name: `Sản phẩm 3`,
      out_price: 32000,
      in_price: 30000,
      vat: "10%",
      state: false,
    },
    {
      number: 4,
      code: `A4`,
      name: `Sản phẩm 4`,
      out_price: 32000,
      in_price: 30000,
      vat: "10%",
      state: true,
    },
    {
      number: 5,
      code: `A5`,
      name: `Sản phẩm 5`,
      out_price: 32000,
      in_price: 30000,
      vat: "10%",
      state: false,
    },
  ]);

  const onDeleteProduct = (record) => {
    Modal.confirm({
      title: "Bạn muốn xóa sản phẩm vừa chọn?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((product) => product.code !== record.code);
        });
      },
    });
  };

  const onDeleteProducts = (records) => {
    Modal.confirm({
      title: "Bạn muốn xóa các sản phẩm đang chọn?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        let _data = [...dataSource];
        records.forEach((rd) => {
          _data = _data.filter((t) => t.tableData.code !== rd.tableData.code);
        });
        setDataSource(_data);
      },
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const isShowEditModal = () => {
    setIsEditing(true);
  };
  const [isAdding, setIsAdding] = useState(false);
  const isShowAddModal = () => {
    setIsAdding(true);
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <Space className="pageHome">
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Button
          type="default"
          className="styleButton"
          onClick={() => {
            onDeleteProducts(selectedProducts);
          }}
          icon={<CloseCircleOutlined />}
        >
          Xóa sản phẩm đã chọn
        </Button>
        <Button
          type="default"
          className="styleButton"
          onClick={isShowAddModal}
          icon={<PlusCircleOutlined />}
        >
          Thêm Mới
        </Button>
      </div>
      <div>
        <span>
          <div>Trạng thái</div>
          <Switch style={{ width: 80 }} />
        </span>
        <Input.Search className="styleSearch" placeholder="Tìm kiếm..." />
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
        }}
        columns={columns}
        dataSource={dataSource}
      />
      <ModalForm
        titleHeader="Thêm thông tin sản phẩm"
        isModalOpen={isAdding}
        setIsModalOpen={(bool) => setIsAdding(bool)}
      />
      <ModalForm
        titleHeader="Sửa thông tin sản phẩm"
        isModalOpen={isEditing}
        setIsModalOpen={(bool) => setIsEditing(bool)}
      />
    </Space>
  );
};
export default ProductPage;
