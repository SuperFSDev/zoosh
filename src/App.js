import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import Login from './components/Login.js';
import Register from './components/Register.js';
import Feed from './components/Feed';
import Daily from './components/Daily';
import Leaderboards from './components/Leaderboards';
import DailyProblems from './components/DailyProblems';
import Facebook from './components/Facebook';
import Home from './components/Home.js';
import Python from './components/Tasks/Python';
import UI from './components/Tasks/DailyUi';
import {Navbar, Nav} from 'react-bootstrap';
import { RiShieldUserLine } from 'react-icons/ri';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      {/* <Home/> */}

      <Router>
      <Navbar>
        <Navbar.Brand className="tasq" href="/">tasq</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link className="links" href="/DailyProblems">Daily Problem</Nav.Link>
        <Nav.Link className="links" href="/Feed">Feed</Nav.Link>
        <Nav.Link className="links" href="/Leaderboards">Leaderboard</Nav.Link>
        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
      </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
        <Nav.Link className="links" href="/Login">Log In</Nav.Link>
        <Nav.Link className="links" href="/Register"> <button className="btn-profile">Sign Up</button></Nav.Link>
        {/* <Nav.Link className="links" href="/Login"> <button className="btn-profile"><RiShieldUserLine size={45} color={"navy"}/></button></Nav.Link> */}
        </Navbar.Collapse>
      </Navbar>

        <Switch>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Feed">
            <Feed />
          </Route>
          <Route path="/DailyProblems">
            <Facebook />
          </Route>
          <Route path="/Daily">
            <Daily />
          </Route>
          <Route path="/Leaderboards">
            <Leaderboards />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Python">
            <Python />
          </Route>
          <Route path="/UI">
            <UI />
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
