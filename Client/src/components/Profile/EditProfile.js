import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form } from 'react-bootstrap';
import { BiEdit } from 'react-icons/bi'
import axios from 'axios';
// import { HashPassword, ComparePassword } from '../auth/HashPassword';

export default class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      // Original user details stored in user variable.
      user: '',
      // Edit details
      profilePic: '',
      picSrc: '',
      fullname: '',
      bio: '',
      college: '',
      course: '',
      dob: '',
      password: '',
      retype: '',
      updateUser: '',
      open: false
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

    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: user._id });

    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id
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
  async onChangePicture(e) {
    var pic = e.target.files[0];
    var src = URL.createObjectURL(pic);
  
    var b64 = await this.imageToB64(src);
    alert(b64);

    this.setState({
      profilePic: b64,
      picSrc: src
    });
  }

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

    const updateUser = {
      user_id: this.state.id,
      pic: this.state.profilePic,
      fullname: fullname,
      bio: bio,
      college: college,
      course: course,
      dob: dob,
      password: password
    };

    alert(JSON.stringify(updateUser));

    axios.post('http://localhost:4000/users/edit-user-profile', updateUser)
      .then()
      .catch(console.log("error"))

    console.log('Updated user details.');
    window.location = '/profile';

    this.setState({
      id: '',
      user: '',
      fullname: '',
      bio: '',
      college: '',
      course: '',
      dob: '',
      password: '',
      retype: '',
      updateUser: '',
      open: false
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
    if(this.state.picSrc) {
      return (
        <img src={this.state.picSrc}/>
      );
    } else {
      return (
        <p>
          No Preview
        </p>
      );
    }
  }

  imageToB64(imgUrl) {
    return new Promise(resolve =>{   
      var img = new Image();
      img.crossOrigin = 'Anonymous';

      img.onload = function() {
        var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');
      
        canvas.height = img.naturalHeight / 4;
        canvas.width = img.naturalWidth / 4;
        ctx.drawImage(img, 0, 0);

        var uri = canvas.toDataURL('image/png'),
          b64 = uri.replace(/^data:image.+;base64,/, '');
        resolve(b64);
      };
      img.src = imgUrl;
    })
  }


  render() {
    return (
      <div>
        <a href="/settings"><button className="btn-leaderboard">Edit Profile</button></a>

        {/* <button className="edit-profile-btn" onClick={this.handleClickOpen}><BiEdit size={25} /></button> */}
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
          <DialogContent>
            <Form className="edit-profile-form" onSubmit={this.onSubmit}>

              <div className="container">
                <Form.Group controlId="formName">
                  <Form.Label>Change Name</Form.Label>
                  <Form.Control type="text" placeholder="Full Name" value={this.state.fullname} onChange={this.onChangeFullname}/>
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="profilePic">
                  <Form.Label>Update Profile Picture</Form.Label>
                  <Form.Control type="file" placeholder="Profile Pic" onChange={this.onChangePicture}/>
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
              </div>
              <Form.Group controlId="formBio">
                <Form.Label>Change Bio</Form.Label>
                <Form.Control multiline type="text" placeholder="Start here" value={this.state.bio} onChange={this.onChangeBio}/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formCollege">
                <Form.Label>Change College</Form.Label>
                <Form.Control multiline type="text" placeholder="College..." value={this.state.college} onChange={this.onChangeCollege}/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formCourse">
                <Form.Label>Change College Course</Form.Label>
                <Form.Control multiline type="text" placeholder="Course..." value={this.state.course} onChange={this.onChangeCourse}/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formDob">
                <Form.Label>Change Date of Birth</Form.Label>
                <Form.Control multiline type="text" placeholder="DOB..." value={this.state.dob} onChange={this.onChangeDob}/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formNewPassword">
                <Form.Label>Change Password</Form.Label>
                <Form.Control type="password" placeholder="New Password" value={this.state.password} onChange={this.onChangePassword}/>
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formConformPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" value={this.state.retype} onChange={this.onChangeRetype}/>
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

  /*constructor(props) {
    super(props);

    this.state = {
      picture: false,
      src: false
    }
  }

  handlePictureSelected(event) {
    var picture = event.target.files[0];
    var src     = URL.createObjectURL(picture);

    this.setState({
      picture: picture,
      src: src
    });
  }

  renderPreview() {
    if(this.state.src) {
      return (
        <img src={this.state.src}/>
      );
    } else {
      return (
        <p>
          No Preview
        </p>
      );
    }
  }

  upload() {
    var formData = new FormData();

    formData.append("file", this.state.picture);

    $.ajax({
      url: "/some/api/endpoint",
      method: "POST",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(response) {
        // Code to handle a succesful upload
      }
    });
  }

  render() {
    return (
      <div>
        <h5>Picture Uploader</h5>

        <input
          type="file"
          onChange={this.handlePictureSelected.bind(this)}
        />
        <br/>
        <div>
        {this.renderPreview()}
        </div>
        <hr/>
        <button
          onClick={this.upload.bind(this)}
        >
          Upload
        </button>
      </div>
    );
  }*/
}