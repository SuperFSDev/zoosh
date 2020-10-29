import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Developer from '../images/developer.png';
import { Nav } from 'react-bootstrap';
import { AiOutlineArrowRight } from 'react-icons/ai';
import {OverlayTrigger, Popover} from 'react-bootstrap'
function Home() {

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content className="popover-content">
        Its all <strong>FREE</strong> content, no add's or additional fee's before and after sign up!
      </Popover.Content>
    </Popover>
  );
  
  

  return (
    <>
      <div>
        <div id="container">
            <span id="a"><img className="img1" src={Developer}/></span>
            <span id="b"><p className="greeting">Get Started with  <OverlayTrigger overlay={popover} placement="top" delay={{ show: 250, hide: 400 }} ><b style={{color:"#512CB0"}}>Free</b></OverlayTrigger> Daily Coding Tasks</p></span><br/>
            <Nav.Link className="links2" href="/daily"><button class="btn-start get-started-btn">Let's Go   <AiOutlineArrowRight/></button></Nav.Link>
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
