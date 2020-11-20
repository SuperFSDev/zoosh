import React from 'react';
import {Tabs, Tab,Image} from 'react-bootstrap'
import Events from '../../images/events.png';
import Team from '../../images/group.png';
import Badge from '../../images/badge.png';
import {VscFeedback} from 'react-icons/vsc'
import Leaderboard from '../../images/leaderboard.png';

export default function CommunityTabs() {
  return (
    <div className="-profile-tabs">
    <Tabs  defaultActiveKey="me" id="uncontrolled-tab-example">
        <Tab className="profile-tab-items" eventKey="me" title={<VscFeedback size={30}/>}>
            
        </Tab>
        <Tab className="profile-tab-items" eventKey="event" title={<Image src={Events}/>}>
            
        </Tab>
        <Tab className="profile-tab-items" eventKey="profile" title={<Image src={Team}/>}>
            
        </Tab>
        <Tab className="profile-tab-items" eventKey="leaderboard" title={<Image src={Leaderboard}/>}>
            
        </Tab>
        <Tab className="profile-tab-items" eventKey="badges" title={<Image src={Badge}/>}>
            
        </Tab>
    </Tabs>
    </div>
  );
}