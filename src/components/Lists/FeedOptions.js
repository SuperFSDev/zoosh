import React from 'react';
import {Image} from 'react-bootstrap'
import {BiHomeSmile} from 'react-icons/bi'
import {MdShowChart} from 'react-icons/md'
import {RiTeamLine,RiHeadphoneFill} from 'react-icons/ri'
import {FaRegCalendarAlt} from 'react-icons/fa'
import {MdForum} from 'react-icons/md'
import Team from '../../images/group.png';
import Home from '../../images/home.png';
import Forum from '../../images/forum.png';
import Leaderboard from '../../images/leaderboard.png';
import Events from '../../images/events.png';

export default function FeedOptions() {
    
    var user = JSON.parse(localStorage.getItem('user'));
    if(user) 
    {
        var fullname = user.fullname;
        var id = user._id;
        var societies = user.societies;
    }

    return (
        <div className="feed-options-container">
                <div className="feed-options-item">
                    <a href="/profile" className="feed-option-redirects-username"><div className="user-profile-container">
                        <h3>{fullname} <b className="user-score">1,231</b></h3>
                    </div></a><br/>
                    <a href="/" className="feed-option-redirects"><div className="option-container">
                        <Image src={Home}/> Home
                    </div></a>
                    <a href="/forum" className="feed-option-redirects"><div className="option-container">
                        <Image src={Forum}/> Forum
                    </div></a>
                    <a href="/events" className="feed-option-redirects"><div className="option-container">
                        <Image src={Events}/> Events
                    </div></a>
                    {/* <a href="/leaderboard" className="feed-option-redirects"><div className="option-container">
                        <RiHeadphoneFill className="-i-vector-img"/> Podcasts
                    </div></a> */}
                    <a href="/list-of-clubs-and-societies" className="feed-option-redirects"><div className="option-container">
                        <Image src={Team}/> Clubs and Societies
                    </div></a>
                    <a href="/leaderboard" className="feed-option-redirects"><div className="option-container">
                        <Image src={Leaderboard}/> Leaderboard
                    </div></a>
                </div>
        </div>
  );
}
