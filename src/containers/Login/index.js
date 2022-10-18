import React from 'react'
import LoginForm from './components/LoginForm'
import './style/index.css'

const LoginPage = () => {
  return (
    <div className="container-auth">
      <div className="container-form">
        <div className="wrapper">
          <div className="title">
            <span>Đăng nhập</span>
          </div>
          <LoginForm/>
        </div>
      </div>
      {/* <Footer
        className="fixed  bottom-0 left-0 right-0 flex justify-center"
        style={{ textAlign: "center" }}
      > */}
        {/* <img
          src={require("../../../assets/img/Asset 2.png")}
          alt="icon footer"
          className="w-15 h-7"
        ></img> */}
      {/* </Footer> */}
    </div>
  )
}

export default LoginPage