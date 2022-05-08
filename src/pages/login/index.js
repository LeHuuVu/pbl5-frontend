/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./style.css";
import LoginForm from './loginForm';
import 'antd/dist/antd.min.css';

function Login() {
  
  if(localStorage['role']!=null) {window.location.href = '/viewproduct_detail'}
  else{
    return (
      <div>
        <LoginForm />
      </div>  
      )
  }
}
export default Login