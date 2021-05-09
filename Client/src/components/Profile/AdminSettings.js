import React from 'react';
import AvatarEditor from 'react-avatar-editor';
// import Dropzone from "react-dropzone";
import '../../assets/App.css';
import { Form, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { FcCheckmark } from "react-icons/fc";

export default class AdminSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        id: '',
        user: '',

    };

    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);

  }

  async componentDidMount() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: this.user._id });


  }

  onChangeFullname(e) {
    this.setState({
      fullname: e.target.value
    });
  }
  onChangeBio(e) {
    this.setState({
      bio: e.target.value
    });
  }

    // AVATAR FUNCTIONS ==================================================================
  async onChangePicture(e) {
    var pic = e.target.files[0];
    if (pic)
      var src = URL.createObjectURL(pic);

    this.setState({
      picSrc: src
    });
  }

  onClickSave = () => {
    if (this.editor) {
      var scaledImg = this.editor.getImageScaledToCanvas();
      scaledImg = scaledImg.toDataURL('image/jpeg', 1);
      this.setState({ showEdited: true });
      this.setState({ scaledImage: scaledImg });
    }
  }

  handleScale = e => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  setEditorRef = editor => {
    if (editor) this.editor = editor;
  };

  handleDrop = acceptedFiles => {
    this.setState({ image: acceptedFiles[0] });
  };

  onSubmit(e) {

    e.preventDefault();

    if (!(this.state.password === this.state.retype)) {
      alert("Passwords don't match!");
      return;
    }

    var fullname = this.checkDetails(this.state.fullname, this.state.user.fullname);
    var bio = this.checkDetails(this.state.bio, this.state.user.bio);
    var username = this.checkDetails(this.state.username, this.state.user.username);
    var password = this.checkDetails(this.state.password, this.state.user.password);
    var pp = this.checkDetails(this.state.scaledImage, this.state.user.pic);

    const updateUser = {
      user_id: this.state.id,
      pic: pp,
      fullname: fullname,
      username: username,
      bio: bio,
      password: password
    };

    axios.post('http://localhost:4000/users/edit-user-profile', updateUser)
      .then()
      .catch(console.log("Error from route: http://localhost:4000/users/edit-user-profile"))


    this.user.pic = pp;
    localStorage.setItem('user', JSON.stringify(this.user));

    console.log('Updated user details.');
    window.location = '/me';

    // Reset state to undefined.
    this.setState({
      id: '',
      user: '',
      picSrc: '',
      fullname: '',
      bio: '',
      username: '',
      password: '',
      retype: '',
      updateUser: '',
      open: false,
      scaledImage: '',
      showEdited: false,
      scale: 1
    });
  }

  handleClickOpen(e) {
    this.setState({
      open: true
    });
  }

  handleClose(e) {
    this.setState({
      open: false
    });
  }

  checkDetails(x, y) {

    // If x is undefined ('') set x (edited value) to y (original value taken from database)
    x = (x === '') ? y : x;

    return x;
  }

  picPreview() {
    if (this.state.picSrc) {
      return (
        <>
          <AvatarEditor
            ref={this.setEditorRef}
            scale={this.state.scale}
            image={this.state.picSrc}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            rotate={0}
            borderRadius={200}
          />
          <div>
            Zoom:
            <input
              name="scale"
              type="range"
              onChange={this.handleScale}
              min={this.state.allowZoomOut ? "0.1" : "1"}
              max="2"
              step="0.01"
              defaultValue="1"
            />
            <button className="edit-pic-btn" onClick={this.onClickSave}><FcCheckmark /></button>
            {this.state.showEdited && <p className="edit-pic-txt">Edit Saved!</p>}
          </div>
        </>
      );
    }
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
