import React, { useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber, Upload } from "antd";
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
          <Button htmlType="submit">Lưu</Button>
        </Form.Item>
      )}
    </FormCustomed>
  );
};
export default DetailExpiredDateForm;
