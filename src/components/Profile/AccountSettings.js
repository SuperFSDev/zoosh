import React from 'react';
import '../../App.css';
import { Form } from 'react-bootstrap'
import axios from 'axios';

export default class AccountSettings extends React.Component {

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

    var user;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: this.user._id });

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
  async onChangePicture(e) {
    var pic = e.target.files[0];
    var src = URL.createObjectURL(pic);

    //alert(src);
    //alert(pic);    
    var b64 = await this.imageToB64(src);

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
    var pp = this.checkDetails(this.state.profilePic, this.state.user.pic);

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
        <img height="100" width="100" src={this.state.picSrc}/>
      );
    } else {
      return (
        <p></p>
      );
    }
  }

  imageToB64(imgUrl) {
    return new Promise(resolve =>{   
      var img = new Image();
      img.crossOrigin = 'Anonymous';

      img.onload = function() {

        img.height = img.naturalHeight / 4;
        img.width = img.naturalWidth / 4;
        
        var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');
      
        canvas.height = img.height;
        canvas.width = img.width;

        ctx.drawImage(img, 0, 0, parseInt(img.width), parseInt(img.height));

        var uri = canvas.toDataURL('image/png'),
          b64 = uri.replace(/^data:image.+;base64,/, '');
        resolve(b64);
      };
      img.src = imgUrl;
    })
  }


    render(){
      return (
        <div>
            <div className="containerAccountSettingsMiddle">
              <h1><p><ProfileUsername/></p></h1>
                <div className="settings-options-item">
                    <a href="/settings/profile" className="feed-option-redirects"><div className="option-container">
                        Profile
                    </div></a>
                    <a href="/settings/account" className="feed-option-redirects"><div className="option-container">
                        Account
                    </div></a>
                    <a href="/settings/notifications" className="feed-option-redirects"><div className="option-container">
                        Notifications
                    </div></a>
                </div>
            </div>

            <div className="containerAccountSettingsRight">
                <div>
                    {this.picPreview()}
                    <Form className="edit-profile-form" onSubmit={this.onSubmit}>
                        <Form.Group controlId="profilePic">
                            <Form.Label>Update Profile Picture</Form.Label>
                            <Form.Control type="file" placeholder="Profile Pic" onChange={this.onChangePicture}/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Change Name</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" value={this.state.fullname} onChange={this.onChangeFullname}/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
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
                        <button className="settings-btn-save" variant="secondary" type="submit" >
                            Save changes
                        </button>
                        <button className="settings-btn-cancel" variant="primary" type="submit" >
                            Cancel
                        </button>
                        </Form>
                </div>
              
            </div>
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

function ProfileUsername() {
    var user = JSON.parse(localStorage.getItem('user'));
    if(user)
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
