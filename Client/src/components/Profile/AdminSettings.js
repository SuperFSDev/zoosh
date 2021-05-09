import React from 'react';
import AvatarEditor from 'react-avatar-editor';
// import Dropzone from "react-dropzone";
import '../../assets/App.css';
import { Form, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { FcCheckmark } from "react-icons/fc";

export default class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  async componentDidMount() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: this.user._id });


  }

  onSubmit(e) {

  }


  render() {
    return (

      <Container>
        <Row>
          <Col>
          <div>
            <Form className="edit-profile-form" onSubmit={this.onSubmit}>
              <div className="settings-container">    
                <h3>Community Display Settings</h3><br/>    
                <Form.Group controlId="formName">
                  <Form.Label>Change Community Name</Form.Label>
                  <Form.Control type="text" placeholder="Name..."  />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBio">
                  <Form.Label>Change Description</Form.Label>
                  <Form.Control multiline type="text" placeholder="Description..."  />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="profilePic">
                  <Form.Label>Update Profile Picture</Form.Label>
                  <Form.Control type="file" placeholder="Profile Pic" />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                
              </div><br/>
              
              <div style={{textAlign:'center'}}>
                <button className="standard-button" variant="secondary" type="submit" >Save changes</button>
                <a href="/"><button className="settings-button-cancel" variant="primary" type="button" >Cancel</button></a>
              </div>
              
            </Form>
          </div>
          </Col>

        </Row>
      </Container>
    );
  }
}
