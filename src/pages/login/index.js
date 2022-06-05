/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./style.css";
import LoginForm from './loginForm';
import 'antd/dist/antd.min.css';
// import { useCookies } from "react-cookie";

function Login() {
  // const [cookies] = useCookies(["userInfo"]);  
  if(localStorage['user-info']!=null && sessionStorage['user-info']!=null) {window.location.href = '/productList'}
  // if (cookies.userInfo!==undefined){window.location.href = '/productList'}
  else{
    return (
          <div>
            <LoginForm />
          </div> 
    )
  }
}
export default Login