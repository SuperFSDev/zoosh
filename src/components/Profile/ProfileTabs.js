import React from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import {FaUserFriends} from 'react-icons/fa'
import {CgAwards} from 'react-icons/cg'
import {RiTeamLine} from 'react-icons/ri'
import {BiBook} from 'react-icons/bi'
import {SiAboutDotMe} from 'react-icons/si'
import About from './ProfileME'
import Achievements from './ProfileAchievements'
import Communities from './ProfileCommunities'
import History from './ProfilePostHistory'

export default function ProfileTabs() {
  return (
    <div className="-profile-tabs">
    <Tabs  defaultActiveKey="me" id="uncontrolled-tab-example">
        <Tab className="profile-tab-items" eventKey="me" title={<SiAboutDotMe size={30}/>}>
            <About/>
        </Tab>
        <Tab className="profile-tab-items" eventKey="profile" title={<RiTeamLine size={30}/>}>
            <Communities/>
        </Tab>
        <Tab className="profile-tab-items" eventKey="contact" title={<BiBook size={30}/>} >
            <History/>
        </Tab> 
        <Tab className="profile-tab-items" eventKey="home" title={<CgAwards size={30}/>}>
            <Achievements/>
        </Tab>
    </Tabs>
    </div>
  );
}