import React from 'react';
import '../App.css';
import {Nav, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSVG from '../images/login.png'


function Login() {
  return (
    <>
    <div className="container">
      <div id="divLeft"><img className="WebImage2" src={LoginSVG}/></div>
      <div id="divRight">
        <div class="login-card">
            <h1>Sign In</h1>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Keep me signed in" />
              </Form.Group>
              <span>
              <Nav.Link className="links2" href="#"><p>Forgot Password?</p></Nav.Link>
              <Nav.Link className="links2" href="/Register">Create an Account?</Nav.Link>
              </span>
              

              <Button variant="primary" type="submit">
                Next
              </Button>
            </Form>
         </div>
        </div>
      </div>
    </>
  );
}

export default Login;
