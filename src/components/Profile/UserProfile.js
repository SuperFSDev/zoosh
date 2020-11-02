import React from 'react';
import '../../App.css';
import {Image, Row, Col, Container, Nav} from 'react-bootstrap'
import UserImage from '../../images/user.jpg';
import {RiStarSmileFill} from 'react-icons/ri'

export default function UserProfile() {
  return (
    <div className="user-profile">
      <Image src={UserImage} className="user-image" roundedCircle />
      <h1>John Doe</h1>
      <p className="score"><RiStarSmileFill className="stars"/> 999,999</p>
      <div className="profile-cards">
        <div class="row-profile">
            <div class="column">
            <Nav.Link href="/python"><div className="socs-card">
              <h1>Gaming</h1>
            </div></Nav.Link>
            </div>
            <div class="column">
            <Nav.Link href="/java"><div className="socs-card">
              <h1>Politics</h1>
            </div></Nav.Link>
            </div>
        </div>
      </div>
    </div>
  );
}