import React from 'react';
import '../../assets/App.css';
import { Form, Row, Col, Container } from 'react-bootstrap';
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
      username: '',
    };

    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
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

  onSubmit(e) {

    e.preventDefault();

    const newUser = {
      fullname: this.state.fullname,
      username: this.state.username,
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
      username: '',
      email: '',
      password: '',
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
                <style>{'body { background: rgb(63,94,251); background: -moz-radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(104,208,254,1) 100%); background: -webkit-radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(104,208,254,1) 100%); background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(104,208,254,1) 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3f5efb",endColorstr="#68d0fe",GradientType=1); }'}</style>
                <title>Zoosh / Join</title>
        </Helmet> 
        <Container>
          <Row>
            <Col>
            <div>
              <div className="centered">
              <h1 className="header">Zoosh</h1>
              <div class="auth-card">
              <br/>
              <Form onSubmit={this.onSubmit}>
                {/* <Form.Group controlId="formBasicUsername">
                  <TextField className="textfield-name" type="text" placeholder="Enter your Username" required value={this.state.username} onChange={this.onChangeUsername} id="outlined-basic" label="Username" variant="outlined" />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group> */}
                <Form.Group controlId="formBasicUsername">
                  <TextField className="textfield-name" type="text" placeholder="Enter your Full Name" required value={this.state.fullname} onChange={this.onChangeFullname} id="outlined-basic" variant="outlined" />
                  {/* <Form.Control type="text" placeholder="Enter your full name" required value={this.state.fullname} onChange={this.onChangeFullname} /> */}
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <TextField className="textfield-name" type="text" placeholder="Create username" required value={this.state.username} onChange={this.onChangeUsername} id="outlined-basic"  variant="outlined" />
                  {/* <Form.Control type="text" placeholder="Enter your full name" required value={this.state.fullname} onChange={this.onChangeFullname} /> */}
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <TextField className="textfield-email" type="email" required  placeholder="Enter your email address" value={this.state.email} onChange={this.onChangeEmail}  id="outlined-basic" variant="outlined" />
                  {/* <Form.Control type="email" placeholder="@gmit.ie, @nuig.ie. @gti.ie"
                    value={this.state.email}
                    onChange={this.onChangeEmail} /> */}
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <TextField className="textfield-pw" type="password" required placeholder="Create a Password" value={this.state.password} onChange={this.onChangePassword} id="outlined-basic" variant="outlined" />
                  {/* <Form.Control type="password" placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword} /> */}
                </Form.Group>
                <button className="auth-button" variant="primary" type="submit" >
                  Create Account
                </button>
                <span>
                  <br/><br/>
                  <p style={{fontWeight:900}}>Already have an account? <a className="links2" href="/login">Log In.</a></p>
                </span>
              </Form>
            </div>
              </div>
              </div>
            
            </Col>
        	</Row>
        </Container>
      </>
    );
  }
}

export default Register;
