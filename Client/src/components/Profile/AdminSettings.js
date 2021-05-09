import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import '../../assets/App.css';
import { Form, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { FcCheckmark } from "react-icons/fc";

export default class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society_id: '',
      // Original society details stored in user variable.
      society: '',
      users: '', // List of society users
      // Edit details
      picSrc: '',
      name: '',
      description: '',
      open: false,
      scaledImage: '',
      showEdited: false,
      scale: 1
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  async componentDidMount() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: this.user._id });

    var soc_id = new URLSearchParams(document.location.search).get("id");
    this.setState({ society_id: soc_id }, () => {
      this.getSocietyDetails();
      this.getSocietyUsers();
    });    
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDesc(e) {
    this.setState({
      description: e.target.value
    });
  }
  
  async onChangePicture(e) {
    var pic = e.target.files[0];
    if (pic)
      var src = URL.createObjectURL(pic);

    this.setState({
      picSrc: src
    });
  }

  async getSocietyDetails() {
    await axios.get('http://localhost:4000/societies/get-societies-page', {
      params: { id: this.state.society_id }
    })
      .then((response) => {
        this.setState({
          society: response.data.society,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getSocietyUsers() {
    await axios.get('http://localhost:4000/societies/get-society-users', {
      params: { id: this.state.society_id }
    })
      .then((response) => {
        console.log(response)
        this.setState({ users: response.data.users })
      })
      .catch((error) => {
        console.log(error);
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

  onSubmit(e) {
    e.preventDefault();

    var name = this.checkDetails(this.state.name, this.state.society.name);
    var description = this.checkDetails(this.state.description, this.state.society.description);
    var picture = this.checkDetails(this.state.scaledImage, this.state.society.picture);

    const updateSociety = {
      id: this.state.society_id,
      society_pic: picture,
      name: name,
      description: description
    };

    alert(JSON.stringify(updateSociety));

    axios.post('http://localhost:4000/societies/edit-society', updateSociety)
      .then()
      .catch(console.log("Error from route: http://localhost:4000/societies/edit-society"))

    console.log('Updated user details.');
    window.location = '/c/?id=' + this.state.society_id;

    // Reset state to undefined.
    this.setState({
      society_id: '',
      society: '',
      users: '',
      picSrc: '',
      name: '',
      description: '',
      open: false,
      scaledImage: '',
      showEdited: false,
      scale: 1
    });
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
                  <Form.Control type="text" placeholder="Name..." value={this.state.name} onChange={this.onChangeName}/>
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBio">
                  <Form.Label>Change Description</Form.Label>
                  <Form.Control multiline type="text" placeholder="Description..." value={this.state.description} onChange={this.onChangeDesc}/>
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="profilePic">
                  <Form.Label>Update Profile Picture</Form.Label>
                  <Form.Control type="file" placeholder="Profile Pic" onChange={this.onChangePicture}/>
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
        {this.picPreview()}
        <image src={`data:image/png;base64,${this.scaledImg}`} />
      </Container>
    );
  }
}
