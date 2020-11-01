import React from 'react';
import '../../App.css';
import { Nav } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb'


function Daily() {
  return (

    <>
      <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>All Clubs and Societies</Breadcrumb.Item>
      </Breadcrumb>

      <div className="search-div">
        <input className="searchbar" type="text" id="mySearch" placeholder="Search a topic.." title="Type in a category"/>
      </div>

      <div class="row">
        <div class="column">
        <Nav.Link href="/"><div className="python-card">
          <h1>Top 50</h1>
        </div></Nav.Link>
        </div>
        <div class="column">
        <Nav.Link href="/"><div className="python-card">
          <h1>LGBTQ+</h1>
        </div></Nav.Link>
        </div>
        <div class="column">
        <Nav.Link href="/"><div className="python-card">
          <h1>Fitness</h1>
        </div></Nav.Link>
        </div>
        <div class="column">
        <Nav.Link href="/"><div className="python-card">
          <h1>Music</h1>
        </div></Nav.Link>
        </div>
        <div class="column">
        <Nav.Link href="/"><div className="python-card">
          <h1>Outdoors</h1>
        </div></Nav.Link>
        </div>
     </div>

     <div class="row">
        <div class="column">
        <Nav.Link href="/"><div className="python-card">
          <h1>Maths</h1>
        </div></Nav.Link>
        </div>
        <div class="column">
        <Nav.Link href="/"><div className="python-card">
          <h1>Gaming</h1>
        </div></Nav.Link>
        </div>
        <div class="column">
        <Nav.Link href="/"><div className="python-card">
          <h1>Debating</h1>
        </div></Nav.Link>
        </div>
        <div class="column">
        <Nav.Link href="/"><div className="python-card">
          <h1>Religion</h1>
        </div></Nav.Link>
        </div>
        <div class="column">
        <Nav.Link href="/"><div className="python-card">
          <h1>Volunteering</h1>
        </div></Nav.Link>
        </div>
     </div>

    </>
  );
}

export default Daily;
