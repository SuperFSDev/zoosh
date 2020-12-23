import React from 'react';
import '../../App.css';
import { Nav, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterImg from '../../images/registerVector.jpg'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      retype: ''
    };

    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRetype = this.onChangeRetype.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeFullname(e) {
    this.setState({
      fullname: e.target.value
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
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password
    };

    if (!newUser.fullname || !newUser.email || !newUser.password) {
      alert('Invalid or Empty input(s)');
      console.log('Invalid Parameters');
    } else if(this.state.password !== this.state.retype) {
      alert('Passwords do not match.');
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
      email: '',
      password: '',
      retype: ''
    });
  }


  render() {
    return (
      <>
        <div>
          <div className="split left">
              <div className="centered">
                <Nav.Link href="/"><h1 className="header">Name</h1></Nav.Link>
                <img className="intro" src={RegisterImg} alt="register"/>
              </div>
          </div>

          <div className="split right2">
              <div className="centered">
              <div class="register-card">
              <br/>
              <Form onSubmit={this.onSubmit}>
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
                  <hr />
                  <Nav.Link className="links2" href="/login">Already have an account?</Nav.Link>
                </span>
              </Form>
            </div>
              </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
