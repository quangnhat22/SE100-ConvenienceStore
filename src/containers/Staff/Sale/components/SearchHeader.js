import React, { useState } from "react";
import { Input, Table, Image, Space, Button } from "antd";
import {
  CloseOutlined,
  SearchOutlined,
  FileSearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../../../../common/Table/TableTemplate";
import { cartActions } from "../../../../redux/reducer/CartReducer";
import { useSelector, useDispatch } from "react-redux";

const SearchHeader = ({ data }) => {
  const dispatch = useDispatch();
  const [searchedText, setSearchedText] = useState("");

  const [showResult, setShowResult] = useState(true);
  const changeShowResult = (value) => {
    setShowResult(value === "" ? true : value === null ? true : false);
  };

  const handleSelect = (cartItem) => {
    let newCartItem = {
      id: cartItem.id,
      productName: cartItem.product.title,
      price: cartItem.price,
      quantity: 1,
      tax: cartItem.product.tax,
      image: cartItem.image,
      maxQuantity: cartItem.quantity,
    };
    dispatch(cartActions.addNewCartItem(newCartItem));
  };

  const columns = [
    {
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: "100px",
      render: (value, record) => {
        return (
          <div className="rounded">
            <img
              className="object-scale-down h-16 w-20"
              src={`${record.image}`}
              alt=""
            />
          </div>
        );
      },
    },
    {
      dataIndex: "id",
      key: "id",
      width: "40%",
      ellipsis: true,
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.product.title)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      dataIndex: ["product", "title"],
      key: "title",
      ellipsis: true,
      width: "40%",
    },
    {
      dataIndex: "quantity",
      width: "10%",
      key: "quantity",
      ellipsis: true,
      render: (quantity) =>
        quantity.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      dataIndex: "price",
      key: "price",
      width: "20%",
      fixed: "right",
      ellipsis: false,
      render: (value, record) => {
        return (
          <Space className="flex flex-nowrap" size={3}>
            {record.price.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
            <sup className="flex flex-col justify-center">đ</sup>
          </Space>
        );
      },
    },
    {
      key: "action",
      fixed: "right",
      width: "100px",
      align: "center",
      render: (value, record) => (
        // <button
        //   type="button"
        //   className="text-white font-bold p-2 bg-blue-500"
        //
        // >
        //   Chọn mua
        // </button>
        <button
          type="button"
          className="text-white font-bold py-3 px-3 inline-flex items-center edit-button rounded"
          onClick={() => handleSelect(record)}
        >
          <ShoppingCartOutlined className="text-xl flex justify-center items-center" />
        </button>
      ),
    },
  ];

  return (
    <div className="relative w-full mx-3 md:w-4/5 lg:w-3/5">
      <Input
        type="text"
        size="large"
        allowClear={{ clearIcon: <CloseOutlined className={"text-lg"} /> }}
        prefix={<SearchOutlined className="mr-2" />}
        className="w-full pr-5 text-lg rounded-full border-2 border-gray-500 hover:border-blue-500 focus:border-blue-900 focus:outline-none transition"
        placeholder="Tìm kiếm..."
        onChange={(e) => {
          changeShowResult(e.target.value);
          setSearchedText(e.target.value);
        }}
      />
      <div hidden={showResult}>
        <Table
          className="absolute p-1 bg-white shadow-lg overflow-y-auto customTable rounded-2xl"
          size="small"
          rowKey={"id"}
          showHeader={false}
          pagination={false}
          columns={columns}
          dataSource={data}
          scroll={{ y: 400 }}
          locale={{
            emptyText: (
              <Space className="flex flex-col justify-center items-center">
                <FileSearchOutlined className="text-gray-500 font-bold text-4xl" />
                <div className="font-bold">Không tìm thấy kết quả nào.</div>
                <div className="text-gray-400">
                  Vui lòng kiểm tra và thử lại.
                </div>
              </Space>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default SearchHeader;
