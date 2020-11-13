import React from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import {FaUserFriends} from 'react-icons/fa'
import {CgAwards} from 'react-icons/cg'
import {RiTeamLine} from 'react-icons/ri'
import {BiBook} from 'react-icons/bi'
import {SiAboutDotMe} from 'react-icons/si'

export default function ProfileTabs() {
  return (
    <div className="-profile-tabs">
    <Tabs  defaultActiveKey="me" id="uncontrolled-tab-example">
        <Tab className="profile-tab-items" eventKey="me" title={<SiAboutDotMe size={30}/>}>
            About Me
        </Tab>
        <Tab className="profile-tab-items" eventKey="home" title={<CgAwards size={30}/>}>
            Achievements
        </Tab>
        <Tab className="profile-tab-items" eventKey="profile" title={<RiTeamLine size={30}/>}>
            Clubs and Socs a member of
        </Tab>
        <Tab className="profile-tab-items" eventKey="contact" title={<BiBook size={30}/>} >
            Post History
        </Tab>
    </Tabs>
    </div>
  );
}