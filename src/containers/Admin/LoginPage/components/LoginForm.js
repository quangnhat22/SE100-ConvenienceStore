import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import "../styles/LoginForm.css";

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Email chưa đúng định dạng."
        )
        .required("Chưa nhập email."),
      password: Yup.string()
        .required("Chưa nhập mật khẩu.")
        .min(8, "Mật khẩu tối thiểu 8 kí tự."),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Form
      name="normal_login"
      className="login-form"
      onSubmit={formik.handleSubmit}
    >
      <h1>Quản lý</h1>
      <Form.Item className="input">
        <Input
          name="email"
          id="email"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="E-mail"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Form.Item>
      {formik.errors.email && <p className="errorMgs">{formik.errors.email}</p>}
      <Form.Item className="input">
        <Input
          name="password"
          id="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Form.Item>
      {formik.errors.password && (
        <p className="errorMgs">{formik.errors.password}</p>
      )}

      <Form.Item className="input">
        <a className="login-form-forgot" href="https://www.google.com/">
          Quên mật khẩu?
        </a>
        <br></br>
      </Form.Item>

      <Form.Item className="input">
        <Button
          name="login-button"
          type="submit"
          htmlType="submit"
          className="login-form-button"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}
export default LoginForm;
