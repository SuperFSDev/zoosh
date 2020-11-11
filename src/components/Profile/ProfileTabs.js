import React from 'react';
import {Tabs, Tab} from 'react-bootstrap'

export default function ProfileTabs() {
  return (
    <div className="-profile-tabs">
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="About">
            Hello
        </Tab>
        <Tab eventKey="profile" title="Groups">
            World
        </Tab>
        <Tab eventKey="contact" title="Posts" >
            Test
        </Tab>
        <Tab eventKey="friends" title="Friends" >
            Friends
        </Tab>
    </Tabs>
    </div>
  );
}