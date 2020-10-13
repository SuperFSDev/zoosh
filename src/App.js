import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login.js'
import Home from './components/Home.js';


function App() {
  return (
    <div className="App">
      {/* <Home/> */}

      <Router>
        <Switch>
          <Route path="/"><Home/></Route>
          <Route path="/login"><Login/></Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
