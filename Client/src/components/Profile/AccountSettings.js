import React from 'react';
import AvatarEditor from 'react-avatar-editor';
// import Dropzone from "react-dropzone";
import '../../assets/App.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { FcCheckmark } from "react-icons/fc";

export default class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      // Original user details stored in user variable.
      user: '',
      // Edit details
      picSrc: '',
      fullname: '',
      bio: '',
      college: '',
      course: '',
      dob: '',
      password: '',
      retype: '',
      updateUser: '',
      open: false,
      scaledImage: '',
      showEdited: false,
      scale: 1
    };

    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangeCollege = this.onChangeCollege.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRetype = this.onChangeRetype.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async componentDidMount() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: this.user._id });
    document.body.style.backgroundColor = "#FDFEFE";


    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: this.user._id
      }
    })
      .then((response) => {
        this.setState({ user: response.data.user });
      })
      .catch((error) => {
        console.log(error);
      });

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
  onChangeCollege(e) {
    this.setState({
      college: e.target.value
    });
  }
  onChangeCourse(e) {
    this.setState({
      course: e.target.value
    });
  }
  onChangeDob(e) {
    this.setState({
      dob: e.target.value
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
  // ===================================================================================

  onSubmit(e) {

    e.preventDefault();

    if (!(this.state.password === this.state.retype)) {
      alert("Passwords don't match!");
      return;
    }

    var fullname = this.checkDetails(this.state.fullname, this.state.user.fullname);
    var bio = this.checkDetails(this.state.bio, this.state.user.bio);
    var college = this.checkDetails(this.state.college, this.state.user.college);
    var course = this.checkDetails(this.state.course, this.state.user.course);
    var dob = this.checkDetails(this.state.dob, this.state.user.dob);
    var password = this.checkDetails(this.state.password, this.state.user.password);
    var pp = this.checkDetails(this.state.scaledImage, this.state.user.pic);

    const updateUser = {
      user_id: this.state.id,
      pic: pp,
      fullname: fullname,
      bio: bio,
      college: college,
      course: course,
      dob: dob,
      password: password
    };

    axios.post('http://localhost:4000/users/edit-user-profile', updateUser)
      .then()
      .catch(console.log("error"))


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
      college: '',
      course: '',
      dob: '',
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
      <div>
        <div className="settings-options-container">
          <ProfileUsername />
          <div className="">
            <a href="/settings/profile" className="feed-option-redirects"><div className="option-container">
              Profile
                    </div></a>
            <a href="/login" className="feed-option-redirects"><div className="option-container">
              Logout
                    </div></a>
          </div>
        </div>

        <div className="containerFeedMiddle">
          <div>
            {this.picPreview()}
            <image src={`data:image/png;base64,${this.scaledImg}`} />
            <Form className="edit-profile-form" onSubmit={this.onSubmit}>
              <div className="settings-container">    
                <h3>User Display</h3><br/>    
                <Form.Group controlId="formName">
                  <Form.Label>Change Name</Form.Label>
                  <Form.Control type="text" placeholder="Full Name" value={this.state.fullname} onChange={this.onChangeFullname} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="profilePic">
                  <Form.Label>Update Profile Picture</Form.Label>
                  <Form.Control type="file" placeholder="Profile Pic" onChange={this.onChangePicture} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
              </div><br/>
              <div className="settings-container">
                <h3>User Details</h3><br/>
                <Form.Group controlId="formBio">
                  <Form.Label>Change Bio</Form.Label>
                  <Form.Control multiline type="text" placeholder="Start here" value={this.state.bio} onChange={this.onChangeBio} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formCollege">
                  <Form.Label>Change College</Form.Label>
                  <Form.Control multiline type="text" placeholder="College..." value={this.state.college} onChange={this.onChangeCollege} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formCourse">
                  <Form.Label>Change College Course</Form.Label>
                  <Form.Control multiline type="text" placeholder="Course..." value={this.state.course} onChange={this.onChangeCourse} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formDob">
                  <Form.Label>Change Date of Birth</Form.Label>
                  <Form.Control multiline type="text" placeholder="DOB..." value={this.state.dob} onChange={this.onChangeDob} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
              </div><br/>
              <div className="settings-container">
                <h3>Social Media Links</h3><br/>          
                <Form.Group controlId="formNewPassword">
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control type="text" placeholder="URL" />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formConformPassword">
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control type="text" placeholder="URL"/>
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formConformPassword">
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control type="text" placeholder="URL"/>
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
              </div><br/>
              <div className="settings-container">
                <h3>Account Security</h3><br/>          
                <Form.Group controlId="formNewPassword">
                  <Form.Label>Change Password</Form.Label>
                  <Form.Control type="password" placeholder="New Password" value={this.state.password} onChange={this.onChangePassword} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formConformPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm Password" value={this.state.retype} onChange={this.onChangeRetype} />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
              </div><br/>
              
              <div>
                <button className="standard-button" variant="secondary" type="submit" >Save changes</button>
                <a href="/home"><button className="standard-button-cancel" variant="primary" type="button" >Cancel</button></a>
              </div>
              
            </Form>
          </div>

        </div>
      </div>
    );
  }
}

function ProfileUsername() {
  var user = JSON.parse(localStorage.getItem('user'));
  if (user)
    var fullname = user.fullname;
  var id = user._id;
  var societies = user.societies;

  return (
    <div id="social">
      <h4 className="settings-welcome">Hello, {fullname}.</h4>
      {/* {id} */}
    </div>
  );
}
