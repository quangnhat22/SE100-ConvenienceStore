import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { object, string } from "yup";
import AlertCustom from "../../../common/Notification/Alert";
import * as SagaActionTypes from "../../../redux/constants/constant";
import "../style/index.css";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authSlice);

  const handleSubmit = (values) => {
    let { username, password } = values;
    dispatch({
      type: SagaActionTypes.LOGIN_WITH_EMAIL_PASSWORD_SAGA,
      data: {
        username: username,
        password: password,
      },
    });
  };

  useEffect(() => {
    if (isLoggedIn && localStorage.getItem("access_token") != null) {
      console.log(localStorage.getItem("role"));
      if (localStorage.getItem("role") === "MANAGER") {
        history.replace("/dash-board");
      }
      if (localStorage.getItem("role") === "EMPLOYEE") {
        history.replace("/sales");
      }
    }
  }, [isLoggedIn]);

  const RegisterValidation = object().shape({
    username: string()
      .max(255)
      .required("Vui lòng nhập tên đăng nhập")
      .email("Email không hợp lệ!"),
    password: string()
      .min(8, "Phải có ít nhất 8 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
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
                type="text"
                placeholder="Username"
                required
                name="username"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.username && errors.username && (
                <ErrorMessage
                  name="username"
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
                placeholder="Password"
                required
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.password && errors.password && (
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs pl-12 pt-2"
                />
              )}
            </div>
            <div className="text-blue-400 py-2 flex justify-center hover:text-blue-600 hover:italic cursor-pointer hover:drop-shadow-sm">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="row button mt-5 mb-10">
              <input type="submit" value="Login" />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
