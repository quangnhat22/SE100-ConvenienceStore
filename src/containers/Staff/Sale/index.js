import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Content, Header, Footer } from "antd/lib/layout/layout";
import SearchHeader from "./components/SearchHeader";

// Data Demo
import listProduct from "./components/DataDemo";

const SalePage = () => {
  return (
    <>
      <Layout className="min-h-screen w-full">
        {/* SearchHeader */}
        <Header
          style={{ padding: 0, background: "#011529" }}
          className="flex justify-end items-center"
        >
          <div className="mr-auto grow flex justify-center items-center bg-transparent">
            <SearchHeader data={listProduct} />
          </div>
          <div className="flex items-center justify-end mr-7 bg-transparent">
            <UserOutlined
              className="p-2 rounded-full bg-blue-300"
              style={{ color: "#9900FF" }}
            />
            <p className="mb-0 ml-1 text-white">Nguyễn Văn A</p>
          </div>
        </Header>

        {/* Hóa đơn bán hàng và danh mục sản phẩm đang chọn */}
        <Content className="bg-slate-800">
          <div className="text-5xl">Đây là content bán hàng</div>
        </Content>
      </Layout>
    </>
  );
};

export default SalePage;
