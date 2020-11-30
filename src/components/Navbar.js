import React from 'react';
import '../App.css';
import {Navbar, Nav} from 'react-bootstrap';
// import ProfileButton from '../components/Profile/ProfileButton'
import 'bootstrap/dist/css/bootstrap.min.css';
import QuickCreate from '../components/Common/QuickCreate'
import { Dropdown} from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import {Modal} from 'react-bootstrap'
import Invite from '../components/Common/Invite'
import axios from 'axios';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: '',
        user: '',
        following:[],
        followers:[],
    };

}

  componentDidMount() {
      var user = JSON.parse(localStorage.getItem('user'));
      this.setState({ id: user._id });

      axios.get('http://localhost:4000/users/get-user-details', {
          params: {
              id: user._id
          }
      })
          .then((response) => {
              this.setState({ user: response.data.user,
                following: response.data.user.following,
                followers: response.data.user.followers,

              })
          })
          .catch((error) => {
              console.log(error);
          });
  }

render(){

  return (
      <div>
        <div id="top"></div>
        <Navbar className="navbar" fixed="top">
          <Nav className="mr-auto">
            <Navbar.Brand className="header" href="/home">Name</Navbar.Brand>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <div className="quick-create-option">
              <QuickCreate/>
            </div>           
            <div className="navbar-prof-btn">
              <div id="#battleBox">
                <Dropdown className="l-prof-btn-default">
                  <Dropdown.Toggle variant="secondary" >
                    <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"/>
                    <b className="user-score-prof-btn">{this.state.user.score}</b>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/me"  eventKey="1">Hello, {this.state.user.fullname} 😃</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item  eventKey="2">Notifications</Dropdown.Item>
                    <Dropdown.Item href="/connections"  eventKey="2">Following <b className="user-details-views">{this.state.following.length}</b></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/settings"  eventKey="3">Account Settings</Dropdown.Item>
                    <Dropdown.Item eventKey="4"><InviteFriend/></Dropdown.Item>
                    {/* <Dropdown.Item eventKey="5"><DarkMode/></Dropdown.Item> */}
                    <Dropdown.Divider />
                    <Dropdown.Item href="/login"  eventKey="6">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            {/* Mobile Profile Btn */}
            <div className="navbar-prof-btn-mobile">
              <div id="#battleBox">
                <Dropdown className="l-prof-btn-default-mobile">
                  <Dropdown.Toggle variant="none" >
                    <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"/>
                    <b className="user-score-prof-btn">{this.state.user.score}</b>
                  </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/me"  eventKey="1">Hello, {this.state.user.fullname} 😃</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/home"  eventKey="2">Home</Dropdown.Item>
                      <Dropdown.Item href="/forums" eventKey="3">Forums</Dropdown.Item>
                      <Dropdown.Item href="/events" eventKey="4">Events</Dropdown.Item>
                      <Dropdown.Item href="/communities" eventKey="5">Communities</Dropdown.Item>
                      <Dropdown.Item href="/leaderboard" eventKey="6">Leaderboards</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item  eventKey="7">Notifications</Dropdown.Item>
                      <Dropdown.Item href="/connections"  eventKey="8">Following <b className="user-details-views">{this.state.following.length}</b></Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/settings"  eventKey="9">Account Settings</Dropdown.Item>
                      <Dropdown.Item eventKey="10"><InviteFriend/></Dropdown.Item>
                      {/* <Dropdown.Item eventKey="5"><DarkMode/></Dropdown.Item> */}
                      <Dropdown.Divider />
                      <Dropdown.Item href="/login"  eventKey="6">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
              </div>
              </div>
          
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}



function InviteFriend() {
  const [modalShow, setModalShowText] = React.useState(false);


  return (
    <div>
            <p onClick={() => setModalShowText(true)}>Invite Friend</p>

            <InviteModal
                show={modalShow}
                onHide={() => setModalShowText(false)}
            />
    </div>
  );
}

function InviteModal(props) {


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Invite A Friend
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Invite/>
        </Modal.Body>
      </Modal>
    );
  }