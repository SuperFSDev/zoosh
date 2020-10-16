import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WebDesign from '../images/web.png'
import Developer from '../images/developer.png';



function Home() {
  return (
    <>


      <div>
        <img className="WebImage2" src={Developer}/>
        <img className="WebImage" src={WebDesign}/>
      </div>

      <div className="spacing-home"></div>
      <hr/>
      <footer className="footer">
        <p>tasq</p> 
      </footer>
    
    </>
  );
}

export default Home;
