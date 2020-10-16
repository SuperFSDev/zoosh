import React from 'react';
import '../App.css';
import {Nav, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterImg from '../images/register.png'
import axios from 'axios';

/*const register = newUser => {
	return axios.post('http://localhost:4000/users/register', {
		first: newUser.firstname,
		last: newUser.lastname,
		email: newUser.email,
		password: newUser.password
	})
	.then(response => {
		if(!newUser.firstname || !newUser.lastname || !newUser.email || !newUser.password){
			alert('Invalid or Empty input(s)');
			console.log('Invalid Parameters');
		}else{
			console.log('New user registered!');
			window.location = '/login';
		}
	});
}*/

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password:''
        };

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeFirstname(e){
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastname(e){
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){

        e.preventDefault();

        const newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        };

        axios.post('http://localhost:4000/users/register', newUser)
        .then()
        .catch(console.log("error"))

        if(!newUser.firstname || !newUser.lastname || !newUser.email || !newUser.password){
          alert('Invalid or Empty input(s)');
          console.log('Invalid Parameters');
        }else{
            console.log('New user registered!');
            window.location = '/login';
        }

        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          password:''
        });
    }

  render(){
	  return (
		<>
		 <div className="container">
		  <div id="divLeft"><img className="WebImage2" src={RegisterImg}/></div>
			<div id="divRight">
			  <div class="register-card">
			  <h1>Register</h1>
			  <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name"
              value={this.state.firstname}
              onChange={this.onChangeFirstname}/>
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name"
              value={this.state.lastname}
              onChange={this.onChangeLastname}/>
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
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
            <span>
            <Nav.Link className="links2" href="/Login">Already have an account?</Nav.Link>
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

export default Register;
