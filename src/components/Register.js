import React from 'react';
import '../App.css';
import {Nav, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterImg from '../images/register.png'


function Register() {
  return (
    <>
     <div className="container">
       <div id="divLeft"><img className="WebImage2" src={RegisterImg}/></div>
        <div id="divRight">
          <div class="register-card">
          <h1>Register</h1>
          <Form>
          <Form.Group controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
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
            <span>
            <Nav.Link className="links2" href="/Login">Already have an account?</Nav.Link>
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

export default Register;
