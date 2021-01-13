import React  from 'react';
import '../../assets/App.css';
import { Nav, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import RegisterModal from './RegisterModal'
import {Helmet} from 'react-helmet'

/*const [login, setLogin] = useState(false);
const [data, setData] = useState({});
const [picture, setPicture] = useState('');*/

const loginUser = async user => {
  try {
    const response = await axios.post('http://localhost:4000/users/login', {
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      platform: user.platform,
      societies: user.societies,
      pic: user.pic
    });
    if (response.data.error) {
      alert('Invalid email or password');
    } else if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
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
      password: '',
      platform: ''
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  // Set user platform once page loads.
  componentDidMount() {
    this.setState({platform: window.navigator.platform});
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
  onLogin(e) {
    e.preventDefault();

    //object to pass into login method
    const userDetails = {
      email: this.state.email,
      password: this.state.password,
      platform: this.state.platform
    }

    //pass in user object to login and if the response
    //passes validation in method, push user to home page
    loginUser(userDetails).then(response => {
      if (response) {
        window.location = '/';
      }
    })
      .catch(error => console.log(error));
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
                <title>Website Name / Sign In</title>
        </Helmet> 

       <div className="login-bg">
          {/* <div className="split left"> */}
          {/* <h1 className="header">Name</h1> */}

              <div className="centered">
              {/* <h1 className="welcome-intro">Join Student Communities today</h1> */}
              <a className="header-login" href="/landing"><h1 className="header-login">Website Name</h1></a>
              <big className="motto">A place for students to express and innovate</big>
              <div class="login-card">
              <Form onSubmit={this.onLogin}>
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
                  <p class="forgot-pw">New to our site? <a className="links2" href="/join">Join Now.</a></p>

                  {/* <RegisterModal/> */}
                </div>
              </Form>
            </div>
              {/* </div> */}
          </div>

          {/* <div className="split right">
              <div className="centered">
              <img className="welcome" src={LoginSVG} />
              </div>
          </div> */}

          <div className="mobile-login">
              <div className="centered">
              <div class="login-card">
              <Form onSubmit={this.onLogin}>
                <Form.Group controlId="formBasicEmail">
                  {/* <Form.Label>Email address</Form.Label> */}
                  <TextField type="email" placeholder="@gmit.ie, @nuig.ie, @gti.ie" value={this.state.email}  onChange={this.onChangeEmail} className="textfield-email" id="outlined-basic" label="Email Address" variant="outlined" />
                  {/* <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} /> */}
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  {/* <Form.Label>Password</Form.Label> */}
                  <TextField type="password" placeholder="Enter Password" value={this.state.password}  onChange={this.onChangePassword} className="textfield-pw" id="outlined-basic" label="Password" variant="outlined" />
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
                </div>
              </Form>
              </div>
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

export default Login;
