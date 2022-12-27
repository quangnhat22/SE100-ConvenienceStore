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
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import Swal from "sweetalert2";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { editDeliveryNotesActions } from "../../../../redux/reducer/EditDeliveryNotesReducer";
import { useHistory } from "react-router-dom";

const dateFormat = "DD/MM/YYYY";

const AddDeliveryNoteForm = () => {
  const history = useHistory();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { providers } = useSelector((state) => state.providerSlice);
  const { staff } = useSelector((state) => state.staffsSlice);
  const options = providers.map(function (provider) {
    return { value: provider.id, label: `${provider.id} - ${provider.name}` };
  });

  const onFinish = (values) => {
    let newDeliveryNote = {
      providerId: values.delivery_note_provider,
      date: values.delivery_note_date.toISOString(),
      creatorId: staff.id,
      shipper: values.delivery_note_shipper,
      productItems: [],
    };
    console.log(newDeliveryNote);
    dispatch(editDeliveryNotesActions.getNewDeliveryNotes({ newDeliveryNote }));
    dispatch(modalActions.hideModal());
    history.push("/new-delivery-note/");
  };

  return (
    <FormCustomed
      name="add_delivery_note_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        delivery_note_date: moment(),
        delivery_note_shipper: "",
        delivery_note_staff: staff.fullname,
      }}
    >
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
          showSearch
          placeholder="Nhà cung cấp"
          allowClear
          options={options}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
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
          disabledDate={(current) => current.isAfter(moment())}
        />
      </Form.Item>
      <Form.Item
        name="delivery_note_staff"
        label="Nhân viên kiểm hàng"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên nhân viên kiểm hàng" disabled={true} />
      </Form.Item>
      <Form.Item name="delivery_note_shipper" label="Người giao hàng">
        <Input className="rounded" placeholder="Tên người giao hàng" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 30,
          offset: 21,
        }}
      >
        <Button htmlType="submit">Lưu</Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default AddDeliveryNoteForm;
