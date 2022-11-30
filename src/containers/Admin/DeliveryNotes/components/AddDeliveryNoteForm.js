import React, { useState } from "react";
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
import FormCustomed from "../../../../common/Form/FormCustomed";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import Swal from "sweetalert2";
import * as SagaActionTypes from "../../../../redux/constants/constant";
const dateFormat = "DD/MM/YYYY";
const { Option } = Select;

const AddDeliveryNoteForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    // dispatch ({type: SagaActionTypes.POST_PRODUCTS_SAGA, values});
  };

  return (
    <FormCustomed
      name="add_delivery_note_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        delivery_note_date: moment(),
      }}
    >
      {/* <Form.Item
        label="Mã dòng sản phẩm"
        name="maDongSanPham"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Mã dòng sản phẩm" />
      </Form.Item> */}
      <Form.Item
        name="delivery_note_provider"
        label="Nhà cung cấp"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Nhà cung cấp"
          allowClear
          // options={options}
        ></Select>
      </Form.Item>
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
          disabled={true}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 20,
          offset: 20,
        }}
      >
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default AddDeliveryNoteForm;
