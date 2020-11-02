import React from 'react';
import '../App.css';
import {Navbar, Nav, NavDropdown, Badge} from 'react-bootstrap';
import ProfileButton from '../components/Profile/ProfileButton'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() {
  return (
    <div>
      <div id="top"></div>
      <Navbar>
        <Navbar.Brand className="header" href="/">Name</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link className="links" href="/feed">Feed</Nav.Link>
        <NavDropdown style={{"color" : "#27FBBE"}} className="links" title="Clubs and Societies" id="nav-dropdown">
          <NavDropdown.Item className="links-sub-python" eventKey="4.1" href="/"><br/><b>Fitness</b> <Badge className="new-badge" variant="primary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="links-sub-python" eventKey="4.2" href="/"><br/><b>LGBTQ+</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="links-sub-python" eventKey="4.3" href="/"><br/><b>Arts & Crafts</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="links-sub-python" eventKey="4.4" href="/"><br/><b>Computer Science</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Divider />   
          <NavDropdown.Item className="links-create" eventKey="4.5" href="/create-a-society">Create A Society</NavDropdown.Item>
          <NavDropdown.Item className="links-sub" eventKey="4.6" href="/list-of-clubs-and-societies">See All</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link className="links" href="/leaderboard">Leaderboard</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <ProfileButton/>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}