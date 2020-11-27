import React from 'react';
import '../../App.css';
import ProfileUsername from './ProfileUsername'
import EditProfile from './EditProfile'
import {Image} from 'react-bootstrap'
import {SiAboutDotMe} from 'react-icons/si'
import { RiCake2Fill } from 'react-icons/ri'
import { MdSchool } from 'react-icons/md'
import axios from 'axios';
import History from './ProfilePostHistory'
import {Helmet} from 'react-helmet'

export default class MyProfile extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          id: '',
          user: '',
          college:'',
          course:'',
          dob:'',
          time:'',
          following: [],
          followers: [],
      };
    }

  componentDidMount() {
      var user = JSON.parse(localStorage.getItem('user'));
      document.body.style.backgroundColor = "#f0f2f5";

      this.setState({ id: user._id });

      axios.get('http://localhost:4000/users/get-user-details', {
          params: {
              id: user._id,
             
          }
      })
          .then((response) => {
              this.setState({ user: response.data.user,
              followers: response.data.user.followers,
              following: response.data.user.following, })
          })
          .catch((error) => {
              console.log(error);
          });

  }

  render(){
    return (
      <>
      {/* REACTJS HELMET */}
      <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{this.state.user.fullname}</title>

                {/* LINKS */}
                
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet> 
        <div className="containerFeedLeftProfile">

        </div>

        <div className="containerFeedMiddleProfile">
          <div className="profile-card">
            <ProfilePicture/>
            <ProfileUsername/>
          
            <div className="user-profile-btn-options">
              <span className="user-profile-btn-options">
                <EditProfile/>
                  {/* <p className="user-followers-following-stats">Following {this.state.following.length}</p>
                  <p className="user-followers-following-stats">Followers {this.state.followers.length}</p> */}

              </span>
            </div>
          </div>

          <div className="profile-card">
              <div id="social">
                <p className="user-bio"></p>
              </div>
            </div>
            <div className="user-profile-about">
              <p><SiAboutDotMe /> <b className="user-details">{this.state.user.fullname}</b></p>
              <p><MdSchool /> <b className="user-details">{this.state.user.college}</b></p>
              <p>Studying: <b className="user-details">{this.state.user.course}</b></p>
              <p>DOB: <b className="user-details">{this.state.user.dob}</b></p>
              <p><RiCake2Fill /> Joined on <b className="user-details">{this.state.user.time}</b></p>
            </div>

            <div className="user-profile-about">
            <h4>Stats</h4>
            <p>Profile Score: <b className="user-details-views">{this.state.user.score}</b></p>
            <p className="user-followers-following-stats">Followers <b className="user-details-views">{this.state.followers.length}</b></p>
            </div>

            <div className="user-profile-about">
              <h4>Awards</h4>
              <p></p>
            </div>
            
            <div className="user-profile-about">
              <h4>Communities</h4>
              <p><b>{this.state.user.societies}</b></p>
            </div>
        </div>

        <div className="containerFeedRightProfile">
          <History/>
        </div>
      </>
    );
  }
  
}

function ProfilePicture() {
  var user = JSON.parse(localStorage.getItem('user'));
  var pp = user.pic;

  return (
    <div id="social">
      <Image src={pp} className="user-image" roundedCircle />
    </div>
  );
}