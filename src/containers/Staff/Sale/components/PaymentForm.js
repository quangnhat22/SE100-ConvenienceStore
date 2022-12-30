import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./style/CustomInputNumber.css";
import PrintPaymentForm from "./PrintPaymentForm";
import { Paper } from "@mui/material";
import ReactToPrint from "react-to-print";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { printInvoiceActions } from "../../../../redux/reducer/printInvoiceReducer";
import { cartActions } from "../../../../redux/reducer/CartReducer";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";

const totalPrice = (cartItems) => {
  if (cartItems) {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].quantity * cartItems[i].price;
    }
    return total;
  }
};

const PaymentForm = ({ data }) => {
  console.log(data);
  const { vat } = useSelector((state) => state.vatSlice);
  const uid = localStorage.getItem("id");
  const { staff } = useSelector((state) => state.staffsSlice);
  const { invoice } = useSelector((state) => state.printInvoiceSlice);
  console.log(invoice);

  const componentRef = useRef(null);
  const printComponentRef = useRef(null);
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
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const defaultValues = {
    store_name: "Convenience Store",
    bill_date: moment(),
    bill_creater: staff.fullname,
    bill_price: totalPrice(data),
    bill_tax: vat.val,
    bill_finalprice: Number.parseInt(
      (totalPrice(data) * (100 + vat.val)) / 100
    ),
    bill_customer_pay: 0,
    bill_customer_repay: 0,
  };
  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  useEffect(() => {
    if (invoice.id !== "-1") {
      printComponentRef.current.click();
    }
  }, [invoice]);

  const onFinish = (values) => {
    let newInvoice = {
      date: values.bill_date.toISOString(),
      userId: uid,
      total: values.bill_finalprice,
      details: data.map(function (item) {
        return {
          productItemId: item.id,
          price: item.price,
          quantity: item.quantity,
        };
      }),
    };
    //POST_INVOICES_SAGA
    console.log(newInvoice);
    dispatch({
      type: SagaActionTypes.POST_INVOICES_SAGA,
      newInvoice: newInvoice,
    });
  };

  const onChange = () => {
    form.setFieldsValue({
      bill_customer_repay:
        form.getFieldValue().bill_customer_pay -
        form.getFieldValue().bill_finalprice,
    });
  };

  const onAfterPrint = () => {
    dispatch(printInvoiceActions.removeInvoice());
    dispatch({ type: SagaActionTypes.GET_LIST_PRODUCT_SAGA });
    dispatch(cartActions.removeAllItem());

    console.log("In In In");
  };

  return (
    <>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 20,
        }}
        labelWrap
        className="PaymentForm my-4 sm:mx-8 mx-2 "
        form={form}
        onFinish={onFinish}
        initialValues={defaultValues}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="store_name"
          label="Tên cửa hàng"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Tên cửa hàng" disabled={true} />
        </Form.Item>
        <Form.Item
          name="bill_date"
          label="Ngày lập hóa đơn"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            placeholder="Ngày lập hóa đơn"
            format={dateFormat}
            disabled={true}
          />
        </Form.Item>
        <Form.Item
          name="bill_creater"
          label="Người lập hóa đơn"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Tên người lập hóa đơn" disabled={true} />
        </Form.Item>
        <Form.Item
          name="bill_price"
          label="Tổng tiền hàng"
          rules={[
            {
              required: true,
              type: "number",
              min: 1,
            },
          ]}
        >
          <InputNumber
            className="input-number-right"
            addonAfter={"VNĐ"}
            placeholder="Tổng giá"
            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            disabled={true}
          />
        </Form.Item>
        <Form.Item
          name="bill_tax"
          label="Thuế VAT"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            className="input-number-right"
            addonAfter={"%"}
            placeholder="Thuế VAT"
            disabled={true}
          />
        </Form.Item>
        <Form.Item
          name="bill_finalprice"
          label="Tiền sau thuế"
          rules={[
            {
              required: true,
              type: "number",
              min: 1,
            },
          ]}
        >
          <InputNumber
            className="input-number-right"
            addonAfter={"VNĐ"}
            placeholder="Tổng giá"
            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            disabled={true}
          />
        </Form.Item>
        <Form.Item
          name="bill_customer_pay"
          label="Tiền khách trả"
          rules={[
            {
              required: true,
              type: "number",
              min: Number.parseInt((totalPrice(data) * (100 + vat.val)) / 100),
            },
          ]}
        >
          <InputNumber
            className="input-number-right"
            addonAfter={"VNĐ"}
            min={0}
            placeholder="Tiền khách trả"
            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={() => onChange()}
          />
        </Form.Item>
        <Form.Item
          name="bill_customer_repay"
          label="Tiền trả lại cho khách"
          rules={[
            {
              required: true,
              type: "number",
            },
          ]}
        >
          <InputNumber
            className="input-number-right"
            addonAfter={"VNĐ"}
            placeholder="Tiền trả lại cho khách"
            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            disabled={true}
          />
        </Form.Item>
        <Form.Item name="bill_note" label="Ghi chú">
          <TextArea rows={2} placeholder="Ghi chú" />
        </Form.Item>
        <div className="block text-center">
          <Button htmlType="submit">Thanh toán</Button>
        </div>
        <div style={{ display: "none" }}>
          <ReactToPrint
            onAfterPrint={() => onAfterPrint()}
            trigger={() => (
              // <IconButton variant="text" size="large" color="info">
              //   <PrintIcon />
              // </IconButton>
              <Button className="mr-4" ref={printComponentRef}>
                Thanh toán
              </Button>
            )}
            content={() => {
              return componentRef.current;
            }}
          />
        </div>
      </Form>

      {/* printer template */}
      <div style={{ display: "none" }}>
        <Paper ref={componentRef}>
          <PrintPaymentForm data={invoice} />
        </Paper>
      </div>
    </>
  );
};
export default PaymentForm;
