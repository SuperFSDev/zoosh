import React from 'react';
import {Image} from 'react-bootstrap'
import ProfilePic from '../../images/blogging.jpg'

export default function ProfilePicture() {
  return (
    <div id="social">
      <Image src={ProfilePic} className="user-image" roundedCircle />
    </div>
  );
}