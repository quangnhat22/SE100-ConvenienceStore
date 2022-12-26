import React, { useEffect } from "react";
import EditProfilePage from "./components/EditProfilePage";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../../../redux/constants/constant";
import { Space, Spin } from "antd";

const FrofilePage = () => {
  const dispatch = useDispatch();
  let { loading, staff } = useSelector((state) => state.staffsSlice);

  useEffect(() => {
    let id = localStorage.getItem("id");
    dispatch({
      type: SagaActionTypes.GET_USER_BY_ID_SAGA,
      id: id,
    });
  }, []);

  if (loading === true) {
    return (
      <div className="w-full flex items-center justify-center mb-12 h-4/5">
        <Space size="middle ">
          <Spin size="large" tip="Loading..." />
        </Space>
      </div>
    );
  }
  return <EditProfilePage data={staff} />;
};
export default FrofilePage;
