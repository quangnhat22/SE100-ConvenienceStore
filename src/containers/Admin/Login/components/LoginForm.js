import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { object, string } from "yup";
import AlertCustom from "../../../../common/Notification/Alert";
import "../style/index.css";

const LoginForm = () => {
  const history = useHistory();
  const handleSubmit = (values) => {
    let { username, password } = values;
    try {
      if (username === "superadmin" && password === "12345678") {
        localStorage.setItem("token", JSON.stringify(username));
        localStorage.setItem("role", JSON.stringify("superadmin"));
        AlertCustom({type: 'success',title: 'Đăng nhập thành công'})
        history.replace("/dash-board");
      } else {
        AlertCustom({type: 'error',title: 'Có cl nè, nhập cho đúng mật khẩu, tài khoản đi rồi hẳn nói chuyện :)'})
      }
    } catch (error) {
    }
  };

  const RegisterValidation = object().shape({
    username: string().max(255).required("Valid username required"),
    password: string().min(8, "Min 8").required("Valid password required"),
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
            <div className="row button mt-10 mb-10">
              <input type="submit" value="Login" />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
