/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./index.css";
import AddProduct from './addForm';
import 'antd/dist/antd.min.css';

function ProductList() {
  if (localStorage['user-info'] == null) { window.location.href = '/login' }
  
  if(JSON.parse(localStorage['user-info']).role!==2) {window.location.href = '/productList'}

    return (
        <div>
          <AddProduct />
        </div>
      )
}
export default ProductList