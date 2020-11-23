import React from 'react';
import '../App.css';
import {Navbar, Nav} from 'react-bootstrap';
import ProfileButton from '../components/Profile/ProfileButton'
import 'bootstrap/dist/css/bootstrap.min.css';
import QuickCreate from './Common/QuickCreate'
import {HiPencilAlt} from 'react-icons/hi'
import {IoMdNotificationsOutline} from 'react-icons/io'

export default function NavBar() {
  return (
    <div>
      <div id="top"></div>
      <Navbar className="navbar" fixed="top">
        <Navbar.Brand className="header" href="/">Name</Navbar.Brand>
        <Nav className="mr-auto">
        {/* <div className="search-div-navbar">
          <input className="searchbar-nav-navbar" type="text" id="mySearch" placeholder="Search for a User "/>
        </div> */}
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <QuickCreate/>
          <div className="navbar-prof-btn">
            <ProfileButton/>
          </div>
        
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}