import React from 'react';
import '../../App.css';
import ProfileUsername from './ProfileUsername'
import EditProfile from './EditProfile'
import {Tabs, Tab,Image} from 'react-bootstrap'
import {SiAboutDotMe} from 'react-icons/si'
import About from './ProfileME'
import Achievements from './ProfileAchievements'
import Communities from './ProfileCommunities'
import History from './ProfilePostHistory'
import Team from '../../images/group.png';
import Book from '../../images/book.png';
import Badge from '../../images/badge.png';
import ProfilePic from '../../images/blogging.jpg'

export default function MyProfile() {
  return (
    <>
      <div className="containerFeedLeftProfile">

      </div>

      <div className="containerFeedMiddleProfile">
        <div className="profile-card">
          <ProfilePicture/>
          <ProfileUsername/>
          <div className="user-profile-btn-options">
            <span className="user-profile-btn-options">
              <EditProfile/>
            </span>
          </div>
        </div>
      </div>

      <div className="containerFeedRightProfile">
      <ProfileTabs/>

      </div>
    </>
  );
}


function ProfileTabs() {
  return (
    <div className="-profile-tabs">
    <Tabs  defaultActiveKey="me" id="uncontrolled-tab-example">
        <Tab className="profile-tab-items" eventKey="me" title={<SiAboutDotMe size={30}/>}>
            <About/>
        </Tab>
        <Tab className="profile-tab-items" eventKey="profile" title={<Image src={Team}/>}>
            <Communities/>
        </Tab>
        <Tab className="profile-tab-items" eventKey="contact" title={<Image src={Book}/>} >
            <History/>
        </Tab> 
        <Tab className="profile-tab-items" eventKey="home" title={<Image src={Badge}/>}>
            <Achievements/>
        </Tab>
    </Tabs>
    </div>
  );
}

function ProfilePicture() {
  var user = JSON.parse(localStorage.getItem('user'));
  var pp = user.pic;

  return (
    <div id="social">
      <Image src={pp} className="user-image" roundedCircle />
    </div>
  );
}