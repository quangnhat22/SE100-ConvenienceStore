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
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { useHistory, useParams } from "react-router-dom";
import TableProducts from "../../Products/components/TableProducts";

const dateFormat = "DD/MM/YYYY";

const DeliveryNoteDetailPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [keyWord, setKeyWord] = useState("");
  const { deliveryNote, loading } = useSelector(
    (state) => state.deliveryNotesSlice
  );

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_DELIVERY_NOTES_ID_SAGA, id: id });
  }, []);

  const initialValues = {
    delivery_note_provider: deliveryNote.provider.name,
    delivery_note_date: moment(deliveryNote.date),
    delivery_note_staff: deliveryNote.creator.fullname,
    delivery_note_shipper: deliveryNote.shipper,
  };

  const handleExit = () => {
    history.goBack();
  };

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
      <div className="ml-3 mt-5 mr-3 mb-8">
        <div className="inline-block font-semibold md:mr-auto whitespace-nowrap text-2xl">
          Phiếu nhập hàng: {id}
        </div>
        <div className="rounded bg-white py-5 px-3 my-5">
          <Form name="add_delivery_note_form" initialValues={initialValues}>
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
                  <Input placeholder="Nhà cung cấp" disabled={true}></Input>
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
                    disabled={true}
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
                  <Input
                    placeholder="Tên nhân viên kiểm hàng"
                    disabled={true}
                  />
                </Form.Item>
              </Col>
              <Col span={12} key={4}>
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
            onSearch={(value) => {
              setKeyWord(value);
            }}
          />
          {/* button search */}
        </div>
      </div>
      <TableProducts keyWord={keyWord} data={deliveryNote.productItems} />
      <div className="flex justify-end w-full px-5">
        <Button
          className="rounded bg-red-500 opacity-90 text-white hover:opacity-100 shadow-md"
          size="large"
          type="primary"
          danger
          onClick={() => handleExit()}
        >
          Đóng
        </Button>
      </div>
    </>
  );
};

export default DeliveryNoteDetailPage;
