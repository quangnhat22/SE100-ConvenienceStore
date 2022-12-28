import React, { useEffect } from "react";
import { object, string } from "yup";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { ErrorMessage, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as SagaActionTypes from "../../redux/constants/constant";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    let { email } = values;
    dispatch({
      type: SagaActionTypes.FORGOT_PASSWORD_SAGA,
      data: {
        email: email,
      },
    });
  };
  const RegisterValidation = object().shape({
    email: string().max(255).required("Vui lòng nhập email!"),
  });
  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col rounded-lg overflow-hidden border min-w-[500px] shadow-lg h-fit mt-40">
        <div className="flex justify-center items-center bg-blue-500 text-3xl font-bold text-white py-5">
          Quên mật khẩu
        </div>
        <Formik
          initialValues={{
            email: "",
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
            <form className="p-10" noValidate onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-2">
                <div className="text-gray-400 italic pb-5">
                  Vui lòng nhập địa chỉ email tài khoản của bạn!
                  <br />
                  Chúng tôi sẽ gửi liên kết thiết lập lại mật khẩu thông qua
                  email.
                </div>
                <div className="flex w-full rounded-xl overflow-hidden bg-slate-400">
                  <UserOutlined className="bg-blue-500 flex justify-center items-center text-xl p-3 text-white" />
                  <input
                    className="border w-full rounded-r-xl p-2"
                    type="text"
                    placeholder="Email"
                    required
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                {touched.email && errors.email && (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs px-10"
                  />
                )}
              </div>
              <button
                htmlType="submit"
                className="mt-10 w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm"
              >
                RESET PASSWORD
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
