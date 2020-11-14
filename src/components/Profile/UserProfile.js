import React from 'react';
import '../../App.css';
import ProfileUsername from './ProfileUsername'
import ProfilePicture from './ProfilePicture'
import ProfileTabs from './ProfileTabs'
import EditProfile from './EditProfile'
import ProfileURL from './ProfileURL'

export default function UserProfile() {
  return (
    <>
      <div className="containerFeedLeftProfile">

      </div>

      <div className="containerFeedMiddleProfile">
        <div className="profile-card">
          <ProfilePicture/>
          <ProfileUsername/>
          <div className="user-profile-btn-options">
            <span className="user-profile-btn-options">
              <EditProfile/>
              {/* <ProfileURL/> */}
            </span>
          </div>
        </div>
        <ProfileTabs/>
      </div>

      <div className="containerFeedRightProfile">

      </div>
    </>
  );
}