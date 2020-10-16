import React from 'react';
import '../App.css';
import {Nav, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSVG from '../images/login.png'
import axios from 'axios';

const login = user => {
    return axios.post('http://localhost:4000/users/login', {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password
    })
    .then(response => {
        //DEBUG
        //console.log(response);
        if(response.data.error){
            alert('Invalid email or password');
        }else if(response.data){
            localStorage.setItem('usertoken' , response.data);
            return response.data;
        }
    })
    .catch(error => {
        console.log(error);
    });
}

class Login extends React.Component {

   constructor(){
       super();
       this.state = {
           email: '',
           password:''
       }

       this.onChangeEmail = this.onChangeEmail.bind(this);
       this.onChangePassword = this.onChangePassword.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
   }

   //handle input of the email box
   onChangeEmail(e){
       this.setState({
           email: e.target.value
       });
   }
   //handle input of the password box
   onChangePassword(e){
       this.setState({
           password: e.target.value
       });
   }

   //when button is pressed, set the state of user details
   //pass them into login and redirect to the homepage or display an error
   onSubmit(e){
       e.preventDefault();

       //object to pass into login method
       const User = {
           email: this.state.email,
           password: this.state.password
       }
       //pass in user object to login and if the response
       //passes validation in method, push user to home page
       login(User).then(response => {
           if(response) {
               window.location = '/';
           }
       })
       .catch(error => console.log(error));
   }

  render(){
      return (
        <>
        <div className="container">
          <div id="divLeft"><img className="WebImage2" src={LoginSVG}/></div>
          <div id="divRight">
            <div class="login-card">
                <h1>Sign In</h1>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="formBasicEmail" onSubmit={this.onSubmit}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Keep me signed in" />
                  </Form.Group>
                  <span>
                  <Nav.Link className="links2" href="#"><p>Forgot Password?</p></Nav.Link>
                  <Nav.Link className="links2" href="/Register">Create an Account?</Nav.Link>
                  </span>


                  <Button variant="primary" type="submit">
                    Next
                  </Button>
                </Form>
             </div>
            </div>
          </div>
        </>
      );
  }
}

export default Login;
