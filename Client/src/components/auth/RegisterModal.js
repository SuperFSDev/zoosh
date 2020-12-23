import React from 'react';
import { TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form } from 'react-bootstrap';
import axios from 'axios';

class RegisterModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      time: new Date().getTime(),
      open: false
    };

    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
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
  onChangeTime(e) {
    this.setState({
      time: new Date().getTime(),
    });
  }

  onSubmit(e) {

    e.preventDefault();

    const newUser = {
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
      time: new Date().getTime(),

    };

    if (!newUser.fullname || !newUser.email || !newUser.password) {
      alert('Invalid or Empty input(s)');
      console.log('Invalid Parameters');
    } else {

      axios.post('http://localhost:4000/users/register', newUser)
        .then()
        .catch(console.log("error"))

      console.log('New user registered!');
      window.location = '/login';
    }

    this.setState({
      fullname: '',
      email: '',
      password: '',
      time: new Date().getTime(),
      open: false
    });
  }

  handleClickOpen(e) {
    this.setState({
      open: true
    });
  }

  handleClose (e) {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div>
        <p className="create-account">New to our site?<a onClick={this.handleClickOpen} className="links2"> Join Now</a></p>
        <Dialog className="login-modal" open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Let's get Started</DialogTitle>
          <DialogContent>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicUsername">
                <TextField className="textfield-name" type="text" required id="outlined-basic" label="Name" variant="outlined"
                  required value={this.state.fullname} onChange={this.onChangeFullname} />
                {/* <Form.Control type="text" placeholder="Enter your full name" required value={this.state.fullname} onChange={this.onChangeFullname} /> */}
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <TextField className="textfield-email" type="email" required placeholder="@gmit.ie, @nuig.ie. @gti.ie" id="outlined-basic" label="Email Address" variant="outlined"
                  value={this.state.email} onChange={this.onChangeEmail} />
                {/* <Form.Control type="email" placeholder="@gmit.ie, @nuig.ie. @gti.ie"
                    value={this.state.email}
                    onChange={this.onChangeEmail} /> */}
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <TextField className="textfield-pw" type="password" required placeholder="Create a Password" id="outlined-basic" label="Password" variant="outlined"
                  value={this.state.password} onChange={this.onChangePassword} />
                {/* <Form.Control type="password" placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword} /> */}
              </Form.Group>
              <button className="register-btn" variant="primary" type="submit" >
                Create Account
                </button>
            </Form>

          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default RegisterModal;