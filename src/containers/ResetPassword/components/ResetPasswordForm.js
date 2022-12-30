import { UnlockOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { object, string, ref } from "yup";
import * as SagaActionTypes from "../../../redux/constants/constant";
import "../style/index.css";

const ResetPasswordForm = (props) => {
  console.log(props.token);
  const dispatch = useDispatch();
  //   const { isLoggedIn } = useSelector((state) => state.authSlice);

  const handleSubmit = (values) => {
    let { repeatPassword } = values;
    dispatch({
      type: SagaActionTypes.RESET_PASSWORD_SAGA,
      data: {
        token: props.token,
        password: repeatPassword,
      },
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
          <form noValidate onSubmit={handleSubmit}>
            <div className="row">
              <div className="icon">
                <UnlockOutlined />
              </div>
              <input
                type="password"
                placeholder="Mật khẩu mới"
                required
                name="newPassword"
                value={values.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.newPassword && errors.newPassword && (
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-xs pl-12 pt-2"
                />
              )}
            </div>
            <div className="row mt-10">
              <div className="icon">
                <LockOutlined />
              </div>
              <input
                type="password"
                placeholder="Xác nhận lại mật khẩu"
                required
                name="repeatPassword"
                value={values.repeatPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.repeatPassword && errors.repeatPassword && (
                <ErrorMessage
                  name="repeatPassword"
                  component="div"
                  className="text-red-500 text-xs pl-12 pt-2"
                />
              )}
            </div>
            <div className="row button mt-10 mb-10">
              <input type="submit" value="Xác nhận" />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
