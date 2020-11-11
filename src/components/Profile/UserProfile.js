import React from 'react';
import '../../App.css';
import ProfileUsername from './ProfileUsername'
import ProfileStats from './ProfileStats';
import ProfilePicture from './ProfilePicture'
import Status from './UserStatus'
import SocialLinks from './SocialLinks'
import ProfileTabs from './ProfileTabs'

export default function UserProfile() {
  return (
    <>
      <div className="containerFeedLeftProfile">

      </div>

      <div className="containerFeedMiddleProfile">
        <div className="profile-card">
          <ProfilePicture/>
          <ProfileUsername/>
          <ProfileStats/>
          <ProfileTabs/>
          {/* <Status/> */}
        </div>
        
      </div>

      <div className="containerFeedRightProfile">

      </div>
    </>
  );
}