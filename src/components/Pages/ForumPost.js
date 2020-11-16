import React from 'react';
import '../../App.css';
import ProfileUsername from '../Profile/ProfileUsername'
import ProfileURL from '../Profile/ProfileURL'
import ProfilePicture from '../Profile/ProfilePicture'
import {RiFacebookCircleFill} from 'react-icons/ri'
import {SiTwitter,SiInstagram,SiLinkedin} from 'react-icons/si'

export default function ForumPost() {
  return (
    <>
      <div className="containerFeedLeftForum">
        <a href="/profile"><div className="profile-card">
          <ProfilePicture/>
          <ProfileUsername/>
          <div className="user-profile-btn-options">
            <span className="user-profile-btn-options">
            </span>
          </div>
        </div></a><br/>
        <a href="/list-of-clubs-and-societies"><div className="profile-card">
            GMIT Computer Science
            <div className="user-profile-btn-options">
                <span className="user-profile-btn-options">
                <ProfileURL/>
                </span>
            </div>
        </div></a>
        <br/>
        <div  className="user-profile-about-social-forum">
            <p className="profile-social-icons"><RiFacebookCircleFill size={25}/> <SiTwitter size={25}/> <SiInstagram size={25}/> <SiLinkedin size={25}/></p>
        </div>
      </div>

      <div className="containerFeedMiddleForum">
        <div className="discussion-container">
            <h1>Title</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
      </div>

      <div className="containerFeedRightProfile">
        
      </div>
    </>
  );
}