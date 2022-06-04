/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./style.css";
import LoginForm from './loginForm';
import 'antd/dist/antd.min.css';
import Layout from '../../layouts/Layout';
import { useCookies } from "react-cookie";

function Login() {
  const [cookies] = useCookies(["userInfo"]);  
  // if(localStorage['user-info']!=null) {window.location.href = '/productList'}
  if (cookies.userInfo.role!=null){window.location.href = '/productList'}
  else{
    return (      
      <Layout>
        <Layout.Main>
          <div>
            <LoginForm />
          </div>  
        </Layout.Main>
      </Layout>
    )
  }
}
export default Login