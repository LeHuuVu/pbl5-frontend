/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./index.css";
import SellingProductListForm from './sellingProducts';
import 'antd/dist/antd.min.css';
import Layout from '../../../layouts/Layout'

function ProductList() {
  if (localStorage['user-info'] == null) { window.location.href = '/login' }
  
    return (      
    <Layout>
      <Layout.Main>
        <div>
          <SellingProductListForm />
        </div>  
      </Layout.Main>
    </Layout>
      )
}
export default ProductList