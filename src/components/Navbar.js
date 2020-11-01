import React from 'react';
import '../App.css';
import {Navbar, Nav, NavDropdown, Badge} from 'react-bootstrap';
import LoginModal from './auth/LoginModal'
import ProfileButton from '../components/Profile/ProfileButton'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Cpp() {
  return (
    <div>
      <Navbar>
        <Navbar.Brand className="header" href="/">Name</Navbar.Brand>
        <Nav className="mr-auto">
        <NavDropdown style={{"color" : "#27FBBE"}} className="links" title="Clubs and Societies" id="nav-dropdown">
          <NavDropdown.Item className="links-sub-python" eventKey="4.1" href="/"><br/><b>Fitness</b> <Badge className="new-badge" variant="primary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="links-sub-java" eventKey="4.2" href="/"><br/><b>LGBTQ+</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="links-sub-C" eventKey="4.3" href="/"><br/><b>Arts & Crafts</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="links-sub-ui" eventKey="4.4" href="/"><br/><b>Computer Science</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
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
        <ProfileButton/>
        <LoginModal/>
        {/* <Nav.Link className="sign-up-link" href="/register"> <button className="btn-profile">Join for Free</button></Nav.Link> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}