import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Img from '../../images/blogging.jpg'

export default function PostAvatar() {
  return (
    <div>
      <span className="-post-avatar-user-card"><Avatar alt="Aaron Moran" id="left-item-join-username" src={Img}/></span>
    </div>
  );
}