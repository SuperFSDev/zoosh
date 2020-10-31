import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login.js';
import Register from './components/Register.js';
import Feed from './components/Feed';
import SocsList from './components/Socs/ListSocieties';
import Java from './components/Tasks/Java';
import Cpp from './components/Tasks/Cpp';
import Leaderboard from './components/Leaderboard';
import Facebook from './components/Facebook';
import Home from './components/Home.js';
import CreateSociety from './components/Socs/CreateASoc';
import Python from './components/Tasks/Python';
import UI from './components/Tasks/DailyUi';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge'
import LoginModal from '../src/components/LoginModal'

function App() {

  return (
    <>
      <Router>
      <Navbar>
        <Navbar.Brand className="header" href="/">Zoosh</Navbar.Brand>
        <Nav className="mr-auto">
        <NavDropdown style={{"color" : "#27FBBE"}} className="links" title="Clubs and Societies" id="nav-dropdown">
          <NavDropdown.Item className="links-sub-python" eventKey="4.1" href="/python"><br/><b>Fitness</b> <Badge className="new-badge" variant="primary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="links-sub-java" eventKey="4.2" href="/java"><br/><b>LGBTQ+</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="links-sub-C" eventKey="4.3" href="/cpp"><br/><b>Arts & Crafts</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="links-sub-ui" eventKey="4.4" href="/dailydesign"><br/><b>Computer Science</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item className="links-create" eventKey="4.5" href="/create-a-society">Create A Society</NavDropdown.Item>
          <NavDropdown.Item className="links-sub" eventKey="4.6" href="/list-of-clubs-and-societies">See All</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link className="links" href="/feed">Feed</Nav.Link>
        <Nav.Link className="links" href="/leaderboard">Leaderboard</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {/* <Navbar.Text className="Signed-in-as">
          Signed in as: <a href="#login">John Doe</a>
        </Navbar.Text> */}
        {/* <Nav.Link className="links" href="/login">Log In</Nav.Link> */}
        <LoginModal/>
        {/* <Nav.Link className="sign-up-link" href="/register"> <button className="btn-profile">Join for Free</button></Nav.Link> */}
        </Navbar.Collapse>
      </Navbar>
      {/* <hr className="hr-nav"/> */}

        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/java">
            <Java/>
          </Route>
          <Route path="/cpp">
            <Cpp/>
          </Route>
          <Route path="/feed">
            <Feed />
          </Route>
          <Route path="/dailyProblems">
            <Facebook />
          </Route>
          <Route path="/list-of-clubs-and-societies">
            <SocsList />
          </Route>
          <Route path="/create-a-society">
            <CreateSociety />
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
    </>
  );
}

export default App;
