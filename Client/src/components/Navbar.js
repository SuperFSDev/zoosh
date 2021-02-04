import React from 'react';
import '../assets/App.css';
import '../assets/Media.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Image} from 'react-bootstrap'
import Invite from '../components/Common/Invite'
import axios from 'axios';
import {BsBellFill,BsBookmarks, BsSearch,BsLightningFill, BsGearFill,BsBookmarksFill, BsGear} from 'react-icons/bs'
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
        showProfile2: false,
        searchValue: '',
        filterBy: '',
        users: [],
        discussions: [],

    };

      this.showMenu = this.showMenu.bind(this);
      this.showProfile = this.showProfile.bind(this);
      this.showProfile2 = this.showProfile2.bind(this);

      this.closeMenu = this.closeMenu.bind(this);
      this.closeProfile = this.closeProfile.bind(this);
      this.closeProfile2 = this.closeProfile2.bind(this);
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

    // USER PROFILE DROPDOWN
    showProfile2(event) {
      event.preventDefault();
      
      this.setState({ showProfile2: true }, () => {
        document.addEventListener('click', this.closeProfile2);
      });
    }
  
    closeProfile2(event) {
      
      if (!this.dropdownMenu4.contains(event.target)) {
        
        this.setState({ showProfile2: false }, () => {
          document.removeEventListener('click', this.closeProfile2);
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
              <a className="link" onClick={this.showMenu}><BsBellFill  size={20} /> ME</a>
              <a className="link" onClick={this.showProfile}>{this.state.user.score} <Image alt="" src={this.state.user.pic} style={{width:35, height:35, marginTop:10}}   roundedCircle/></a>
            </div>
          </div>

          <div id="container2">
            <div style={{ marginTop:5, marginLeft:15}}>
              <a href="/" className="header">zoosh</a>
            </div>
            <div className="div2" style={{color:'black',marginTop:7.5}}>
              <a href="/communities" style={{color:'black',marginTop:5,marginLeft:20}}><IoMdPlanet  size={25}/></a>  
              <a href="/forum" style={{color:'black',marginTop:5, marginLeft:20}}><BsSearch  size={20}/></a>  
              <a style={{color:'black',marginTop:5, marginLeft:20}}  onClick={this.showProfile2}><Image alt="" src={this.state.user.pic} style={{width:35, height:35, marginTop:3,marginRight:20, cursor:'pointer'}}   roundedCircle/></a>
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
                      <a href="/saved" className="profile-navs"><p className="contributor-item-profile"><BsBookmarks/> Reading List</p></a>
                      <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><RiShieldStarLine size={20}/> Community Guidelines</p></a>
                      <hr/>
                      <a href="/login" className="profile-navs">Sign Out</a>
                     
                    </div>
                  )
                  : (
                    null
                  )
              }

              {/* PROFILE FILTER MOBILE*/}
              {
                this.state.showProfile2
                  ? (
                    <div className="profileDropdwn2"
                      ref={(element4) => {
                        this.dropdownMenu4 = element4;
                      }}
                    >
                      <a href="/me" className="profile-navs" ><p className="contributor-item-profile"><b>My Account</b></p></a>
                      <hr/>
                      <a href="/forum" className="profile-navs"><p className="contributor-item-profile"><BsLightningFill/> Forum</p></a>
                      <a href="/leaderboard" className="profile-navs"><p className="contributor-item-profile"><BiChart/> Charts</p></a>
                      <a href="/saved" className="profile-navs"><p className="contributor-item-profile"><BsBookmarks/> Reading List</p></a>
                      <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><RiShieldStarLine size={20}/> Community Guidelines</p></a>
                      <hr/>
                      <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><BsGearFill/> Account Settings</p></a>
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