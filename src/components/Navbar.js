import React from 'react';
import '../App.css';
import {Navbar, Nav, NavDropdown, Badge} from 'react-bootstrap';
import ProfileButton from '../components/Profile/ProfileButton'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BiHomeSmile} from 'react-icons/bi'
import {MdShowChart} from 'react-icons/md'
import {RiTeamLine,RiNotification2Line} from 'react-icons/ri'
import SearchBar from './Common/SearchBar'

export default function NavBar() {
  return (
    <div>
      <div id="top"></div>
      <Navbar>
        <Navbar.Brand className="header" href="/">Name</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link className="links" href="/"><BiHomeSmile className="-i-vector-img"/></Nav.Link>
        <Nav.Link className="links" href="/leaderboard"><RiNotification2Line className="-i-vector-img"/></Nav.Link>
        <div class="dropdown">
        <Nav.Link className="links"><RiTeamLine  className="-i-vector-img"/></Nav.Link>
          <div class="dropdown-content">
            <a  className="links-create" href="/create-a-society">Create a Society</a>
            <a  className="links-sub" href="/list-of-clubs-and-societies">Join a Club or Society</a><hr/>
            <a  className="links-sub-see-all" href="/list-of-clubs-and-societies">See All</a>
          </div>
        </div>
        {/* <NavDropdown style={{"color" : "#27FBBE"}} className="links" title="Clubs and Societies" id="nav-dropdown">
          <NavDropdown.Item className="-l-s-club-socs" eventKey="4.1" href="/"><br/><b>Fitness</b> <Badge className="new-badge" variant="primary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="-l-s-club-socs" eventKey="4.2" href="/"><br/><b>LGBTQ+</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="-l-s-club-socs" eventKey="4.3" href="/"><br/><b>Arts & Crafts</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Item className="-l-s-club-socs" eventKey="4.4" href="/"><br/><b>Computer Science</b> <Badge className="new-badge" variant="secondary"> New</Badge><br/><br/></NavDropdown.Item>
          <NavDropdown.Divider />   
          <NavDropdown.Item className="links-create" eventKey="4.5" href="/create-a-society">Create A Society</NavDropdown.Item>
          <NavDropdown.Item className="links-sub" eventKey="4.6" href="/join-a-club-or-society">Join a Club or Society</NavDropdown.Item>
          <NavDropdown.Divider />   
          <NavDropdown.Item className="links-sub" eventKey="4.7" href="/list-of-clubs-and-societies">See All</NavDropdown.Item>
        </NavDropdown> */}
        <Nav.Link className="links" href="/leaderboard"><MdShowChart className="-i-vector-img"/></Nav.Link>

        </Nav>
        <Navbar.Toggle />
        {/* <SearchBar/> */}
        <Navbar.Collapse className="justify-content-end">
        <ProfileButton/>
        </Navbar.Collapse>
      </Navbar>
      <hr/>
    </div>
  );
}