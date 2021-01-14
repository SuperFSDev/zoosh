import React from 'react';
import '../assets/App.css';
import {Navbar, Nav} from 'react-bootstrap';
// import ProfileButton from '../components/Profile/ProfileButton'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown} from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import {Modal, Image} from 'react-bootstrap'
import Invite from '../components/Common/Invite'
import axios from 'axios';
import {IoIosSquareOutline} from 'react-icons/io'
import {FaRegHandPeace} from 'react-icons/fa'
import {BsGear,BsBell,BsBookmarks,BsPeople,BsReplyAll} from 'react-icons/bs'


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        id: '',
        user: '',
        following:[],
        followers:[],
        showMenu: false,
        showFilter: false,
        showProfile: false,
        user: '',
        searchValue: '',
        filterBy: '',
        users: [],
    };

      this.showMenu = this.showMenu.bind(this);
      this.showFilter = this.showFilter.bind(this);
      this.showProfile = this.showProfile.bind(this);

      this.closeMenu = this.closeMenu.bind(this);
      this.closeFilter = this.closeFilter.bind(this);
      this.closeProfile = this.closeProfile.bind(this);
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

  // SEARCH BAR DROPDOWN
  showFilter(event) {
    event.preventDefault();
    
    this.setState({ showFilter: true }, () => {
      document.addEventListener('click', this.closeFilter);
    });
  }

  closeFilter(event) {
    
    if (!this.dropdownMenu2.contains(event.target)) {
      
      this.setState({ showFilter: false }, () => {
        document.removeEventListener('click', this.closeFilter);
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

  updateSearch(user) {
    this.setState({ searchValue: user.target.value.substr(0, 20) });
  }

render(){

  var{users} = this.state;
  let i = 0;
  var indents = [];

  let filteredUsers = this.state.users.filter(
    (user) => {
        return user.fullname.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
    }
  );

  for (var k = 0; k < 4; k++) {
    indents.push(users[1]);
  }

  return (
      <div>
        <div id="top"></div>
        <Navbar className="navbar" fixed="top">
          <Nav className="mr-auto">
            <Navbar.Brand className="header" href="/home">Website Name</Navbar.Brand>
            <input className="searchbar-navbar" type="text" id="mySearch" placeholder="Search users and communities " title="Type in a category" onClick={this.showFilter} onChange={this.updateSearch.bind(this)}/>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <div className="quick-create-option">
              <div>
                <a href="/users"><IoIosSquareOutline size={55} className="square" id="dropdown-basic" /></a>
                <BsBell size={45} className="notify" id="dropdown-basic" onClick={this.showMenu}/>
                <a href="/new"><button className="write-button">Write</button></a>
              </div>
            </div>           
              
            <div className="navbar-prof-btn">
              <div id="#battleBox">
                <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"  onClick={this.showProfile} roundedCircle/>
                {/* <Dropdown className="l-prof-btn-default" >
                  <Dropdown.Toggle id="dropdown-basic" >
                    <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left" onClick={this.showMenu}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/me"  eventKey="1">Hello, {this.state.user.fullname} 😃</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item  eventKey="13"><FaRegLemon/> Score <b className="user-details-views">{this.state.user.score}</b></Dropdown.Item>
                    <Dropdown.Item href="/connections"  eventKey="2"><FaUserFriends/> Following <b className="user-details-views">{this.state.following.length}</b></Dropdown.Item>
                    <Dropdown.Divider />
                    
                    <Dropdown.Item href="/settings"  eventKey="3"><FiSettings/> Account Settings</Dropdown.Item>
                    <Dropdown.Item eventKey="4"><InviteFriend/></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/login"  eventKey="6">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
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
                      <div>Test 1</div>
                      <div>Aaron Moran</div>
                      <div>Aaron Moran</div>
                    </div>
                  )
                  : (
                    null
                  )
              }


              {/* SEARCH BAR FILTER */}
              {
                this.state.showFilter
                  ? (
                    <div className="searchFilter"
                      ref={(element2) => {
                        this.dropdownMenu2 = element2;
                      }}
                    >
                      <h5>Search Results</h5>
                      <hr/>
                      <p className="searchbar-header">USERS</p>
                      {filteredUsers.sort((a,b)=> b.score- a.score).map(user  =>  ( 
                      <a  href={"/u/?id="+user._id}><div key={k} className="contributor-item-search">
                            <p className="-contributor-user-search"><Image src={user.pic} className="user-image-mini" roundedCircle />{user.fullname} <b  className="-contributor-user-score">{ user.score}</b></p>
                        </div></a>
                      ))}    
                    </div>
                  )
                  : (
                    null
                  )
              }


             {/* SEARCH BAR FILTER */}
              {
                this.state.showProfile
                  ? (
                    <div className="profileDropdwn"
                      ref={(element3) => {
                        this.dropdownMenu3 = element3;
                      }}
                    >
                      <a href="/me" className="profile-navs" ><p className="contributor-item-profile"><b>Hello, {this.state.user.fullname} 😃</b></p></a>
                      <hr/>
                      <a href="/connections" className="profile-navs"><p className="contributor-item-profile"><BsPeople/> Classmates <b>{this.state.following.length}</b></p></a>
                      <a href="/saved" className="profile-navs"><p className="contributor-item-profile"><BsBookmarks/> Reading List</p></a>
                      <hr/>
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