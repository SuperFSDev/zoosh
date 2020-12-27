import React from 'react';
import '../../../App.css';
import {Navbar, Nav, Image} from 'react-bootstrap'
import {Helmet} from 'react-helmet'

export default class Contact extends React.Component {

  
render(){

  return (
    <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Website Name / Contact</title>
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
                <h1 className="landing-desc-1">Contact</h1><br/>
                <hr/>
            </div>
        </div>
    </div>
  );
}
}
