import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, InputNumber, Upload } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { Colorpicker } from "antd-colorpicker";
import { useDispatch } from "react-redux";
import { regulationActions } from "../../../../redux/reducer/RegulationSlice";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import Swal from "sweetalert2";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const ProductLinesForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch ({type: SagaActionTypes.POST_PRODUCTS_SAGA, values});
  };
  //const initialValues = { color: { r: 26, g: 14, b: 85, a: 1 } };

  return (
    <FormCustomed name="add_product_form" form={form} onFinish={onFinish}>
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
        label="Tên dòng sản phẩm"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên dòng sản phẩm" />
      </Form.Item>
      {/* <Form.Item label="Mô tả" name="moTa">
        <TextArea rows={4} placeholder="Mô tả dòng sản phẩm" />
      </Form.Item> */}
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
export default ProductLinesForm;
