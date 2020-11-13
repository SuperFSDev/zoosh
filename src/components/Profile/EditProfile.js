import React from 'react';
import {RiStarSmileLine} from 'react-icons/ri'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Nav, Form } from 'react-bootstrap';
import {BiEdit} from 'react-icons/bi'

export default function EditProfile() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    
  return (
    <div>
    <button className="edit-profile-btn" onClick={handleClickOpen}><BiEdit size={25}/></button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
      <DialogContent>
        <Form className="edit-profile-form">
              <Form.Group controlId="formName">
                <Form.Label>Change Name</Form.Label>
                <Form.Control type="text" placeholder="Full Name"/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBio">
                <Form.Label>Change Bio</Form.Label>
                <Form.Control multiline type="email" placeholder="Start here"/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formNewPassword">
                <Form.Label>Change Password</Form.Label>
                <Form.Control type="password" placeholder="New Password"/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formConformPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password"/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Button variant="secondary" type="submit" >
                Save changes
              </Button>
              <Button variant="primary" type="submit" >
                Cancel
              </Button>
            </Form>
      </DialogContent>
    </Dialog>
  </div>
  );
}