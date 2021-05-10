import React from 'react';
import '../assets/App.css';
import '../assets/Media.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,  Row, Col, Container} from 'react-bootstrap'
import {  BsHouse, BsBell, BsBarChart} from "react-icons/bs";
import {BiRocket} from 'react-icons/bi'
import axios from 'axios';

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
              fields: 'pic fullname'
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
          </Col>
          <Col sm>
          </Col>
        </Row>
        <hr/>
      </Container>

      <h1 className="mobile-navbar" bg="none" expand="lg">
        <h1 className="header2">zoosh</h1>
      </h1>
      <br/>
      <div className="mobile-btn-options">
        <a href="/"><button className="btn-options"><BsHouse size={25}/> For You</button></a>
        <a href="/top"><button className="btn-options"><BsBarChart size={25}/> Top</button></a>
        <a href="/explore"><button className="btn-options"><BiRocket size={25}/> Explore</button></a>
        <a href="/notifications"><button className="btn-options"><BsBell size={25}/> Noties</button></a>
      </div>
      </div>
    );
  }
}