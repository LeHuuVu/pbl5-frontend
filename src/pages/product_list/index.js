/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./index.css";
import ProductList from './productList';
import 'antd/dist/antd.min.css';
import Layout from '../../layouts/Layout'

function Login() {
  
  if(localStorage['role']!=null) {window.location.href = '/viewproduct_detail'}
  else{
    return (      
    <Layout>
      <Layout.Main>
        <div>
          <ProductList />
        </div>  
      </Layout.Main>
    </Layout>
      )
  }
}
export default Login