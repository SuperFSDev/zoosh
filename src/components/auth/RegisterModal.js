import React from 'react';
import {Button, TextField} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Nav, Form } from 'react-bootstrap';

export default function RegisterModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p className="create-account">New to our site?<a onClick={handleClickOpen} className="links2"> Join Now</a></p>
      <Dialog className="login-modal" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create an Account</DialogTitle>
        <DialogContent>
        <Form>
                <Form.Group controlId="formBasicUsername">
                  <TextField className="textfield-name" type="text" placeholder="Enter your Full Name" required id="outlined-basic" label="Full Name" variant="outlined" />
                  {/* <Form.Control type="text" placeholder="Enter your full name" required value={this.state.fullname} onChange={this.onChangeFullname} /> */}
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <TextField className="textfield-email" type="email" required  placeholder="@gmit.ie, @nuig.ie. @gti.ie" id="outlined-basic" label="Email Address" variant="outlined" />
                  {/* <Form.Control type="email" placeholder="@gmit.ie, @nuig.ie. @gti.ie"
                    value={this.state.email}
                    onChange={this.onChangeEmail} /> */}
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <TextField className="textfield-pw" type="password" required placeholder="Create a Password" id="outlined-basic" label="Password" variant="outlined" />
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