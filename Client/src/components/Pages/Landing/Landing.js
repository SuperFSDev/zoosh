import React from 'react';
import '../../../assets/App.css';
import {Navbar, Nav, Image} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import Friends from '../../../images/landing.jpg'
import {BsArrowRight} from 'react-icons/bs'

export default class Landing extends React.Component {

  
render(){

  return (
    <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Website Name</title>
        </Helmet> 

        <Navbar>
            <Nav className="mr-auto">
                <Navbar.Brand className="header" href="/landing">Website Name</Navbar.Brand>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <div className="landing-nav-items">
                    <a href="/manifesto" ><button  className="community-btn">Manifesto</button></a>   
                    <a href="/contact" ><button  className="community-btn">Contact</button></a>
                    <a href="/join" ><button  className="community-btn">Join Now</button></a>
                    <a href="/login"><button className="landing-btn-signin">Sign In</button></a>
                </div>            
            </Navbar.Collapse>
        </Navbar>

        <div>
            <div className="containerLanding">
                <p className="landing-desc-1">Make the most out of student life today</p><br/>
                <a href="/join"><button className="landing-btn-signup">Join Now  <BsArrowRight size={25}/></button></a><br/>
                <img className="landing-img" src={Friends} width="1050" height="auto"/><br/>
            </div>
        </div>
    </div>
  );
}
}
