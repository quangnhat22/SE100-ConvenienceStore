import React, { useState } from "react";
import { Form, Button, InputNumber, Space } from "antd";
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
export default OtherRegulationForm;
