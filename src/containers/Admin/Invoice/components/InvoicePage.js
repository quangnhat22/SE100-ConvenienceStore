import { Space } from "antd";
import moment from "moment";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import TableInvoice from "./TableInvoice";
import ModalForm from "../../../../HOC/ModalForm";

const InvoicePage = () => {
  const [keyWord, setKeyWord] = useState("");
  const data = [
    {
      id: "string",
      date: "2022-12-25T04:40:14.476Z",
      creator: {
        id: 1,
        email: "test@email.com",
        fullname: "John Doe",
        birthday: "2022-12-25T04:40:14.476Z",
        identityNumber: "11234567890",
        gender: "MALE",
        phoneNumber: "1234567890",
        address: "100 Wall St",
        other: "About your self",
        avatar: "https://localhost/test.jpg",
        role: "MANAGER",
      },
      total: 0,
      invoiceDetails: [
        {
          productItem: {
            id: "string",
            product: {
              id: "string",
              title: "string",
              tax: 10,
            },
            deliveryNote: {
              id: 0,
              provider: {
                id: 1,
                name: "string",
                email: "test@example.com",
                address: "string",
              },
              date: "2022-12-25T04:40:14.476Z",
              total: 0,
              productItems: [
                {
                  id: "string",
                  product: {
                    id: "string",
                    title: "string",
                    tax: 10,
                  },
                  MFG: "2022-12-25T04:40:14.476Z",
                  EXP: "2022-12-25T04:40:14.476Z",
                  cost: 0,
                  price: 0,
                  quantity: 0,
                  initialQuantity: 0,
                  description: "string",
                  image: "string",
                  state: [
                    {
                      stateName: "string",
                      color: "string",
                    },
                  ],
                },
              ],
            },
            MFG: "2022-12-25T04:40:14.476Z",
            EXP: "2022-12-25T04:40:14.476Z",
            cost: 0,
            price: 0,
            quantity: 0,
            initialQuantity: 0,
            description: "string",
            image: "string",
            state: [
              {
                stateName: "string",
                color: "string",
              },
            ],
          },
          price: 0,
          quantity: 0,
        },
      ],
    },
  ];

  return (
    <div className="bg-white pb-5">
      <Space className="flex justify-between border-b p-5">
        <div className="inline-block content-around font-bold text-xl">
          Hóa đơn sản phẩm
        </div>
        <Search
          name="search"
          placeholder="Tìm kiếm..."
          allowClear
          onChange={(value) => {
            setKeyWord(value);
          }}
        />
      </Space>

      {/* Cập nhật thời gian thực */}
      <div className="flex flex-row justify-end items-center px-5 py-2 text-gray-500 opacity-80 italic cursor-default">
        {"Dữ liệu đươc cập nhật lần cuối lúc: " +
          moment(new Date()).format("DD/MM/YYYY  HH:MM")}
      </div>

      <TableInvoice keyWord={keyWord} data={data} loading={false} />
      <ModalForm />
    </div>
  );
};

export default InvoicePage;
