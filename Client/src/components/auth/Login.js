import React  from 'react';
import {  Form, Col, Row, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Helmet} from 'react-helmet'
import { Formik, ErrorMessage } from 'formik';

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
      <div className="login-bg">
      {/* REACTJS HELMET */}
      <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                {/* <style>{'body { background: rgb(63,94,251); background: -moz-radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(104,208,254,1) 100%); background: -webkit-radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(104,208,254,1) 100%); background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(104,208,254,1) 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3f5efb",endColorstr="#68d0fe",GradientType=1); }'}</style> */}
                <title>Zoosh / Log In</title>
        </Helmet> 
        <Container>
          <Row>
            <Col>
                <div className="centered">
                  <h1 className="header">zoosh</h1><br/>
                  <div class="auth-card">
                  <Formik>
                  {({ errors, touched }) => (
                  <Form onSubmit={this.onLogin}>
                    <Form.Group controlId="formBasicEmail">
                      <TextField type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.onChangeEmail} className="textfield-email" id="outlined-basic" variant="outlined" />
                      <ErrorMessage component="div" name="email" />
                      <Form.Text className="text-muted">
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <TextField type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} className="textfield-email" id="outlined-basic"  variant="outlined" />
                    </Form.Group>
                    <button className="auth-button" variant="primary" type="submit">
                      Log In
                    </button>
                    <div className="auth-options">                  
                    </div>
                  </Form>
                  )}
                  </Formik>
                  <br/>
                  <p style={{fontWeight:900}}>Want to join? <a className="links2" href="/join">Create an account.</a></p> 
                  </div>          
                </div>
            </Col>
          </Row>
        </Container>

          
      </div>
    );
  }
}

export default Login;
