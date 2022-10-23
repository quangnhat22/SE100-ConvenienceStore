import React from "react";
// import LoginForm from "./containers/Admin/LoginPage/components/LoginForm";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import LoginForm from "./containers/Admin/LoginPage/components/LoginForm";
import ProductPage from "./containers/Admin/ManagementProducts/components/ProductPage";

function App() {
  return (
    <div className="App">
      {/* <LoginForm /> */}
      <ProductPage />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
