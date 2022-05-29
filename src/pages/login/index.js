/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./style.css";
import LoginForm from './loginForm';
import 'antd/dist/antd.min.css';
import Layout from '../../layouts/Layout'

function Login() {
  
  if(localStorage['role']!=null) {window.location.href = '/product_detail'}
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