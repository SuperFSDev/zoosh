import React from 'react';
import addUserToFollow from '../Profile/AddUserToFollow';
import UserProfile from '../Profile/UserProfile'
export default class Recommended extends React.Component {

  followUser(uname){
    addUserToFollow(uname);
    console.info("Followed User")
    }

    render(){
        return (
            <div>
                <button className="follow-btn" onClick={() => this.followUser('You Followed a user')}>Follow</button>
            </div>
  );
}
 
}
