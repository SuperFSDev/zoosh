import React from 'react';
import '../assets/App.css';
import '../assets/Media.css';

import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown} from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import {Modal, Image} from 'react-bootstrap'
import Invite from '../components/Common/Invite'
import axios from 'axios';
import {BsGear,BsBellFill,BsBookmarks,BsPeople,BsReplyAll,BsLightningFill, BsHouseFill} from 'react-icons/bs'
import Clap from '../images/clap.png'
import {RiShieldStarLine} from 'react-icons/ri'
import {MdSchool} from 'react-icons/md'
import SearchbarFilter from '../components/Common/SearchbarFilter'
import {BiPlanet} from 'react-icons/bi'
import {IoMdPlanet} from 'react-icons/io'

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
        <nav>
          <div style={{textAlign:'center' , background:'black'}}>
            <a href="/home" className="header" >NAME</a>
          </div>
          <div style={{textAlign:'center', background:'black'}}>
            <br/>
            <span >
            <a className="link" href="/communities"><IoMdPlanet  size={20}/> EXPLORE</a>  
            <a className="link" href="/communities"><IoMdPlanet  size={20}/> CHARTS</a>  
            <a className="link-right" onClick={this.showMenu}><BsBellFill  size={20} /> NOTIES</a>
            <a className="link-right"   onClick={this.showProfile}>{this.state.user.score} <Image src={this.state.user.pic} style={{width:35, height:35}}   roundedCircle/></a>
            </span>
          </div>
        </nav>


        {/* <nav class="navbar justify-content-center fixed-top">
          <ul class="nav justify-content-center">
          <li class="nav-item">
              <a class="nav-link" href="/"><BsHouseFill  size={25}/> HOME</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active"  href="/communities"><IoMdPlanet  size={25}/> EXPLORE</a>
            </li>
            <li class="nav-item">
              <a href="/home" className="header">NAME</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/forums"><BsLightningFill size={25}/> FORUM</a>
            </li>
            <li class="nav-item">
              <a class="nav-link"  onClick={this.showMenu} aria-disabled="true"><BsBellFill  size={25} /> NOTIES</a>
            </li>
            <li class="nav-item-icon">
              <a class="nav-link-profile" ><Image src={this.state.user.pic} style={{width:35, height:35, marginTop:10}}  onClick={this.showProfile} roundedCircle/></a>
            </li>
          </ul>
        </nav> */}

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
                    <div className="forum"
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
                      <a href="/me" className="profile-navs" ><p className="contributor-item-profile"><b>My Account</b></p></a>
                      <hr/>
                      {/* <a href="/connections" className="profile-navs"><p className="contributor-item-profile"><BsPeople/> Connections <b>{this.state.followers.length}</b></p></a> */}
                      <a href="/saved" className="profile-navs"><p className="contributor-item-profile"><BsBookmarks/> Reading List</p></a>
                      {/* <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><MdSchool size={20}/> Verify Student ID</p></a> */}
                      <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><RiShieldStarLine size={20}/> Community Guidelines</p></a>
                      {/* <InviteFriend/> */}
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