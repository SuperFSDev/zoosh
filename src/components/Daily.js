import React from 'react';
import '../App.css';
import { Nav } from 'react-bootstrap';
import {SiPython} from 'react-icons/si'
import {AiOutlineBlock} from 'react-icons/ai'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

function Daily() {
  return (

    <>
      <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Daily</Breadcrumb.Item>
      </Breadcrumb>
      <div className="container-options">
        <h1 className="head-selection">Select an option</h1>
        <Nav.Link href="/python"><div className="python-card">
          <h1>Python <SiPython/></h1>
        </div></Nav.Link>

        <Nav.Link href="/dailydesign"><div className="python-card">
          <h1>UI Design <AiOutlineBlock/></h1>
        </div></Nav.Link>
      </div>

      <div id="container-mobile">
        <p>hello</p>
        <h1 className="head-selection-mobile">Select an option</h1>
          <Nav.Link href="/python"><div className="python-card">
            <h1>Python <SiPython/></h1>
          </div></Nav.Link>

          <Nav.Link href="/dailydesign"><div className="python-card">
            <h1>UI Design <AiOutlineBlock/></h1>
          </div></Nav.Link>
      </div>
    </>
  );
}

export default Daily;
