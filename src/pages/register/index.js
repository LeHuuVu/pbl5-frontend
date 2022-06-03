/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./index.css";
import RegisterForm from './registerForm';
import 'antd/dist/antd.min.css';
import Layout from '../../layouts/Layout';
import { useCookies } from "react-cookie";

function Register() {
  const [cookies] = useCookies(["userInfo"]); 

  // if (localStorage['role'] != null) { window.location.href = '/productList' }
  if (cookies.userInfo.role!=null){window.location.href = '/productList'}
  else{
    return (
      <Layout>
        <Layout.Main>
          <div>
            <RegisterForm />
          </div>
        </Layout.Main>
      </Layout>
    )
  }
}
export default Register