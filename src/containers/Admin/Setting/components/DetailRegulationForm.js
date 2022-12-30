import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Upload,
  Space,
} from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { Colorpicker } from "antd-colorpicker";
import { useDispatch } from "react-redux";
import { regulationActions } from "../../../../redux/reducer/RegulationSlice";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import moment from "moment";
import Swal from "sweetalert2";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const DetailRegulationForm = ({ productItemQuantity }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [isColorChange, setIsColorChange] = useState(false);

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
  const handleClose = () => {
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };

  const onFinish = (values) => {
    let { stateName, minVal, maxVal, color } = values;
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
        color: isColorChange ? color.hex : color,
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
      }}
    >
      <Form.Item
        name="stateName"
        label="Tên trạng thái"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên trạng thái" disabled={componentDisabled} />
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
        <Colorpicker
          onChange={() => {
            setIsColorChange(true);
          }}
        />
      </Form.Item>
      {enableModify === false ? (
        <Space className="flex justify-end">
          <Button
            className="rounded bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
            type="primary"
            size="large"
            onClick={() => handleEnableModify()}
          >
            Chỉnh sửa
          </Button>
          <Button
            className="rounded bg-red-500 opacity-90 text-white hover:opacity-100 shadow-md"
            size="large"
            type="primary"
            danger
            onClick={() => handleClose()}
          >
            Đóng
          </Button>
        </Space>
      ) : (
        <Space className="flex justify-end">
          <Button
            className="rounded bg-red-500 opacity-90 text-white hover:opacity-100 shadow-md"
            size="large"
            type="primary"
            danger
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button
            className="rounded bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
            size="large"
            type="primary"
            htmlType="submit"
          >
            Lưu
          </Button>
        </Space>
      )}
    </FormCustomed>
  );
};
export default DetailRegulationForm;
