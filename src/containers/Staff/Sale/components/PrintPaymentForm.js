import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Divider,
  Table,
} from "antd";
import React from "react";
import "./style/CustomInputNumber.css";
import moment from "moment";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";

const PrintPaymentForm = ({ data }) => {
  const [form] = Form.useForm();
  console.log(data);
  const totalPrice = (cartItems) => {
    if (cartItems) {
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].quantity * cartItems[i].price;
      }
      return total;
    }
  };
  console.log(new Date());

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: ["productItem", "id"],
      key: "id",
    },
    {
      title: "Sản phẩm",
      dataIndex: ["productItem", "product", "title"],
      key: "title",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record, index) => {
        return (
          <div>
            {record.quantity
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        );
      },
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => {
        return (
          <div>
            {record.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            <sup>đ</sup>
          </div>
        );
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (text, record, index) => {
        return (
          <div>
            {(record.price * record.quantity)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            <sup>đ</sup>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-5">
      <Row gutter={24}>
        <Col span={24}>
          <Divider>
            <b className="sm:text-2xl">Hoá đơn</b>
          </Divider>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 32 }}>
        <Col span={8}>
          <h3>Tên cửa hàng: Convenience Store</h3>
          <div>Người lập hoá đơn: {data.creator.fullname}</div>
        </Col>
        <Col span={8} offset={8}>
          <table>
            <tr>
              {/* <th>Mã hoá đơn # :</th> */}
              <td>
                <b>Mã hóa đơn: </b>
                {data.id}
              </td>
            </tr>
            <tr>
              {/* <th>Ngày lập: </th> */}
              <td>
                <b>Ngày lập: </b>
                {`${new Date().getHours()}:${new Date().getMinutes()} - ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}
              </td>
            </tr>
          </table>
        </Col>
      </Row>
      {/* 
      <Col style={{ marginTop: 48 }}>
        <div>
          Khách hàng: <strong>Khách vãng lai</strong>
        </div>
        <div>Ghi chú: </div>
      </Col> */}

      <Table
        className="mt-10"
        dataSource={data.invoiceDetails}
        pagination={false}
        columns={columns}
      ></Table>

      <Row style={{ marginTop: 48 }}>
        <Col span={8} offset={16}>
          <Row gutter={[16, 2]}>
            <Col className="text-end" span={12}>
              <b>Tổng tiền hàng:</b>
            </Col>
            <Col className="text-end" span={12}>
              {data.total
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            </Col>
            <Col className="text-end" span={12}>
              <i>(Tổng tiền hàng sau thuế GTGT)</i>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ marginTop: 48, textAlign: "left" }}>Ghi chú</Row>
    </div>
  );
};

export default PrintPaymentForm;
