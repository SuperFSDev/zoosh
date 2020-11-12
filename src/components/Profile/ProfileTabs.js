import React from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import {FaUserFriends} from 'react-icons/fa'
import {GrAchievement} from 'react-icons/gr'
import {RiTeamLine} from 'react-icons/ri'
import {BiBook} from 'react-icons/bi'

export default function ProfileTabs() {
  return (
    <div className="-profile-tabs">
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title={<GrAchievement size={30}/>}>
            Achievements
        </Tab>
        <Tab eventKey="profile" title={<RiTeamLine size={30}/>}>
            Clubs and Socs a member of
        </Tab>
        <Tab eventKey="contact" title={<BiBook size={30}/>} >
            Post History
        </Tab>
        <Tab eventKey="friends" title={<FaUserFriends size={30}/>} >
            Friends
        </Tab>
    </Tabs>
    </div>
  );
}