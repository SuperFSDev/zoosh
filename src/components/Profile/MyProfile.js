import React from 'react';
import '../../App.css';
import EditProfile from './EditProfile'
import {Image,Card} from 'react-bootstrap'
import {SiAboutDotMe} from 'react-icons/si'
import { RiCake2Fill } from 'react-icons/ri'
import { MdSchool } from 'react-icons/md'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {FaBook,FaUserFriends} from 'react-icons/fa'
import {AiOutlineEye} from 'react-icons/ai'
import {CgCommunity} from 'react-icons/cg'
import moment from 'moment'

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
          posts:[],
          following: [],
          followers: [],
          societies:[]
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
              following: response.data.user.following,
              societies: response.data.user.societies,
              posts:response.data.user.posts
            })
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
            <Username/>
          
            <div className="user-profile-btn-options">
              <span className="user-profile-btn-options">
                <EditProfile/>
                  {/* <p className="user-followers-following-stats">Following {this.state.following.length}</p>
                  <p className="user-followers-following-stats">Followers {this.state.followers.length}</p> */}

              </span>
            </div>
          </div>

          <div className="profile-card">
            </div>
            <div className="user-profile-about">
              <p><SiAboutDotMe /> <b className="user-details">{this.state.user.fullname}</b></p>
              <p><MdSchool /> <b className="user-details">{this.state.user.college}</b></p>
              <p><FaBook/> <b className="user-details">{this.state.user.course}</b></p>
              {/* <p>DOB: <b className="user-details">{this.state.user.dob}</b></p> */}
              <p><RiCake2Fill /> Joined on <b >{moment(this.state.user.time).format("MMM Do, YYYY.")}</b></p>
            </div>

            <div className="user-profile-about">
            <h4>Stats</h4>
            <p className="user-followers-following-stats"> 🔶 <b className="user-details-views">{this.state.user.score}</b></p><br/>
            <p className="user-followers-following-stats"><FaUserFriends size={20}/> <b className="user-details-views">{this.state.followers.length} followers.</b></p><br/>
            <p className="user-followers-following-stats"><AiOutlineEye size={20}/> <b className="user-details-views">{this.state.followers.length} content views.</b></p><br/>
            <p className="user-followers-following-stats"><CgCommunity size={20}/> <b className="user-details-views">member of {this.state.societies.length} communities.</b></p><br/>

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
        <div>
          <div>
            <h3>Top Posts</h3>
            </div>
                  {this.state.posts.reverse().map(post=>  (
                <div key={this.state.user._id}>  
                  <a href="/" className="post-link"><Card className='userPosts'>
                    <Card.Body>          
                      <Card.Text className="fontPost">
                        <b className="user-score-post-tag">1234</b>  {post.post} <big  className="text-muted-profile">{moment(post.time).format(" MMM Do 'YY.")}</big><hr/>
                      </Card.Text>        
                    </Card.Body>  
                    <h1></h1>                
                  </Card></a>
                </div>
              ))} 
        </div>
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


// Get profile username
function Username(){
  var user = JSON.parse(localStorage.getItem('user'));
  if(user)
    var fullname = user.fullname; 

  return (
    <div id="social">
      <h3>{fullname}</h3>
      {/* {id} */}
    </div>
  );

}
