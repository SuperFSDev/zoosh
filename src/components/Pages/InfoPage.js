import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import {Image} from 'react-bootstrap'
import ProfilePic from '../../images/team.jpg'
import {BsPeopleFill} from 'react-icons/bs'

class InfoPage extends React.Component {

render(){
  return (
     <div>
      <div className="containerInformationLeft">
   
      </div>

      <div className="containerInformationMiddle">
          <div className="information-container">
              <div>
                 <Image src={ProfilePic} className="user-image" roundedCircle />
              </div>
              <div>
                <p className="society-header-name">GMIT Computer Society</p>
              </div>
              <div className="member-count">
                    <p><BsPeopleFill size={35}/> 1,223</p>
              </div>
              <div className="profile-card">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </div>
              <div>
                  <button className="soc-item-list-join-btn-info">Join</button>
              </div>
          </div>
      </div>

      <div className="containerInformationRight">

      </div>
  </div>
  );
}
}


export default InfoPage;