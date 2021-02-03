import React from 'react';
import '../assets/App.css';
import '../assets/Media.css';

import {Navbar, Nav, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Image} from 'react-bootstrap'
import axios from 'axios';
import {BsGear,BsBellFill,BsBookmarks,BsPeople,BsReplyAll,BsLightningFill, BsHouseFill} from 'react-icons/bs'
import {RiShieldStarLine} from 'react-icons/ri'
import SearchbarFilter from '../components/Common/SearchbarFilter'
import {BiPlanet} from 'react-icons/bi'
import {IoMdPlanet} from 'react-icons/io'
import LoginForm from '../components/auth/LoginModal'
import {BsFillStarFill} from 'react-icons/bs'

export default class PreNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        id: '',
        user: '',
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
  return (
      <div>
        <div id="top"></div>
        <div id="container">
            <div><SearchbarFilter/></div>
            <div className="div2"><a href="/" className="header">NAME</a></div>
            <div>
              <a className="link" href="/communities"><IoMdPlanet  size={20}/> LOGIN</a>  
              <a className="link" href="/leaderboard"><BsLightningFill  size={20}/> JOIN</a>  
            </div>
          </div>
      </div>
    );
  }
}


function LoginModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Log In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <LoginForm/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Login() {
  const [modalLogin, setModalLogin] = React.useState(false);

  return (
    <>
      <span variant="primary" onClick={() => setModalLogin(true)}>
        <BsFillStarFill  size={25}/>  Log In
      </span>

      <LoginModal
        show={modalLogin}
        onHide={() => setModalLogin(false)}
      />
    </>
  );
}

function RegisterModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Register() {
  const [modalJoin, setModalJoin] = React.useState(false);

  return (
    <>
      <span variant="primary" onClick={() => setModalJoin(true)}>
        <BsLightningFill size={25}/> Sign Up
      </span>

      <RegisterModal
        show={modalJoin}
        onHide={() => setModalJoin(false)}
      />
    </>
  );
}