import ReactToPrint from "react-to-print";
import { useRef, useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Content, Header, Footer } from "antd/lib/layout/layout";
import SearchHeader from "./components/SearchHeader";
import PaymentForm from "./components/PaymentForm";
import ListItem from "./components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../../../redux/constants/constant";

const SalePage = () => {
  const dispatch = useDispatch();
  const uid = localStorage.getItem("id");
  const { listProductSale, listProduct, loading } = useSelector(
    (state) => state.productSlice
  );
  const { cartItems } = useSelector((state) => state.cartSlice);
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_PRODUCT_SAGA });
    dispatch({ type: SagaActionTypes.GET_USER_BY_ID_SAGA, id: uid });
  }, []);

  return (
    <>
      <Layout className="min-h-screen w-full">
        {/* SearchHeader */}
        <Header
          style={{ padding: 0, background: "#011529" }}
          className="flex justify-end items-center"
        >
          <div className="mr-auto grow flex justify-center items-center bg-transparent z-10">
            <SearchHeader data={listProductSale} />
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
        <Content className="flex z-0">
          <div className="w-3/5 bg-slate-300">
            <ListItem data={cartItems} />
          </div>
          <div className="w-2/5 min-w-[200px]">
            <PaymentForm data={cartItems} />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default SalePage;
