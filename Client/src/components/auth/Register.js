import React from 'react';
import '../../assets/App.css';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Helmet} from 'react-helmet'

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      //retype: ''
      // username: '',
    };

    this.onChangeFullname = this.onChangeFullname.bind(this);
    // this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    //this.onChangeRetype = this.onChangeRetype.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeFullname(e) {
    this.setState({
      fullname: e.target.value
    });
  }

  // onChangeUsername(e) {
  //   this.setState({
  //     username: e.target.value
  //   });
  // }
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
  // onChangeRetype(e) {
  //   this.setState({
  //     retype: e.target.value
  //   });
  // }

  onSubmit(e) {

    e.preventDefault();

    const newUser = {
      fullname: this.state.fullname,
      // username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    if (!newUser.fullname || !newUser.email || !newUser.password) {
      alert('Invalid or Empty input(s)');
      console.log('Invalid Parameters');
    // } else if(this.state.password !== this.state.retype) {
    //   alert('Passwords do not match.');
    }
    else {

      axios.post('http://localhost:4000/users/register', newUser)
      .then(response =>{
        if(response.data.error){
          alert("User already exists");
        }
      })
      .catch(console.log("error"))

      console.log('New user registered!');
      window.location = '/login';
    }

    this.setState({
      fullname: '',
      //username: '',
      email: '',
      password: '',
      //retype: ''
    });
  }


  render() {
    return (
      <>
      {/* REACTJS HELMET */}
      <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Website Name / Join</title>
        </Helmet> 
        <div>
              <div className="centered">
              <a className="header-login" href="/landing"><h1 className="header-login">Website Name</h1></a>
              <big className="motto">A place for students to express and innovate</big>
              <div class="register-card">
              <br/>
              <Form onSubmit={this.onSubmit}>
                {/* <Form.Group controlId="formBasicUsername">
                  <TextField className="textfield-name" type="text" placeholder="Enter your Username" required value={this.state.username} onChange={this.onChangeUsername} id="outlined-basic" label="Username" variant="outlined" />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group> */}
                <Form.Group controlId="formBasicUsername">
                  <TextField className="textfield-name" type="text" placeholder="Enter your Full Name" required value={this.state.fullname} onChange={this.onChangeFullname} id="outlined-basic" label="Full Name" variant="outlined" />
                  {/* <Form.Control type="text" placeholder="Enter your full name" required value={this.state.fullname} onChange={this.onChangeFullname} /> */}
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <TextField className="textfield-email" type="email" required  placeholder="@gmit.ie, @nuig.ie. @gti.ie" value={this.state.email} onChange={this.onChangeEmail}  id="outlined-basic" label="Email Address" variant="outlined" />
                  {/* <Form.Control type="email" placeholder="@gmit.ie, @nuig.ie. @gti.ie"
                    value={this.state.email}
                    onChange={this.onChangeEmail} /> */}
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <TextField className="textfield-pw" type="password" required placeholder="Create a Password" value={this.state.password} onChange={this.onChangePassword} id="outlined-basic" label="Password" variant="outlined" />
                  {/* <Form.Control type="password" placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword} /> */}
                </Form.Group>
                <button className="register-btn" variant="primary" type="submit" >
                  Create Account
                </button>
                <span>
                  <hr /><br/>
                  <p>Already have an account?<a className="links2" href="/login"> Sign In.</a></p>
                </span>
              </Form>
            </div>
              </div>

              <footer className="footer">
                <div className="footer-items">
                    <div class="footer-column">
                      <a className="footer-links" href="/landing"><p>Our Website 2020</p></a>
                    </div>
                    <div class="footer-column">
                      <a className="footer-links" href="#"><p>Privacy</p></a>
                    </div>
                    <div class="footer-column">
                      <a className="footer-links" href="#"><p>Community Guidlines</p></a>
                    </div>
                    <div class="footer-column">
                      <a className="footer-links" href="/manifesto"><p>Manifesto</p></a>
                    </div>
                    <div class="footer-column">
                    <a className="footer-links" href="/contact"><p>Contact</p></a>
                    </div>
                </div>
              </footer>
          </div>
      </>
    );
  }
}

export default Register;
