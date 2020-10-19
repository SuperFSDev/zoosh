import React from 'react';
import '../App.css';
import { Nav } from 'react-bootstrap';
import {SiPython} from 'react-icons/si'

function Daily() {
  return (

    <>
        <h1 className="head-selection">Select an option</h1>
        <Nav.Link href="/Python"><div className="python-card">
          <h1>Python <SiPython/></h1>
        </div></Nav.Link>

        <Nav.Link href="/UI"><div className="python-card">
          <h1>Daily UI</h1>
        </div></Nav.Link>
    </>
  );
}

export default Daily;
