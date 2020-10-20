import React from 'react';
import '../App.css';
import { Nav } from 'react-bootstrap';
import {SiPython} from 'react-icons/si'
import {AiOutlineBlock} from 'react-icons/ai'

function Daily() {
  return (

    <>
        <h1 className="head-selection">Select an option</h1>
        <Nav.Link href="/python"><div className="python-card">
          <h1>Python <SiPython/></h1>
        </div></Nav.Link>

        <Nav.Link href="/dailydesign"><div className="python-card">
          <h1>UI Design <AiOutlineBlock/></h1>
        </div></Nav.Link>
    </>
  );
}

export default Daily;
