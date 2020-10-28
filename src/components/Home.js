import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WebDesign from '../images/web.png'
import Developer from '../images/developer.png';
import { Nav, Form, Button } from 'react-bootstrap';
import { AiOutlineArrowRight } from 'react-icons/ai';


function Home() {
  return (
    <>


      <div>
        <div id="container">
            <span id="a"><img className="img1" src={Developer}/></span>
            <span id="b"><p className="greeting">Get Started with Free Daily Coding Tasks</p></span><br/>
            <Nav.Link className="links2" href="/daily"><button class="get-started-btn">Let's Go   <AiOutlineArrowRight/></button></Nav.Link>
        </div>

        <div id="container-mobile">
          <p>Hello World</p>
        </div>        
      </div>
      <div className="spacing-home"></div>
    </>
  );
}

export default Home;
