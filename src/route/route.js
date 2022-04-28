import React, { Component } from 'react';
import Login from '../pages/login';
import Register from '../pages/register';
import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

class App extends Component {

  render() {
    return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;