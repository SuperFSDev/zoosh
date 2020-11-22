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
import addUserToFollow from './AddUserToFollow'
import moment from 'moment'
import {RiCake2Fill,RiEyeFill} from 'react-icons/ri'
import {MdSchool} from 'react-icons/md'

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      isDisabled: false,
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
    
    followUser(user){
      this.setState({
        isDisabled: true
      });
      addUserToFollow(user);
      console.info("Followed User")
    }

  render(){
     return (
    <>
      <div className="containerFeedLeftProfile">

      </div>

      <div className="containerFeedMiddleProfile">
        <div className="profile-card">
          <div id="social">
            <Image src={ProfilePic} className="user-image" roundedCircle />
            <h3> {this.state.user.fullname}</h3>
          </div> 
        <div>
            <button className="follow-btn" disabled={this.state.isDisabled} onClick={() => this.followUser(this.state.user)}>Follow</button>
            <button className="follow-btn">Unfollow</button>

        </div>
        </div>

        <div className="profile-card">
          <div id="social">
            <p className="user-bio"> {this.state.user.bio}</p>
          </div> 
        </div>
        <div className="user-profile-about">
                        <p><SiAboutDotMe/> <b className="user-details">{this.state.user.fullname}</b></p>
                        <p><MdSchool/> <b className="user-details">{this.state.user.college}</b></p>
                        {/* <p>Studying: <b className="user-details">{this.state.user.course}</b></p> */}
                        {/* <p>DOB: <b className="user-details">{this.state.user.dob}</b></p> */}
                        <p><RiCake2Fill/> <b className="user-details">{moment(this.state.user.time).format("MMM D, YYYY")}</b></p>
                        <p>Profile Score: <b className="user-details-views">{this.state.user.score}</b></p>
                        <p><RiEyeFill/> Views: <b className="user-details-views">1,900,200</b></p>
        </div>
        <div className="user-profile-about">
          <h4>Badges</h4>
        </div>
      </div>

      <div className="containerFeedRightProfile">
      <ProfileTabs/>

      </div>
    </>
  );
  }
 
}


function ProfileTabs() {
  return (
    <div className="-profile-tabs">
    <Tabs  defaultActiveKey="posts" id="uncontrolled-tab-example">
        <Tab className="profile-tab-items" eventKey="posts" title={<Image src={Book}/>} >
            <History/>
        </Tab> 
        <Tab className="profile-tab-items" eventKey="profile" title={<Image src={Team}/>}>
            <Communities/>
        </Tab>
        <Tab className="profile-tab-items" eventKey="home" title={<Image src={Badge}/>}>
            <Achievements/>
        </Tab>
    </Tabs>
    </div>
  );
}

function openCity(cityName) {
  var i;
  var x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(cityName).style.display = "block";  
}
