import React, { Component } from 'react';
import Login from '../pages/login';
import Register from '../pages/register';
import Profile from '../pages/profile';
import Cart from '../pages/cart';
import Viewproduct_detail from '../pages/viewproduct_detail';
import Viewproduct_info from '../pages/viewproduct_info';
import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

class App extends Component {

  render() {
    return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/viewproduct_detail" element={<Viewproduct_detail/>}/>
          <Route path="/viewproduct_info" element={<Viewproduct_info/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;