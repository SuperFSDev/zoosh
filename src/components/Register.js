import React from 'react';
import '../App.css';
import {Nav, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterImg from '../images/register.png'
import { FaFacebookF } from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';

function Register() {
  return (
    <>
     <div className="container">
       <div id="divLeft"><img className="WebImage2" src={RegisterImg}/></div>
        <div id="divRight">
          <div class="register-card">
          <h1>Create an Account</h1>
          <Form>
          <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Create a Username" required/>
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
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Re-type Password</Form.Label>
              <Form.Control type="password" placeholder="Re-type Password" />
            </Form.Group>            
            <Button variant="primary" type="submit">
              Create Account
            </Button>
            <hr/>
            <button className="fb-login">Create with Facebook <FaFacebookF/></button>
              <div className="spacing"></div>
              <button className="google-login">Create with Google <FcGoogle/></button>
            <span>
            <hr/>
            <Nav.Link className="links2" href="/Login">Already have an account?</Nav.Link>
            </span>
          </Form>
        </div>
       </div>
      </div>
    </>
  );
}

export default Register;
