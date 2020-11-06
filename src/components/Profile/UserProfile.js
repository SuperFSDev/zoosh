import React from 'react';
import '../../App.css';
import ProfileUsername from './ProfileUsername'
import ProfileStats from './ProfileStats';
import ProfilePicture from './ProfilePicture'
import Status from './UserStatus'
import SocialLinks from './SocialLinks'

export default function UserProfile() {
  return (
    <>
      <div className="containerFeedLeft">

      </div>

      <div className="containerFeedMiddle">
        <ProfilePicture/>
        <ProfileUsername/>
        <ProfileStats/>
        <Status/>
      </div>

      <div className="containerFeedRight">
        <SocialLinks/>
      </div>
    </>
  );
}