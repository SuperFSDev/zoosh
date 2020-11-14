import React from 'react';
import {RiFacebookCircleFill} from 'react-icons/ri'
import {SiTwitter,SiInstagram,SiLinkedin} from 'react-icons/si'

export default function ProfileME() {
  return (
    <div>
            <div className="containerFeedLeftProfileCell">
                <div className="user-profile-about">
                    <h1>About</h1>
                </div>
                <div className="user-profile-about">
                    <p>Full Name: <b className="user-details">Aaron Moran</b></p>
                    <p>College/University: <b className="user-details">GMIT</b></p>
                    <p>Studying: <b className="user-details">Software Development</b></p>
                    <p>Date of Birth: <b className="user-details">24/10/1998</b></p>
                    <p>Profile Views: <b className="user-details-views">1,900,200</b></p>
                </div>
                <div  className="user-profile-about-social">
                    <p className="profile-social-icons"><RiFacebookCircleFill size={25}/> <SiTwitter size={25}/> <SiInstagram size={25}/> <SiLinkedin size={25}/></p>
                </div>
            </div>

            <div className="containerFeedMiddleProfileCell">
                <div className="user-profile-about-bio">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
               
            </div>

            <div className="containerFeedRightProfileCell">

            </div>
    </div>
  );
}