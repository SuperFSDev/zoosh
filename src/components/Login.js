import React, { useState } from 'react';
import '../App.css';
import { Nav, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSVG from '../images/login.png'
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';
import Facebook from './Facebook';
import axios from 'axios';

/*const [login, setLogin] = useState(false);
const [data, setData] = useState({});
const [picture, setPicture] = useState('');*/

const loginUser = async user => {
  try {
    const response = await axios.post('http://localhost:4000/users/login', {
      username: user.username,
      email: user.email,
      password: user.password
    });
    //DEBUG
    //console.log(response);
    if (response.data.error) {
      alert('Invalid email or password');
    } else if (response.data) {
      localStorage.setItem('usertoken', response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //handle input of the email box
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  //handle input of the password box
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  //when button is pressed, set the state of user details
  //pass them into login and redirect to the homepage or display an error
  onSubmit(e) {
    e.preventDefault();

    //object to pass into login method
    const User = {
      email: this.state.email,
      password: this.state.password
    }
    //pass in user object to login and if the response
    //passes validation in method, push user to home page
    loginUser(User).then(response => {
      if (response) {
        window.location = '/';
      }
    })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <>
        <div className="container">
          <div id="divLeft"><img className="WebImage2" src={LoginSVG} /></div>
          <div id="divRight">
            <div class="login-card">
              <h1>Sign In</h1>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Keep me signed in" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Next
                </Button>
                <hr />
                {/* <button className="fb-login"> */}
                {/*!login &&
                  <FacebookLogin
                    className="fb-login"
                    appId="1177500526020242"
                    autoLoad={true}
                    fields="name,picture"
                    scope="public_profile,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook" />
                }
                {login &&
                  <Image src={picture} roundedCircle />
                }
                {/* <FaFacebookF/> */}
                {/* </button> */}
                <div className="spacing"></div>
                <Facebook/>
                <button className="google-login">Login with Google <FcGoogle /></button>

                <div className="auth-options">
                  <Nav.Link className="links2" href="/home"><p class="forgot-pw">Forgot Password?</p></Nav.Link>
                  <Nav.Link className="links2" href="/register"><p className="create-account">Create an Account?</p></Nav.Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
