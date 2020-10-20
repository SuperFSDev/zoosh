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
        <Nav.Link className="links" href="/dailyProblems">Daily Problem</Nav.Link>
        <Nav.Link className="links" href="/feed">Feed</Nav.Link>
        <Nav.Link className="links" href="/leaderboards">Leaderboard</Nav.Link>
        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
      </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
        <Nav.Link className="links" href="/login">Log In</Nav.Link>
        <Nav.Link className="links" href="/register"> <button className="btn-profile">Sign Up</button></Nav.Link>
        {/* <Nav.Link className="links" href="/Login"> <button className="btn-profile"><RiShieldUserLine size={45} color={"navy"}/></button></Nav.Link> */}
        </Navbar.Collapse>
      </Navbar>

        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/feed">
            <Feed />
          </Route>
          <Route path="/dailyProblems">
            <Facebook />
          </Route>
          <Route path="/daily">
            <Daily />
          </Route>
          <Route path="/leaderboards">
            <Leaderboards />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/python">
            <Python />
          </Route>
          <Route path="/dailydesign">
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
