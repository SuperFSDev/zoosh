import React from 'react'
import '../../App.css';
import axios from 'axios';
import ProfilePic from '../../images/blogging.jpg'
import {useParams} from 'react-router-dom'
import {Tabs, Tab,Image} from 'react-bootstrap'
import {SiAboutDotMe} from 'react-icons/si'
import About from './ProfileME'
import Achievements from './ProfileAchievements'
import Communities from './ProfileCommunities'
import History from './ProfilePostHistory'
import Team from '../../images/group.png';
import Book from '../../images/book.png';
import Badge from '../../images/badge.png';

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

function ProfileTabs() {
  return (
    <div className="-profile-tabs">
    <Tabs  defaultActiveKey="me" id="uncontrolled-tab-example">
        <Tab className="profile-tab-items" eventKey="me" title={<SiAboutDotMe size={30}/>}>
            <About/>
        </Tab>
        <Tab className="profile-tab-items" eventKey="profile" title={<Image src={Team}/>}>
            <Communities/>
        </Tab>
        <Tab className="profile-tab-items" eventKey="contact" title={<Image src={Book}/>} >
            <History/>
        </Tab> 
        <Tab className="profile-tab-items" eventKey="home" title={<Image src={Badge}/>}>
            <Achievements/>
        </Tab>
    </Tabs>
    </div>
  );
}