import React, { Component } from 'react';
import Login from '../pages/login';
import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

class App extends Component {

  render() {
    return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;