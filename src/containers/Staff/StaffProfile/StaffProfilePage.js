import { useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Layout, Space, Dropdown, Spin, Button } from "antd";
import { Content, Header, Footer } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../../../redux/constants/constant";
import DropDownAvatar from "./DropDownAvatar";
import FrofilePage from "../../Admin/Profile";
import { useHistory } from "react-router-dom";

const StaffProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const uid = localStorage.getItem("id");
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_USER_BY_ID_SAGA, id: uid });
  }, []);

  //   if (
  //     loading === true ||
  //     staffsSlice.loading === true ||
  //     vatSlice.loading === true
  //   ) {
  //     return (
  //       <div className="w-full flex items-center justify-center mb-12 h-4/5">
  //         <Space size="middle ">
  //           <Spin size="large" tip="Loading..." />
  //         </Space>
  //       </div>
  //     );
  //   }

  return (
    <>
      <Layout className="min-h-screen w-full">
        <Header
          style={{ padding: 0, background: "#011529" }}
          className="flex justify-between items-center"
        >
          <Button
            className="ml-5 bg-blue-500 opacity-70 text-white hover:opacity-100 shadow-md"
            size="large"
            type="primary"
            shape="circle"
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowLeftOutlined className="text-2xl" />
          </Button>

          <DropDownAvatar />
        </Header>
        <Content>
          <FrofilePage />
        </Content>
      </Layout>
    </>
  );
};

export default StaffProfilePage;
