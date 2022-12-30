import ReactToPrint from "react-to-print";
import { useRef, useState, useEffect } from "react";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Layout, Space, Dropdown, Spin } from "antd";
import { Content, Header, Footer } from "antd/lib/layout/layout";
import SearchHeader from "./components/SearchHeader";
import PaymentForm from "./components/PaymentForm";
import ListItem from "./components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../../../redux/constants/constant";
import DropDownAvatar from "./components/DropDownAvatar";

const SalePage = () => {
  const dispatch = useDispatch();
  const uid = localStorage.getItem("id");
  const { listProductSale, listProduct, loading } = useSelector(
    (state) => state.productSlice
  );
  const staffsSlice = useSelector((state) => state.staffsSlice);
  const vatSlice = useSelector((state) => state.vatSlice);
  const { cartItems } = useSelector((state) => state.cartSlice);
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_PRODUCT_SAGA });
    dispatch({ type: SagaActionTypes.GET_USER_BY_ID_SAGA, id: uid });
    dispatch({ type: SagaActionTypes.GET_VAT_SAGA });
  }, []);

  if (
    loading === true ||
    staffsSlice.loading === true ||
    vatSlice.loading === true
  ) {
    return (
      <div className="w-full flex items-center justify-center mb-12 h-4/5">
        <Space size="middle ">
          <Spin size="large" tip="Loading..." />
        </Space>
      </div>
    );
  }

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
          <DropDownAvatar />
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
