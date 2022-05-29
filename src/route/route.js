import React, { Component } from 'react';
import Login from '../pages/login';
import Dashboad from '../pages/dashboad';
import Register from '../pages/register';
import ProductList from '../pages/product_list';
// import Profile from '../pages/profile';
import Cart from '../pages/cart';
import Product_detail from '../pages/product_detail';
import Product_info from '../pages/product_info';
import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

class App extends Component {

  render() {
    return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          {/* <Route path="/profile" element={<Profile/>}/> */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Dashboad/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/product_detail" element={<Product_detail/>}/>
          <Route path="/product_info" element={<Product_info/>}/>
          <Route path="/productList" element={<ProductList/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;