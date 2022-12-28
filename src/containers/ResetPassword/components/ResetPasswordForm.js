import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { object, string, ref } from "yup";
import AlertCustom from "../../../common/Notification/Alert";
import * as SagaActionTypes from "../../../redux/constants/constant";
import "../style/index.css";

const ResetPasswordForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  //   const { isLoggedIn } = useSelector((state) => state.authSlice);

  const handleSubmit = (values) => {
    // let { username, password } = values;
    // dispatch({
    //   type: SagaActionTypes.LOGIN_WITH_EMAIL_PASSWORD_SAGA,
    //   data: {
    //     username: username,
    //     password: password,
    //   },
    // });
  };

  //   useEffect(() => {
  //     if (isLoggedIn && localStorage.getItem("access_token") != null) {
  //       console.log(localStorage.getItem("role"));
  //       if (localStorage.getItem("role") === "MANAGER") {
  //         history.replace("/dash-board");
  //       }
  //       if (localStorage.getItem("role") === "EMPLOYEE") {
  //         history.replace("/sales");
  //       }
  //     }
  //   }, [isLoggedIn]);

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
                <UserOutlined />
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
                <UnlockOutlined />
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
