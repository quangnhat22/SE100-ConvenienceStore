import React, { useState } from "react";
import { Form, Button, InputNumber } from "antd";
import FormCustomed from "../../../../common/Form/FormCustomed";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const OtherRegulationForm = ({ vat }) => {
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
    let { val } = values;
    dispatch({
      type: SagaActionTypes.PUT_VAT_SAGA,
      val: val,
    });
  };

  return (
    <FormCustomed
      form={form}
      onFinish={onFinish}
      initialValues={{
        id: vat.id,
        val: vat.val,
      }}
    >
      <Form.Item name="id" label="Mã quy định">
        <InputNumber
          disabled={true}
          style={{
            width: "50%",
          }}
          placeholder="Mã giá trị"
        />
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
          disabled={componentDisabled}
          style={{
            width: "50%",
          }}
          placeholder="Giá trị"
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
          <Button onClick={handleModify} htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      )}
    </FormCustomed>
  );
};
export default OtherRegulationForm;
