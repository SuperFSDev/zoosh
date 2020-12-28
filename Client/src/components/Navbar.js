import React from 'react';
import '../App.css';
import {Navbar, Nav} from 'react-bootstrap';
// import ProfileButton from '../components/Profile/ProfileButton'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton} from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import {Modal} from 'react-bootstrap'
import Invite from '../components/Common/Invite'
import axios from 'axios';
import {IoIosSquareOutline,IoIosNotificationsOutline} from 'react-icons/io'
import {FaBook,FaRegGem,FaRegLightbulb,FaRegLemon,FaRegHeart,FaRegCommentAlt,FaRegHandPeace, FaUserFriends} from 'react-icons/fa'
import {FiSettings} from 'react-icons/fi'


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
            <Navbar.Brand className="header" href="/home">Website Name</Navbar.Brand>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <div className="quick-create-option">
              <a href="/users" ><IoIosSquareOutline size={55} className="square" id="dropdown-basic"/></a>
              <IoIosNotificationsOutline size={55} className="notify" id="dropdown-basic"/>
            </div>           
            <div className="navbar-prof-btn">
              <div id="#battleBox">
                <Dropdown className="l-prof-btn-default" >
                  <Dropdown.Toggle id="dropdown-basic" >
                    <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"/>
                    {/* <b className="user-score-prof-btn">{this.state.user.score}</b> */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/me"  eventKey="1">Hello, {this.state.user.fullname} 😃</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item  eventKey="13"><FaRegLemon/> Score <b className="user-details-views">{this.state.user.score}</b></Dropdown.Item>
                    <Dropdown.Item href="/connections"  eventKey="2"><FaUserFriends/> Following <b className="user-details-views">{this.state.following.length}</b></Dropdown.Item>
                    <Dropdown.Divider />
                    
                    <Dropdown.Item href="/settings"  eventKey="3"><FiSettings/> Account Settings</Dropdown.Item>
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
                  <Dropdown.Toggle id="dropdown-basic">
                    <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"/>
                    <b className="user-score-prof-btn">{this.state.user.score}</b>
                  </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/me"  eventKey="1">Hello, {this.state.user.fullname} 😃</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/home"  eventKey="2">Home</Dropdown.Item>
                      <Dropdown.Item href="/forums" eventKey="3">Forums</Dropdown.Item>
                      <Dropdown.Item href="/events" eventKey="4">Events</Dropdown.Item>
                      <Dropdown.Item href="/podcasts" eventKey="5">Podcasts</Dropdown.Item>
                      <Dropdown.Item href="/communities" eventKey="6">Communities</Dropdown.Item>
                      <Dropdown.Item href="/leaderboard" eventKey="7">Leaderboards</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item  eventKey="8">Notifications</Dropdown.Item>
                      <Dropdown.Item href="/connections"  eventKey="9">Following <b className="user-details-views">{this.state.following.length}</b></Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/settings"  eventKey="10">Account Settings</Dropdown.Item>
                      <Dropdown.Item eventKey="11"><InviteFriend/></Dropdown.Item>
                      {/* <Dropdown.Item eventKey="5"><DarkMode/></Dropdown.Item> */}
                      <Dropdown.Divider />
                      <Dropdown.Item href="/login"  eventKey="12">Logout</Dropdown.Item>
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
            <Dropdown.Item onClick={() => setModalShowText(true)}><FaRegHandPeace/> Invite a Friend</Dropdown.Item>

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