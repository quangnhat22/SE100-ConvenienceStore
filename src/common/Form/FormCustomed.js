import { Form } from "antd";
import "./style/form.css";
const FormCustomed = (props) => {
  const validateMessages = {
    required: "Cần nhập ${label}!",
    types: {
      email: "${label} không hợp lệ!",
      number: "",
    },
    number: {
      min: "${label} phải ít nhất từ ${min} trở lên",
      range: "${label} phải trong khoảng từ ${min} đến ${max}",
    },
  };
  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 20,
      }}
      layout="horizontal"
      validateMessages={validateMessages}
      initialValues={props.initialValues}
      name={props.name}
      form={props.form}
      onFinish={props.onFinish}
      className="p-8"
    >
      {props.children}
    </Form>
  );
};
export default FormCustomed;
