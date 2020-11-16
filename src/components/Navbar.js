import React from 'react';
import '../App.css';
import {Navbar, Nav, NavDropdown, DropdownButton,} from 'react-bootstrap';
import ProfileButton from '../components/Profile/ProfileButton'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BiHomeSmile} from 'react-icons/bi'
import {MdShowChart} from 'react-icons/md'
import {RiTeamLine,RiNotification2Line} from 'react-icons/ri'

export default function NavBar() {
  return (
    <div>
      <div id="top"></div>
      <Navbar>
        <Navbar.Brand className="header" href="/">Name</Navbar.Brand>
        <Nav className="mr-auto">
        <a className="links" href="/"><BiHomeSmile className="-i-vector-img"/> Home</a>
        <a className="links" href="/leaderboard"><RiNotification2Line className="-i-vector-img"/> Me</a>
        <a className="links"><div class="dropdown"> 
        <RiTeamLine  className="-i-vector-img" id="links"/> Clubs and Societies 
      
          <div class="dropdown-content">
            <a  className="links-create" href="/create-a-society">Create a Society</a>
            <a  className="links-sub" href="/list-of-clubs-and-societies">Join a Club or Society</a><hr/>
            <a  className="links-sub-see-all" href="/list-of-clubs-and-societies">See All</a>
          </div>
        </div></a>
        <a className="links" href="/leaderboard"><MdShowChart className="-i-vector-img"/> Community</a>

        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <ProfileButton/>
        </Navbar.Collapse>
      </Navbar>
      <hr/>
    </div>
  );
}