import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Img from '../../images/blogging.jpg'

export default function ImageAvatars() {
  return (
    <div>
      <span className="avatar-user-card"><Avatar src={Img}/></span>
    </div>
  );
}