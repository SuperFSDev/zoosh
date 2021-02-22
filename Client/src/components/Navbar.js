import React from 'react';
import '../assets/App.css';
import '../assets/Media.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image,Form, FormControl, Button,  Navbar, Nav, NavDropdown, Modal, Row, Col, Container} from 'react-bootstrap'
import axios from 'axios';
import {BsBookmarks, BsFillBarChartFill,BsLightningFill, BsHouseFill, BsHouse, BsBell, BsLightning,BsBookmarksFill, BsGear, BsCompass} from 'react-icons/bs'
import {RiShieldStarLine} from 'react-icons/ri'
import SearchbarFilter from '../components/Common/SearchbarFilter'
import {BiChart} from 'react-icons/bi'
import Avatar from '@material-ui/core/Avatar';
import NewPost from '../components/Pages/NewPost';

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
        <Container className="nav-container">
        <Row>
        <Col sm>
          <Navbar.Brand href="/" className="header2">zoosh</Navbar.Brand>
        </Col>  
                  
          <Col>
              <SearchbarFilter/>
          </Col>
          <Col sm>
          <span class="dropdown">
                          <Avatar  className="link" alt={this.state.user.fullname} src={this.state.user.pic}  roundedCircle/>
                          <div class="dropdown-content">
                            <a href="/me" className="nowrap" ><p className="contributor-item-profile"><b>My Account</b></p></a>
                            <hr/>
                            <a href="/login" className="nowrap">Log Out</a>
                          </div>
                      </span>
          </Col>
        </Row>
        <hr/>
      </Container>

      <Navbar className="mobile-navbar" bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

        {/* <Navbar className="mobile-navbar"  expand="lg">
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
            <Nav.Link href="/settings" className="link"><BsGear size={25}/> Account Settings</Nav.Link>
            <Nav.Link href="/login" className="link">Log Out</Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Navbar> */}
      </div>
    );
  }
}