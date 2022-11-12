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
    </div>
  )
}

export default LoginPage