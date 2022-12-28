import React from "react";
import ResetPasswordForm from "./components/ResetPasswordForm";
import "./style/index.css";

const ResetPasswordPage = () => {
  return (
    <div className="container-auth">
      <div className="container-form">
        <div className="wrapper">
          <div className="title">
            <span>Thay đổi mật khẩu</span>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
