import React from 'react';
import {Tabs, Tab,Image} from 'react-bootstrap'
import Events from '../../images/events.png';
import Team from '../../images/group.png';
import Badge from '../../images/badge.png';
import Leaderboard from '../../images/leaderboard.png';
import {VscFeedback} from 'react-icons/vsc'

export default class CommunityTabs extends React.Component{
    render(){
        return(
            <OptionTabs/>
        );
    }
}

function OptionTabs() {
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