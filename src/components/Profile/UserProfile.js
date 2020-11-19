import React,{useEffect,useState,useContext} from 'react'
import '../../App.css';
import axios from 'axios';
import {Image} from 'react-bootstrap'
import ProfilePic from '../../images/blogging.jpg'
import ProfileTabs from './ProfileTabs'
import addUserToFollow from '../Profile/AddUserToFollow';
import {useParams} from 'react-router-dom'
// import FollowButton from '../Common/FollowButton'

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

    componentDidMount() {
      var user_id = new URLSearchParams(this.props.location.search).get("id");

      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
        }
      })

        .then((response) => {
          this.setState({ user: response.data.user })
        })
        .catch((error) => {
          console.log(error);
        });
      }
    
    // followUser(user){
    //   addUserToFollow(user);
    //   console.info("Followed User")
    //   }

  render(){
     return (
    <>
      <div className="containerFeedLeftProfile">

      </div>

      <div className="containerFeedMiddleProfile">
        <div className="profile-card">
          <div id="social">
            <Image src={ProfilePic} className="user-image" roundedCircle />
            <p> {this.state.user.fullname}</p>
          </div> 
          <div>
            <FollowButton/>
        </div>
        </div>
        <ProfileTabs/>
      </div>

      <div className="containerFeedRightProfile">

      </div>
    </>
  );
  }
 
}

function FollowButton() {
  
  const {userid} = useParams()

  const followUser = ()=>{
        fetch('http://localhost:4000/users/follow',{
            method:"post",
            body:JSON.stringify({
                followId:userid
            })
        })
    }

      return (
          <div>
              <div>
                <button className="follow-btn" onClick={()=>followUser()}>Follow</button> 
              </div>
         </div>
  );
}
