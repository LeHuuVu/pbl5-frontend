import React, { Component } from 'react';
import Login from '../pages/login';
import { BrowserRouter as Router, Route } from "react-router-dom"

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/'><Login/></Route>
        </div>
      </Router>
    );
  }
}

export default App;