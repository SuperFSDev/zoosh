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
import Leaderboard from './components/Leaderboard';
import Facebook from './components/Facebook';
import Home from './components/Home.js';
import Python from './components/Tasks/Python';
import UI from './components/Tasks/DailyUi';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge'
import {SiPython} from 'react-icons/si'
import {AiOutlineBlock} from 'react-icons/ai'


function App() {
  
  return (
    <>
    <div className="App">
      <Router>
      <Navbar>
        <Navbar.Brand className="tasq" href="/">tasq</Navbar.Brand>
        <Nav className="mr-auto">
        <NavDropdown style={{"color" : "#27FBBE"}} className="links" title="Daily Problem" id="nav-dropdown">
          <NavDropdown.Item className="links-sub-python" eventKey="4.1" href="/python"><br/><SiPython/> <b>Python</b> <Badge className="new-badge" variant="primary"> New</Badge><br/><p>Start learning Python today!</p><br/></NavDropdown.Item>
          <NavDropdown.Item className="links-sub-ui" eventKey="4.2" href="/dailydesign"><br/><AiOutlineBlock/> <b>UI</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><p>Start improving your UI design today!</p><br/></NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item className="links-sub" eventKey="4.4" href="/daily">See All</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link className="links" href="/feed">Feed</Nav.Link>
        <Nav.Link className="links" href="/leaderboard">Leaderboard</Nav.Link>
        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
      </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
        <Nav.Link className="links" href="/login">Log In</Nav.Link>
        <Nav.Link className="sign-up-link" href="/register"> <button className="btn-profile">Join for Free</button></Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      <hr className="hr-nav"/>

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
          <Route path="/leaderboard">
            <Leaderboard/>
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

    <div className="App-mobile">
      <Navbar>
          <Navbar.Brand className="tasq" href="/">tasq</Navbar.Brand>
          <Nav className="mr-auto">
          {/* <Nav.Link className="links" href="/dailyProblems">Daily Problem</Nav.Link>
          <Nav.Link className="links" href="/feed">Feed</Nav.Link>
          <Nav.Link className="links" href="/leaderboards">Leaderboard</Nav.Link> */}
          {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" id="nav-collapse" >
          <NavDropdown title="&#x2630;" id="nav-dropdown">
            <Nav.Link className="links-mobile" href="/login">Profile</Nav.Link>
            <Nav.Link className="links-mobile" href="/daily">Daily</Nav.Link>
            <Nav.Link className="links-mobile" href="/feed">Feed</Nav.Link>
            <Nav.Link className="links-mobile" href="/leaderboard">Leaderboard</Nav.Link>
            <Nav.Link className="links-mobile" href="/news">News</Nav.Link>
            <NavDropdown.Divider />
            <Nav.Link className="links-mobile" href="/news">Log Out</Nav.Link>


            {/* <NavDropdown.Item eventKey="4.1">Profile</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">Daily</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Feed</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Leaderboard</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">News</NavDropdown.Item> */}
            {/* <NavDropdown.Item eventKey="4.4">Log Out</NavDropdown.Item> */}
          </NavDropdown>
        </Navbar.Collapse>
        </Navbar>
    </div>
    </>
  );
}

export default App;
