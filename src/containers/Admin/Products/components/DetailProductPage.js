import React, { useState } from "react";
import moment from "moment";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Upload,
  Spin,
} from "antd";
import { InfoCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import DetailProductForm from "./DetailProductForm";

const DetailProductPage = () => {
  const history = useHistory();
  const { id } = useParams();

  // Get data by id
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PRODUCT_BY_ID_SAGA, id: id });
  }, []);
  const { productById, loading } = useSelector((state) => state.productSlice);
  console.log(productById);

  // const onFinish = (values) => {
  //   let editProduct = {
  //     price: values.price,
  //     description: values.description,
  //     // image: values.image.filename,
  //     image: "http://example.com/a.jpg", /////////////Cần sửa ở đây
  //   };
  //   console.log(values);
  //   dispatch({
  //     type: SagaActionTypes.PUT_PRODUCT_ITEM_SAGA,
  //     id: id,
  //     editProduct: editProduct,
  //   });
  // };

  if (loading === true) {
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
      <div className="ml-7 mt-5 mr-3 mb-8">
        <div className="search-container flex flex-col md:flex-row justify-end items-center gap-x-4 gap-y-2 w-full">
          <div className="inline-block font-semibold md:mr-auto whitespace-nowrap text-2xl">
            ID sản phẩm: {id}
          </div>
        </div>
        <div className="rounded bg-white py-5 px-3 my-5">
          <DetailProductForm product={productById} />
        </div>
      </div>
    </>
  );
};

export default DetailProductPage;
