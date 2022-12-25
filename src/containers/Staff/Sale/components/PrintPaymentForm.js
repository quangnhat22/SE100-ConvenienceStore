import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
    Row,
    Col,
    Divider,
    Table
  } from "antd";
import React from "react";
import "./style/CustomInputNumber.css";
import moment from "moment";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";

const PrintPaymentForm = ({data}) => {
const [form] = Form.useForm();
const totalPrice = (cartItems) => {
    if (cartItems) {
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].quantity * cartItems[i].price;
      }
      return total;
    }
  };

const defaultValues = {
    store_name: "Convenience Store",
    bill_date: moment(),
    bill_creater: "Quang Kotex",
    bill_price: totalPrice(data),
    bill_tax: 8,
    bill_finalprice: (totalPrice(data) * 108) / 100,
    bill_note: "",
  };

  return (
    <div className="p-5">
       <Row>
        <Col>
          <Divider>Hoá đơn</Divider>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 32 }}>
        <Col span={8}>
          <h3>Tên cửa hàng: Convenience Store</h3>
          <div>Người lập hoá đơn: ABC</div>
        </Col>
        <Col span={8} offset={8} >
          <table>
            <tr>
              <th>Mã hoá đơn # :</th>
              <td>1</td>
            </tr>
            <tr>
              <th>Ngày lập: </th>
              <td>
              {`${new Date().getHours()}:${new Date().getMinutes()} - ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}
              </td>
            </tr>
          </table>
        </Col>
      </Row>

      <Col style={{ marginTop: 48 }}>
        <div>Khách hàng: <strong>Khách vãng lai</strong></div>
        <div>Ghi chú: </div>
      </Col>

      <Row style={{ marginTop: 48 }}>
        <Table dataSource={[{
            id: 1,
            name: 'Accommodation (Single Occupancy)',
            description: 'Accommodation',
            price: 1599,
            quantity: 1
        }]}
        pagination={false}
        >
          <Table.Column title="Items" dataIndex='name' />
          <Table.Column title="Description" dataIndex='description' />
          <Table.Column title="Quantity" dataIndex='quantity' />
          <Table.Column title="Price" dataIndex='price' />
          <Table.Column title="Line Total" />
        </Table>
      </Row>

      <Row style={{ marginTop: 48 }}>
        <Col span={8} offset={16}>
          <table>
            <tr>
              <th>Tổng tiền hàng :</th>
              <td>Rs. 1599</td>
            </tr>
            <tr>
              <th>Thuế VAT :</th>
              <td>Rs. 95.94</td>
            </tr>
            <tr>
              <th>Tiền sau thuế :</th>
              <td>Rs. 95.94</td>
            </tr>
            <tr>
              <th>Tiền khách trả :</th>
              <td>Rs. 1790.88</td>
            </tr>
            <tr>
              <th>Tiền trả lại cho khách :</th>
              <td>Rs. 1790.88</td>
            </tr>
          </table>
        </Col>
      </Row>

      <Row style={{ marginTop: 48, textAlign: 'left' }}>
        Ghi chú
      </Row>
    </div>
  );
};

export default PrintPaymentForm;
