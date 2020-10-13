import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import Login from './components/Login.js'
import Register from './components/Register.js'
import Home from './components/Home.js';
import {Navbar, Nav} from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      {/* <Home/> */}

      <Router>
      <Navbar>
        <Navbar.Brand className="tasq" href="/">tasq</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link className="links" href="#home">Daily Problem</Nav.Link>
        <Nav.Link className="links" href="#home">Feed</Nav.Link>
        <Nav.Link className="links" href="#features">Leaderboard</Nav.Link>
        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
      </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
        <Nav.Link className="links" href="/Login"> <button className="btn-profile"><AiOutlineUser size={55}/></button></Nav.Link>
        </Navbar.Collapse>
      </Navbar>

        <Switch>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
   
    </Router>
    </div>

  );
}

export default App;
