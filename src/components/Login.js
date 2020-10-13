import React from 'react';
import '../App.css';

import {Navbar, Nav} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  return (
    <>
        <h1>Welcome to Login</h1>
        <h1>Need an account?</h1>
        <Nav.Link className="links" href="/Register">Register</Nav.Link>
    </>
  );
}

export default Login;
