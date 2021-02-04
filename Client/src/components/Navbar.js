import React from 'react';
import '../assets/App.css';
import '../assets/Media.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown} from 'react-bootstrap'
import {Modal, Image} from 'react-bootstrap'
import Invite from '../components/Common/Invite'
import axios from 'axios';
<<<<<<< HEAD
import {BsBellFill,BsBookmarks,BsPeople,BsReplyAll,BsLightningFill, BsSearch} from 'react-icons/bs'
=======
import {BsBellFill,BsBookmarks,BsReplyAll,BsLightningFill} from 'react-icons/bs'
>>>>>>> 1fc84b1e2a816f076a29fb6f06410d372da8ad0d
import {RiShieldStarLine} from 'react-icons/ri'
import SearchbarFilter from '../components/Common/SearchbarFilter'
import {BiChart} from 'react-icons/bi'
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
        searchValue: '',
        filterBy: '',
        users: [],
        discussions: [],

    };

      this.showMenu = this.showMenu.bind(this);
      this.showProfile = this.showProfile.bind(this);

      this.closeMenu = this.closeMenu.bind(this);
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


      axios.get('http://localhost:4000/users/get-user-details', {
          params: {
              id: user._id,
              fields: 'score pic'
          }
      })
          .then((response) => {
              console.log(response);
              this.setState({ user: response.data.user,
                // following: response.data.user.following,
                // followers: response.data.user.followers,
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
          <div id="container">
            <div>
              <SearchbarFilter/>
            </div>
            <div className="div2"><a href="/" className="header">zoosh</a></div>
            <div style={{ marginTop:10}}>
              <BsSearch className="search-icon" size={25}/>
              <a className="link" href="/communities"><IoMdPlanet  size={20}/> EXPLORE</a>  
              <a className="link" href="/leaderboard"><BiChart  size={20}/> CHARTS</a>  
              <a className="link" href="/forum"><BsLightningFill  size={20}/> FORUM</a>  
              <a className="link" onClick={this.showMenu}><BsBellFill  size={20} /> NOTIES</a>
              <a className="link" onClick={this.showProfile}>{this.state.user.score} <Image alt="" src={this.state.user.pic} style={{width:35, height:35, marginTop:10}}   roundedCircle/></a>
            </div>
          </div>

          <div class="container2">
              <div class="content">
                <nav role="navigation">
                  <div id="menuToggle">
                    <input type="checkbox" />
                      <span></span>
                      <span></span>
                      <span></span>
                  <ul id="menu">
                    <li><a href="/me">My Profile</a></li>
                    <a className="link" href="/communities"><IoMdPlanet  size={20}/> EXPLORE</a>  
                    <a className="link" href="/leaderboard"><BiChart  size={20}/> CHARTS</a>  
                    <a className="link" href="/forum"><BsLightningFill  size={20}/> FORUM</a>  
                  </ul>
                </div>
                </nav>
            </div>
          </div>

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

// function InviteFriend() {
//   const [modalShow, setModalShowText] = React.useState(false);


//   return (
//     <div>
//             <Dropdown.Item onClick={() => setModalShowText(true)}><BsReplyAll/> Invite a Friend</Dropdown.Item>

//             <InviteModal
//                 show={modalShow}
//                 onHide={() => setModalShowText(false)}
//             />
//     </div>
//   );
// }

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
