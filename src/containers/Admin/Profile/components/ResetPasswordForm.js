import { Form, Input } from "antd";
import React from "react";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { useDispatch } from "react-redux";
import { ErrorMessage, Formik } from "formik";
import { object, string, ref } from "yup";
import "./style/index.css";
import { LockOutlined, UnlockOutlined, UserOutlined } from "@ant-design/icons";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("value", localStorage.getItem("id"));
    let { repeatPassword } = values;
    dispatch({
      type: SagaActionTypes.POST_NEW_PASSWORD_SAGA,
      id: localStorage.getItem("id"),
      password: repeatPassword,
    });
  };
  const RegisterValidation = object().shape({
    newPassword: string()
      .min(8, "Phải có ít nhất 8 ký tự")
      .required("Vui lòng nhập mật khẩu mới"),
    repeatPassword: string()
      .required("Vui lòng nhập lại mật khẩu mới")
      .oneOf([ref("newPassword"), null], "Phải giống mật khẩu mới"),
  });
  return (
    <>
      <Formik
        initialValues={{
          newPassword: "",
          repeatPassword: "",
        }}
        validationSchema={RegisterValidation}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form className="mt-5" noValidate onSubmit={handleSubmit}>
            <div className="row flex justify-center items-center gap-x-2">
              <div>
                <UnlockOutlined />
              </div>
              <input
                className="h-10 rounded border p-2 w-[250px]"
                type="password"
                placeholder="Mật khẩu mới"
                required
                name="newPassword"
                value={values.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>

            {touched.newPassword && errors.newPassword && (
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-xs pl-12 pt-2 text-center"
              />
            )}
            <div className="row flex justify-center items-center gap-x-2 mt-5">
              <div className="icon">
                <LockOutlined />
              </div>
              <input
                className="h-10 rounded border p-2 w-[250px]"
                type="password"
                placeholder="Xác nhận lại mật khẩu"
                required
                name="repeatPassword"
                value={values.repeatPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>

            {touched.repeatPassword && errors.repeatPassword && (
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className="text-red-500 text-xs pl-12 pt-2 text-center"
              />
            )}
            <div className="flex justify-center items-center mt-10">
              <button
                className="rounded px-5 py-3 bg-blue-500 opacity-80 font-bold text-white hover:opacity-100"
                htmlType="submit"
              >
                Xác nhận
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
