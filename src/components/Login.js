import React, { useState } from 'react';
import '../App.css';
import {Nav, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSVG from '../images/login.png'
import { FaFacebookF } from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';


function Login() {

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }
  
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
              <Button variant="primary" type="submit">
                Next
              </Button>
              <hr/>
              {/* <button className="fb-login"> */}
                  { !login && 
                    <FacebookLogin
                      className="fb-login"
                      appId="1177500526020242"
                      autoLoad={true}
                      fields="name,picture"
                      scope="public_profile,user_friends"
                      callback={responseFacebook}
                      icon="fa-facebook" />
                  }
                  { login &&
                    <Image src={picture} roundedCircle />
                  }
                 {/* <FaFacebookF/> */}
                {/* </button> */}
              <div className="spacing"></div>
              <button className="google-login">Login with Google <FcGoogle/></button>

              <div className="auth-options">
                <Nav.Link className="links2" href="/home"><p class="forgot-pw">Forgot Password?</p></Nav.Link>
                <Nav.Link className="links2" href="/Register"><p className="create-account">Create an Account?</p></Nav.Link>
              </div>   
            </Form>
         </div>
        </div>
      </div>
    </>
  );
}

export default Login;
