import React, { useState } from 'react';
import '../../App.css';
import { Nav, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSVG from '../../images/welcome.png'
import { Card, Image } from 'react-bootstrap';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import RegisterModal from './RegisterModal'

/*const [login, setLogin] = useState(false);
const [data, setData] = useState({});
const [picture, setPicture] = useState('');*/

const loginUser = async user => {
  try {
    const response = await axios.post('http://localhost:4000/users/login', {
      fullname: user.fullname,
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
       <div>
          <div className="split left">
              <div className="centered">
              <Nav.Link href="/"><h1 className="header">Name</h1></Nav.Link>
                <img className="welcome" src={LoginSVG} />
              </div>
          </div>

          <div className="split right">
              <div className="centered">
              <div class="login-card">
              <Form  onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                  {/* <Form.Label>Email address</Form.Label> */}
                  <TextField type="email" placeholder="@gmit.ie, @nuig.ie, @gti.ie" value={this.state.email} onChange={this.onChangeEmail} className="textfield-email" id="outlined-basic" label="Email Address" variant="outlined" />
                  {/* <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} /> */}
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  {/* <Form.Label>Password</Form.Label> */}
                  <TextField type="password" placeholder="Enter Password" value={this.state.password} onChange={this.onChangePassword} className="textfield-pw" id="outlined-basic" label="Password" variant="outlined" />
                  {/* <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} /> */}
                </Form.Group>
                {/* <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Keep me signed in" />
                </Form.Group> */}
                <button className="login-btn" variant="primary" type="submit">
                  Log In
                </button>
                <hr />
                <div className="auth-options">
                  <Nav.Link className="links2" href="/home"><p class="forgot-pw">Forgot Password?</p></Nav.Link>
                  <RegisterModal/>
                </div>
              </Form>
            </div>
              </div>
          </div>
      </div>
      </>
    );
  }
}

export default Login;
