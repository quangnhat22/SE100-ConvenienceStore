import React, { useState } from "react";
import { Input, Table, Image, Space } from "antd";
import {
  CloseOutlined,
  SearchOutlined,
  FileSearchOutlined,
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
        return <img className="w-16" src={`${record.image}`} alt="" />;
      },
    },
    {
      dataIndex: "id",
      key: "id",
      width: "20%",
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
    },
    {
      dataIndex: "quantity",
      width: "10%",
      key: "quantity",
      ellipsis: true,
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
            <sup className="flex flex-col justify-center">vn??</sup>
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
        <button
          type="button"
          className="text-blue-500 bg-white border border-blue-500 p-1 rounded whitespace-nowrap ml-1 hover:bg-sky-500"
          onClick={() => handleSelect(record)}
        >
          Ch???n mua
        </button>
      ),
    },
  ];

  return (
    <div className="relative w-full mx-3 md:w-3/5 lg:w-2/5">
      <Input
        type="text"
        size="large"
        allowClear={{ clearIcon: <CloseOutlined className={"text-lg"} /> }}
        prefix={<SearchOutlined className="mr-2" />}
        className="w-full pr-5 text-lg rounded-full border-2 border-gray-500 hover:border-blue-500 focus:border-blue-900 focus:outline-none transition"
        placeholder="T??m ki???m..."
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
                <div className="font-bold">Kh??ng t??m th???y k???t qu??? n??o.</div>
                <div className="text-gray-400">
                  Vui l??ng ki???m tra v?? th??? l???i.
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
