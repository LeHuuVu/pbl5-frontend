import React from 'react';
import Login from '../pages/login';
import Register from '../pages/register';
import ProductList from '../pages/product_list';
import SellingProductList from '../pages/seller/sellingProduct';
import SellingProductDetail from '../pages/seller/sellingProduct_detail';
import MenuAdmin from '../pages/admin/menu';
import Profile from '../pages/profile';
import Cart from '../pages/cart';
import ProductDetail from '../pages/product_detail';
import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProductList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product_detail/:id" element={<ProductDetail />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/sellingProduct" element={<SellingProductList />} />
          <Route path="/sellingProductDetail/:id" element={<SellingProductDetail />} />
          <Route path="/admin" element={<MenuAdmin />} />
        </Routes>
      </Router>
  )
}

export default App;