import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, InputNumber, Upload } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { Colorpicker } from "antd-colorpicker";
import { useDispatch } from "react-redux";
import { regulationActions } from "../../../../redux/reducer/RegulationSlice";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import moment from "moment";
import Swal from "sweetalert2";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const DetailRegulationForm = ({productItemQuantity}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);

  const handleEnableModify = () => {
    setEnableModify(true);
    setComponentDisabled(false);
  };
  const handleCancel = () => {
    setEnableModify(false);
    setComponentDisabled(true);
    onReset();
  };
  const onReset = () => {
    form.resetFields();
  };
  const handleModify = () => {};
  const handleClose = () => {
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };

  const onFinish = (values) => {
    let {stateName, minVal, maxVal, color} = values;
    if (minVal > maxVal) {
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        icon: "warning",
        title: "Giá trị tối thiểu không thể lớn hơn giá trị tối đa",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      return;
    }
    dispatch({
      type: SagaActionTypes.PUT_PRODUCT_ITEM_QUANTITY_RULE_SAGA,
      id: productItemQuantity.id,
      productItemQuantityState: {
        stateName, 
        minVal, 
        maxVal, 
        color: color["hex"]
      },
    });
  };

  return (
    <FormCustomed 
        name="add_product_form" 
        form={form} 
        onFinish={onFinish}
        initialValues={{
            stateName: productItemQuantity.stateName,
            minVal: productItemQuantity.minVal,
            maxVal: productItemQuantity.maxVal,
            color: productItemQuantity.color,
        }}>
      <Form.Item
        name="stateName"
        label="Tên trạng thái"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên trạng thái" disabled={componentDisabled}/>
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
          disabled={componentDisabled}
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
          disabled={componentDisabled}
        />
      </Form.Item>

      <Form.Item name="color" label={"Colorpicker"}>
        <Colorpicker />
      </Form.Item>

      {/* <Form.Item
        wrapperCol={{
          span: 20,
          offset: 20,
        }}
      >
        <Button htmlType="submit">Lưu</Button>
      </Form.Item> */}
      {enableModify === false ? (
        <Form.Item
          wrapperCol={{
            span: 26,
          }}
          style={{
            textAlign: "end",
          }}
        >
          <Button
            className="edit-reader-button mr-4"
            onClick={handleEnableModify}
          >
            Chỉnh sửa
          </Button>
          <Button onClick={handleClose}>Đóng</Button>
        </Form.Item>
      ) : (
        <Form.Item
          wrapperCol={{
            span: 26,
          }}
          style={{
            textAlign: "end",
          }}
        >
          <Button
            className="cancel-edit-reader-button mr-4"
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button onClick={handleModify} htmlType="submit">
            Lưu
          </Button>
        </Form.Item>)}
    </FormCustomed>
  );
};
export default DetailRegulationForm;
