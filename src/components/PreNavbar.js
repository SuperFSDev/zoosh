import React from 'react';
import '../App.css';
import {Navbar, Nav} from 'react-bootstrap';
import LoginModal from './auth/LoginModal'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PreNavbar() {
  return (
    <div>
      <Navbar>
        <Navbar.Brand className="header" href="/"></Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {/* <LoginModal/> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}