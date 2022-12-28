import { useMediaQuery } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import ResetPasswordForm from "./components/ResetPasswordForm";
import "./style/index.css";

const ResetPasswordPage = () => {
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  return (
    <div className="container-auth">
      <div className="container-form">
        <div className="wrapper">
          <div className="title">
            <span>Thay đổi mật khẩu</span>
          </div>
          <ResetPasswordForm token={query.get("token")} />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
