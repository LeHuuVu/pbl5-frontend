/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./index.css";
import ProductListForm from './products';
import 'antd/dist/antd.min.css';
import Layout from '../../layouts/Layout'
import { useCookies } from "react-cookie";

function ProductList() {
  const [cookies] = useCookies(["userInfo"]);
  // if(JSON.parse(localStorage['user-info']).role==2) {window.location.href = '/sellingProduct'}
  // if(cookies.userInfo.role===0) {window.location.href = '/admin'}
  if (cookies.userInfo.role===2){window.location.href = '/sellingProduct'}
  else{
    return (      
    <Layout>
      <Layout.Main>
        <div>
          <ProductListForm />
        </div>  
      </Layout.Main>
    </Layout>
      )
  }
}
export default ProductList