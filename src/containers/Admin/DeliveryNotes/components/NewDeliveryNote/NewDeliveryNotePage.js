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
  Space,
  Spin,
} from "antd";
import moment from "moment";
import Search from "antd/lib/input/Search";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewDeliveryTable from "./components/NewDeliveryTable";
import AddNewProduct from "./components/AddNewProduct";
import ModalForm from "../../../../../HOC/ModalForm";
import * as SagaActionTypes from "../../../../../redux/constants/constant";
import { modalActions } from "../../../../../redux/reducer/ModalReducer";
import { useHistory } from "react-router-dom";
import AlertCustom from "../../../../../common/Notification/Alert";

const dateFormat = "DD/MM/YYYY";

const NewDeliveryNotePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [keyWord, setKeyWord] = useState("");
  let { newDeliveryNote } = useSelector(
    (state) => state.editDeliveryNotesSlice
  );
  console.log(newDeliveryNote);
  const uid = localStorage.getItem("id");
  let { isCreateNewDeliveryNote } = useSelector(
    (state) => state.deliveryNotesSlice
  );
  let { provider, loading } = useSelector((state) => state.providerSlice);
  let staffSlice = useSelector((state) => state.staffsSlice);
  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_PROVIDER_BY_ID_SAGA,
      id: newDeliveryNote.providerId,
    });
    dispatch({ type: SagaActionTypes.GET_USER_BY_ID_SAGA, id: uid });
    if (newDeliveryNote.providerId == "-1") {
      history.push("/delivery_notes");
    }
  }, []);

  useEffect(() => {
    if (isCreateNewDeliveryNote) {
      history.push("/delivery_notes");
    }
  }, [isCreateNewDeliveryNote]);

  const initialValues = {
    delivery_note_provider: provider.name,
    delivery_note_date: moment(newDeliveryNote.date),
    delivery_note_staff: staffSlice.staff.fullname,
    delivery_note_shipper: newDeliveryNote.shipper,
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

  const handleSubmit = () => {
    if (newDeliveryNote.productItems.length !== 0) {
      dispatch({
        type: SagaActionTypes.POST_DELIVERY_NOTES_SAGA,
        newDeliveryNote: newDeliveryNote,
      });
    } else {
      AlertCustom({ type: "error", title: "Vui lòng thêm sản phẩm" });
    }
  };

  const handleAddProductToDeliveryNote = () => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <AddNewProduct />,
      })
    );
  };

  if (staffSlice.loading === true || loading === true) {
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
      <div className="ml-3 mt-5 mr-3 mb-8">
        <div className="inline-block font-semibold md:mr-auto whitespace-nowrap text-2xl">
          Tạo phiếu nhập hàng
        </div>
        <div className="rounded bg-white py-5 px-3 my-5">
          <Form name="add_delivery_note_form" initialValues={initialValues}>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col xs={24} sm={12} md={24} lg={12} key={1}>
                <Form.Item
                  name="delivery_note_provider"
                  label="Nhà cung cấp"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Nhà cung cấp" disabled={true}></Input>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12} key={2}>
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
                    disabled={true}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12} key={3}>
                <Form.Item
                  name="delivery_note_staff"
                  label="Nhân viên kiểm hàng"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="Tên nhân viên kiểm hàng"
                    disabled={true}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12} key={4}>
                <Form.Item name="delivery_note_shipper" label="Người giao hàng">
                  <Input
                    className="rounded"
                    placeholder="Tên người giao hàng"
                    disabled={true}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
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
            // onSearch={(value) => {
            //   setKeyWord(value);
            // }}
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
          {/* button search */}
          <button
            className="flex items-center justify-center
                    bg-blue-500 h-8 w-fit p-2 text-white
                    md:mt-0 hover:bg-blue-600 shadow-lg rounded whitespace-nowrap"
            onClick={handleAddProductToDeliveryNote}
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
      <NewDeliveryTable keyWord={keyWord} data={newDeliveryNote.productItems} />
      <div className="flex justify-end w-full">
        <Button
          className="rounded bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md mr-3 mb-3"
          size="large"
          type="primary"
          onClick={() => handleSubmit()}
        >
          Lưu
        </Button>
      </div>
      <ModalForm />
    </>
  );
};

export default NewDeliveryNotePage;
