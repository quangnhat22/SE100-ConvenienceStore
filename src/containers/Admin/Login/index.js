import { UnlockOutlined, UserOutlined } from '@ant-design/icons'
import { Footer } from 'antd/lib/layout/layout'
import React from 'react'
import './index.css'

const LoginPage = () => {
  return (
    <div className="container-auth">
      <div className="container-form">
        <div className="wrapper">
          <div className="title">
            <span>Đăng nhập</span>
          </div>
          <form action="#">
            <div className="row">
              <div className="icon">
                <UserOutlined />
              </div>
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
                // onChange={handleChange}
                // value={input.username}
              />
            </div>
            <div className="row">
              <div className="icon">
                <UnlockOutlined />
              </div>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                // onChange={handleChange}
                // value={input.password}
              />
            </div>
            <div className="row button">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
      <Footer
        className="fixed  bottom-0 left-0 right-0 flex justify-center"
        style={{ textAlign: "center" }}
      >
        {/* <img
          src={require("../../../assets/img/Asset 2.png")}
          alt="icon footer"
          className="w-15 h-7"
        ></img> */}
      </Footer>
    </div>
  )
}

export default LoginPage