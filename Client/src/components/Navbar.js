import React from 'react';
import '../assets/App.css';
import '../assets/Media.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Image, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import axios from 'axios';
import {BsBell,BsBookmarks, BsSearch,BsLightningFill, BsGearFill,BsBookmarksFill, BsGear, BsCompass} from 'react-icons/bs'
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
        searchValue: '',
        filterBy: '',
        users: [],
        discussions: [],
    };
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

        <Navbar  expand="lg" bg="light" variant="light">
          <Navbar.Brand href="/" className="header">zoosh</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <SearchbarFilter/>
            </Nav>
            <Nav>
            <Nav.Link href="/communities" className="link"><BsCompass size={25}/></Nav.Link>
            <Nav.Link href="/forum" className="link"><BsLightningFill size={25}/></Nav.Link>
            <Nav.Link href="/leaderboard"  className="link"><BiChart size={25}/></Nav.Link>
            <Nav.Link href="/notifications"  className="link"><BsBell size={25}/></Nav.Link>
            <span class="dropdown">
                        <span style={{padding:20}}><a onClick={this.showProfile}>{this.state.user.score} <Image alt="" src={this.state.user.pic} style={{width:35, height:35, marginTop:10}}   roundedCircle/></a></span>
                          <div class="dropdown-content">
                            <a href="/me" className="profile-navs" ><p className="contributor-item-profile"><b>My Account</b></p></a>
                            <hr/>
                            <a href="/saved" className="profile-navs"><p className="contributor-item-profile"><BsBookmarks/> Reading List</p></a>
                            <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><RiShieldStarLine size={20}/> Community Guidelines</p></a>
                            <hr/>
                            <a href="/login" className="profile-navs">Sign Out</a>
                          </div>
                      </span>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}