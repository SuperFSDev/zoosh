import React from 'react';
import '../App.css';
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineUser } from 'react-icons/ai';
import WebDesign from '../images/web.png'
import Developer from '../images/developer.png';



function Home() {
  return (
    <>
      <Navbar>
        <Navbar.Brand className="tasq" href="#">tasq</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link className="links" href="#home">Daily Problem</Nav.Link>
        <Nav.Link className="links" href="#home">Feed</Nav.Link>
        <Nav.Link className="links" href="#features">Leaderboard</Nav.Link>
        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
      </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
          <button className="btn-profile"><AiOutlineUser size={55}/></button>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <img className="WebImage2" src={Developer}/>
        <img className="WebImage" src={WebDesign}/>

      </div>

      {/* <div className="subscribe">
        <h1>Subscribe to revceive by email</h1>
      </div> */}
    
    </>
  );
}

export default Home;
