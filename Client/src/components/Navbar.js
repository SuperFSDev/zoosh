import React from 'react';
import '../assets/App.css';
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown} from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import {Modal, Image} from 'react-bootstrap'
import Invite from '../components/Common/Invite'
import axios from 'axios';
import {BsGear,BsBell,BsBookmarks,BsPeople,BsReplyAll,BsLightning} from 'react-icons/bs'
import Clap from '../images/clap.png'
import {RiShieldStarLine} from 'react-icons/ri'
import {MdSchool} from 'react-icons/md'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        id: '',
        user: '',
        following:[],
        followers:[],
        showMenu: false,
        showProfile: false,
        showForum: false,
        showContributions: false,
        user: '',
        searchValue: '',
        filterBy: '',
        users: [],
        discussions: [],

    };

      this.showMenu = this.showMenu.bind(this);
      this.showProfile = this.showProfile.bind(this);
      this.showForum = this.showForum.bind(this);
      this.showContributions = this.showContributions.bind(this);

      this.closeContributions = this.closeContributions.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
      this.closeProfile = this.closeProfile.bind(this);
      this.closeForum = this.closeForum.bind(this);

  }

  // NOTIFICATIONS MENU DROPDOWNS
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  // NOTIFICATIONS MENU DROPDOWNS
  showContributions(event) {
    event.preventDefault();
      
    this.setState({ showContributions: true }, () => {
      document.addEventListener('click', this.closeContributions);
    });
  }
  
  closeContributions(event) {
      
      if (!this.dropdownMenu5.contains(event.target)) {
        
        this.setState({ showContributions: false }, () => {
          document.removeEventListener('click', this.closeContributions);
        });  
        
      }
    }

    // FORUMS MENU DROPDOWNS
    showForum(event) {
      event.preventDefault();
      
      this.setState({ showForum: true }, () => {
        document.addEventListener('click', this.closeForum);
      });
    }
  
    closeForum(event) {
      
      if (!this.dropdownMenu4.contains(event.target)) {
        
        this.setState({ showForum: false }, () => {
          document.removeEventListener('click', this.closeForum);
        });  
        
      }
    }


  // USER PROFILE DROPDOWN
  showProfile(event) {
    event.preventDefault();
    
    this.setState({ showProfile: true }, () => {
      document.addEventListener('click', this.closeProfile);
    });
  }

  closeProfile(event) {
    
    if (!this.dropdownMenu3.contains(event.target)) {
      
      this.setState({ showProfile: false }, () => {
        document.removeEventListener('click', this.closeProfile);
      });  
      
    }
  }

  componentDidMount() {
      var user = JSON.parse(localStorage.getItem('user'));

      if(user == null)
        window.location = '/login';

      this.setState({ id: user._id });

      axios.get('http://localhost:4000/users/getUsers')
      .then((response)=>{
          this.setState({users: response.data.users})
      })
      .catch((error)=>{
          console.log(error);
      });

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

      axios.get('http://localhost:4000/discussions/getDiscussions')
        .then((response) => {
          this.setState({ discussions: response.data.discussions,
          isLoading: false, })
      })
      .catch((error) => {
        console.log(error);
      });
  }

render(){

  var{users} = this.state;
  var { discussions } = this.state;
  let i = 0;
  var size=3;
  var postSize = 2;
  var indents = [];


  for (var k = 0; k < 4; k++) {
    indents.push(users[1]);
  }

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
                <span className="notify" ><Image src={Clap} size={25} onClick={this.showContributions}/> {this.state.user.score}</span>
                <span className="notify" onClick={this.showForum}><BsLightning size={25}/>FORUM</span>
                <span className="notify" onClick={this.showMenu}><BsBell size={25} />ME</span>
            </div>      
            <a href="/new"><button className="write-button">Write</button></a>
            <div id="#battleBox">
                <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"  onClick={this.showProfile} roundedCircle/>
              </div>
     
                    
          </Navbar.Collapse>
        </Navbar>

              {
                this.state.showMenu
                  ? (
                    <div className="menu"
                      ref={(element) => {
                        this.dropdownMenu = element;
                      }}
                    >
                      <h5>Notifications</h5>
                      <hr/>
                      <div>Test 1</div>
                      <div>Aaron Moran</div>
                      <div>Aaron Moran</div>
                    </div>
                  )
                  : (
                    null
                  )
              }

              {
                this.state.showForum
                  ? (
                    <div className="menu"
                      ref={(element) => {
                        this.dropdownMenu4 = element;
                      }}
                    >
                      <h5>Forums (Beta)</h5>
                      <hr/>
                      <div>Feature Requests or any bugs you found drop them into the forum!</div>
                      <a href="/forums">See All</a>
                    </div>
                  )
                  : (
                    null
                  )
              }

              {
                this.state.showContributions
                  ? (
                    <div className="menu"
                      ref={(element) => {
                        this.dropdownMenu5 = element;
                      }}
                    >
                      <h5>Contributions</h5>
                      <hr/>
                      <a href="/leaderboard">See Charts</a>
                    </div>
                  )
                  : (
                    null
                  )
              }


             {/* PROFILE FILTER */}
              {
                this.state.showProfile
                  ? (
                    <div className="profileDropdwn"
                      ref={(element3) => {
                        this.dropdownMenu3 = element3;
                      }}
                    >
                      <a href="/me" className="profile-navs" ><p className="contributor-item-profile"><b>Hello, {this.state.user.fullname}</b></p></a>
                      <hr/>
                      <a href="/connections" className="profile-navs"><p className="contributor-item-profile"><BsPeople/> Connections <b>{this.state.followers.length}</b></p></a>
                      <a href="/saved" className="profile-navs"><p className="contributor-item-profile"><BsBookmarks/> Reading List</p></a>
                      <hr/>
                      <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><MdSchool size={20}/> Verify Student ID</p></a>
                      <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><RiShieldStarLine size={20}/> Community Guidelines</p></a>
                      <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><BsGear/> Account Settings</p></a>
                      <InviteFriend/>
                      <hr/>
                      <a href="/login" className="profile-navs">Sign Out</a>
                     
                    </div>
                  )
                  : (
                    null
                  )
              }
      </div>
    );
  }
}



function InviteFriend() {
  const [modalShow, setModalShowText] = React.useState(false);


  return (
    <div>
            <Dropdown.Item onClick={() => setModalShowText(true)}><BsReplyAll/> Invite a Friend</Dropdown.Item>

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

function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }