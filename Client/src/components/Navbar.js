import React from 'react';
import '../assets/App.css';
import '../assets/Media.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Image, Navbar, Nav, NavDropdown, Row, Col, Container} from 'react-bootstrap'
import axios from 'axios';
import {BsBellFill,BsBookmarks, BsFillBarChartFill,BsLightningFill, BsHouseFill, BsHouse, BsBell, BsLightning,BsBookmarksFill, BsGear, BsCompass} from 'react-icons/bs'
import {RiShieldStarLine} from 'react-icons/ri'
import SearchbarFilter from '../components/Common/SearchbarFilter'
import {BiChart} from 'react-icons/bi'
import {IoMdPlanet} from 'react-icons/io'
import Avatar from '@material-ui/core/Avatar';
import {RiHome5Fill,RiCompass3Fill} from 'react-icons/ri'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        id: '',
        user: '',
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
        <Container>
        <Row>
        <Col sm>
          <Navbar.Brand href="/" className="header">zoosh</Navbar.Brand>
        </Col>  
                  
          <Col>
              <SearchbarFilter/>
          </Col>
          <Col sm>
            <span class="dropdown">
                          <Avatar  className="link" alt="" src={this.state.user.pic}  roundedCircle/>
                          <div class="dropdown-content">
                            <a href="/me" className="nowrap" ><p className="contributor-item-profile"><b>My Account</b></p></a>
                            <hr/>
                            <a href="/forum"  className="nowrap"><p className="contributor-item-profile"><BsLightning/> Forum</p></a>
                            <a href="/leaderboard"  className="nowrap"><p className="contributor-item-profile"><BiChart/> Charts</p></a>
                            <hr/>
                            <a href="/settings" className="nowrap"><p className="contributor-item-profile"><RiShieldStarLine size={20}/> Community Guidelines</p></a>
                            <hr/>
                            <a href="/login" className="nowrap">Log Out</a>
                          </div>
                      </span>
          </Col>
        </Row>
        <hr/>
      </Container>

        <Navbar className="mobile-navbar"  expand="lg">
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
            <Nav.Link href="/login" className="link">Log Out</Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}