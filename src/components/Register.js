import React from 'react';
import '../App.css';
import { Nav, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterImg from '../images/register.png'
import axios from 'axios';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      retype: ''
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRetype = this.onChangeRetype.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeRetype(e) {
    this.setState({
      retype: e.target.value
    });
  }

  onSubmit(e) {

    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    if (!newUser.username || !newUser.email || !newUser.password) {
      alert('Invalid or Empty input(s)');
      console.log('Invalid Parameters');
    } else if(this.state.password !== this.state.retype) {
      alert('Passwords do not match.');
    }
    else {

      axios.post('http://localhost:4000/users/register', newUser)
      .then()
      .catch(console.log("error"))

      console.log('New user registered!');
      window.location = '/login';
    }

    this.setState({
      username: '',
      email: '',
      password: '',
      retype: ''
    });
  }

  render() {
    return (
      <>
        <div className="container">
          <div id="divLeft"><img className="WebImage2" src={RegisterImg} /></div>
          <div id="divRight">
            <div class="register-card">
              <h1>Create an Account</h1>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Create a Username" required value={this.state.username} onChange={this.onChangeUsername} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onChangeEmail} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Re-type Password</Form.Label>
                  <Form.Control type="password" placeholder="Re-type Password" 
                  value={this.state.retype}
                  onChange={this.onChangeRetype}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Create Account
            </Button>
                <hr />
                <button className="fb-login">Create with Facebook <FaFacebookF /></button>
                <div className="spacing"></div>
                <button className="google-login">Create with Google <FcGoogle /></button>
                <span>
                  <hr />
                  <Nav.Link className="links2" href="/Login">Already have an account?</Nav.Link>
                </span>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
