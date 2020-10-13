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
