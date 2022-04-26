/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./style.css";
import LoginForm from './loginForm';
import 'antd/dist/antd.min.css';

function Login() {
  return (
    <div className="login-form">
      <LoginForm />
    </div>  
    )
}
export default Login