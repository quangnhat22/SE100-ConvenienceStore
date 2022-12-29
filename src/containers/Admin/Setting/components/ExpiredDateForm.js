import React from "react";
import { Form, Input, Button, InputNumber } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { Colorpicker } from "antd-colorpicker";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const ExpiredDateForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    let newExpiredDate = {
      stateName: values.stateName,
      val: values.val,
      color: values.color.hex,
    };
    dispatch({
      type: SagaActionTypes.POST_PRODUCT_EXPIRE_SAGA,
      newProductItemExpireState: newExpiredDate,
    });
  };
  //const initialValues = { color: { r: 26, g: 14, b: 85, a: 1 } };

  return (
    <FormCustomed name="add_product_form" form={form} onFinish={onFinish}>
      <Form.Item
        name="stateName"
        label="Tên quy định"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên trạng thái" />
      </Form.Item>
      <Form.Item
        name="val"
        label="Giá trị"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          style={{
            width: "50%",
          }}
          placeholder="Giá trị"
        />
      </Form.Item>

      <Form.Item name="color" label={"Colorpicker"}>
        <Colorpicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 20,
          offset: 20,
        }}
      >
        <Button htmlType="submit">Lưu</Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default ExpiredDateForm;
