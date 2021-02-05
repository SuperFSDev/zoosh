import React from 'react';
import '../assets/App.css';
import '../assets/Media.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Image, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import axios from 'axios';
import {BsBellFill,BsBookmarks, BsFillBarChartFill,BsLightningFill, BsHouseFill, BsHouse, BsBell, BsLightning,BsBookmarksFill, BsGear, BsCompass} from 'react-icons/bs'
import {RiShieldStarLine} from 'react-icons/ri'
import SearchbarFilter from '../components/Common/SearchbarFilter'
import {BiChart} from 'react-icons/bi'
import {IoMdPlanet} from 'react-icons/io'
import Avatar from '@material-ui/core/Avatar';

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
              fields: 'score pic fullname'
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
        <Navbar className="standard-navbar"  expand="lg" bg="light" variant="light">
          <Navbar.Brand href="/" className="header">zoosh</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <SearchbarFilter/>
            </Nav>
            <Nav>
            <Nav.Link href="/home" className="link"><BsHouseFill size={25}/></Nav.Link>
            <Nav.Link href="/explore" className="link"><BsCompass size={25}/></Nav.Link>
            <Nav.Link href="/leaderboard"  className="link"><BsFillBarChartFill size={25}/></Nav.Link>
            <Nav.Link href="/forum" className="link"><BsLightningFill size={25}/></Nav.Link>
            <Nav.Link href="/notifications"  className="link"><BsBellFill size={25}/></Nav.Link>
           {/* <Avatar  className="link" alt="" src={this.state.user.pic}  roundedCircle/> */}
            <span class="dropdown">
                          <Avatar  className="link" alt="" src={this.state.user.pic}  roundedCircle/>
                          <div class="dropdown-content">
                            <a href="/me" className="nowrap" ><p className="contributor-item-profile"><b>My Account</b></p></a>
                            <hr/>
                            <a href="/saved"  className="nowrap"><p className="contributor-item-profile"><BsBookmarks/> Reading List</p></a>
                            <a href="/settings" className="nowrap"><p className="contributor-item-profile"><RiShieldStarLine size={20}/> Community Guidelines</p></a>
                            <hr/>
                            <a href="/login" className="nowrap">Sign Out</a>
                          </div>
                      </span>
            <a href="/new"><button className="write-button">Write a post</button></a>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Navbar className="mobile-navbar"  expand="lg" bg="light" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand href="/" className="header">zoosh</Navbar.Brand>

          <Navbar.Collapse id="responsive-navbar-nav">
            
            <Nav>
            <a href="/new"><button className="write-button">Write a post</button></a>
            <Nav.Link href="/me" className="link"><Image alt="" className="user-image-mini" src={this.state.user.pic}  roundedCircle/>  {this.state.user.fullname}</Nav.Link>
            <Nav.Link href="/home" className="link"><BsHouse size={25}/> Home</Nav.Link>
            <Nav.Link href="/notifications"  className="link"><BsBell size={25}/> Notifications</Nav.Link>
            <Nav.Link href="/saved" className="link"><BsBookmarks size={25}/> Reading List</Nav.Link>
            <Nav.Link href="/explore" className="link"><BsCompass size={25}/> Explore</Nav.Link>
            <Nav.Link href="/leaderboard"  className="link"><BsFillBarChartFill size={25}/> Charts</Nav.Link>
            <Nav.Link href="/forum" className="link"><BsLightning size={25}/> Forum</Nav.Link>
            <Nav.Link href="/settings" className="link"><BsGear size={25}/> Account Settings</Nav.Link>
            <Nav.Link href="/login" className="link">Sign Out</Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}