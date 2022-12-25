import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Row,
  Col,
} from "antd";
import moment from "moment";
import Search from "antd/lib/input/Search";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewDeliveryTable from "./components/NewDeliveryTable";
// import ProductLinesForm from "./components/ProductLinesForm";
import ModalForm from "../../../../../HOC/ModalForm";
import * as SagaActionTypes from "../../../../../redux/constants/constant";
import { modalActions } from "../../../../../redux/reducer/ModalReducer";
const dateFormat = "DD/MM/YYYY";

const NewDeliveryNotePage = () => {
  const dispatch = useDispatch();
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
  }, []);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "Cần nhập ${label}!",
    types: {
      email: "${label} không hợp lệ!",
      number: "",
    },
    number: {
      min: "${label} phải ít nhất từ ${min} trở lên",
      range: "${label} phải trong khoảng từ ${min} đến ${max}",
    },
  };

  const handleAddProductsLine = () => {
    // dispatch(
    //   modalActions.showModal({
    //     ComponentContent: <ProductLinesForm />,
    //   })
    // );
  };

  return (
    <>
      <Form
        name="add_delivery_note_form"
        initialValues={{
          delivery_note_date: moment(),
        }}
      >
        <div className="ml-3 mt-5 mr-3 mb-8">
          <div className="inline-block font-semibold md:mr-auto whitespace-nowrap text-2xl">
            Tạo phiếu nhập hàng
          </div>
          <div className="rounded bg-white py-5 px-3 my-5">
            <Row gutter={24}>
              <Col span={12} key={1}>
                <Form.Item
                  name="delivery_note_provider"
                  label="Nhà cung cấp"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Nhà cung cấp"></Input>
                </Form.Item>
              </Col>
              <Col span={12} key={2}>
                <Form.Item
                  name="delivery_note_date"
                  label="Ngày nhập kho"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Ngày nhập kho"
                    format={dateFormat}
                    disabledDate={(current) => current.isAfter(moment())}
                  />
                </Form.Item>
              </Col>
              <Col span={12} key={3}>
                <Form.Item
                  name="delivery_note_staff"
                  label="Nhân viên kiểm hàng"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Tên nhân viên kiểm hàng" />
                </Form.Item>
              </Col>
              <Col span={12} key={4}>
                <Form.Item name="delivery_note_shipper" label="Người giao hàng">
                  <Input
                    className="rounded"
                    placeholder="Tên người giao hàng"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className="search-container flex flex-col md:flex-row justify-end items-center gap-x-4 gap-y-2 w-full">
            <div className="inline-block font-semibold md:mr-auto whitespace-nowrap text-lg">
              Danh sách sản phẩm
            </div>
            <Search
              className="min-w-min max-w-xs"
              name="search"
              placeholder="Tìm kiếm..."
              allowClear
              onSearch={(value) => {
                setKeyWord(value);
              }}
            />
            {/* button search */}
            <button
              className="flex items-center justify-center
                    bg-blue-500 h-8 w-fit p-2 text-white
                    md:mt-0 hover:bg-blue-600 shadow-lg rounded whitespace-nowrap"
              onClick={handleAddProductsLine}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Thêm sản phẩm
            </button>
          </div>
        </div>
        <NewDeliveryTable keyWord={keyWord} />
        <div className="flex justify-end w-full">
          <Button className="mx-3 mb-3" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>

      <ModalForm />
    </>
  );
};

export default NewDeliveryNotePage;
