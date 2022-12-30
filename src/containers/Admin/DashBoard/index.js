import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardPage from "./components/DashboardPage";
import * as SagaActionTypes from "../../../redux/constants/constant";

const DashBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_USER_SAGA });
    dispatch({ type: SagaActionTypes.GET_LIST_PRODUCT_SAGA });
  }, []);
  return <DashboardPage />;
};

export default DashBoard;
