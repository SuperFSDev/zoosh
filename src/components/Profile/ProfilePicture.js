import React from 'react';
import {Image} from 'react-bootstrap'

export default function ProfilePicture() {
  var user = JSON.parse(localStorage.getItem('user'));
  var pp = user.pic;

  return (
    <div id="social">
      <Image src={`data:image/jpeg;base64,${pp}`} className="user-image" roundedCircle />
    </div>
  );
}