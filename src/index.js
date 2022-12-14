import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import SettingPage from "./containers/Admin/Setting";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ConfigProvider locale={viVN}>
          <App />
          {/* <SettingPage /> */}
        </ConfigProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
