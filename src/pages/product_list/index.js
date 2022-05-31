/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./index.css";
import ProductListForm from './products';
import 'antd/dist/antd.min.css';
import Layout from '../../layouts/Layout'

function ProductList() {
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
export default ProductList