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
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const DetailExpiredDateForm = ({ productItemExpire }) => {
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
    let { stateName, val, color } = values;
    dispatch({
      type: SagaActionTypes.PUT_PRODUCT_EXPIRE_SAGA,
      id: productItemExpire.id,
      productItemQuantityState: {
        stateName,
        val,
        color: isColorChange ? color.hex : color,
      },
    });
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 300);
  };

  return (
    <FormCustomed
      form={form}
      onFinish={onFinish}
      initialValues={{
        stateName: productItemExpire.stateName,
        val: productItemExpire.val,
        color: productItemExpire.color,
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
export default DetailExpiredDateForm;
