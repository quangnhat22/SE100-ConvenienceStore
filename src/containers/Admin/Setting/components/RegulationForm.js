import React from "react";
import { Form, Input, Button, InputNumber } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { Colorpicker } from "antd-colorpicker";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const RegulationForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    if (values.min > values.max) {
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        icon: "error",
        title: "Giá trị tối thiểu không được phép lớn hơn giá trị max",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      return;
    }

    let newRegulation = {
      stateName: values.stateName,
      minVal: values.minVal,
      maxVal: values.maxVal,
      color: values.color.hex,
    };
    dispatch({
      type: SagaActionTypes.POST_PRODUCT_ITEM_QUANTITY_RULE_SAGA,
      newProductItemQuantityState: newRegulation,
    });
  };
  //const initialValues = { color: { r: 26, g: 14, b: 85, a: 1 } };

  return (
    <FormCustomed name="add_product_form" form={form} onFinish={onFinish}>
      <Form.Item
        name="stateName"
        label="Tên trạng thái"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên trạng thái" />
      </Form.Item>
      <Form.Item
        name="minVal"
        label="Số lượng tối thiểu"
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
          placeholder="Số lượng tối thiểu"
        />
      </Form.Item>
      <Form.Item
        name="maxVal"
        label="Số lượng tối đa"
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
          placeholder="Số lượng tối đa"
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
        <Button
          className="rounded bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Lưu
        </Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default RegulationForm;
