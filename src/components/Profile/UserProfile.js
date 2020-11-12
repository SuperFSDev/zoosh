import React from 'react';
import '../../App.css';
import ProfileUsername from './ProfileUsername'
import ProfilePicture from './ProfilePicture'
import ProfileTabs from './ProfileTabs'
import EditProfile from './EditProfile'

export default function UserProfile() {
  return (
    <>
      <div className="containerFeedLeftProfile">

      </div>

      <div className="containerFeedMiddleProfile">
        <div className="profile-card">
          <ProfilePicture/>
          <ProfileUsername/>
          <EditProfile/>
        </div>
        <ProfileTabs/>

      </div>

      <div className="containerFeedRightProfile">

      </div>
    </>
  );
}