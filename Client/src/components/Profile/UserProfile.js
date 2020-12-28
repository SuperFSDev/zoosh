import React from 'react'
import '../../App.css';
import axios from 'axios';
import {Image , OverlayTrigger, Tooltip} from 'react-bootstrap'
import { SiAboutDotMe } from 'react-icons/si'
import History from './ProfilePostHistory'
// import addUserToFollow from './AddUserToFollow'
import { RiCake2Fill } from 'react-icons/ri'
import { MdSchool } from 'react-icons/md'
import {Helmet} from 'react-helmet'
import {FaBook,FaRegGem,FaRegLightbulb,FaRegLemon,FaRegHeart,FaRegCommentAlt,FaRegCircle} from 'react-icons/fa'
import moment from 'moment'

export default class UserProfile extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      isDisabled: false,
      followers: [],
      following: [],
      societies:[],
      posts:[],
      badges:[],
      time:'',
      showFollow:false,
      showUnfollow:false
    };
    this.unfollow = this.unfollow.bind(this);
  }

  componentDidMount() {

    var user_id = new URLSearchParams(this.props.location.search).get("id");
    document.body.style.backgroundColor = "#f0f2f5";


    axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user_id
      }
    })

      .then((response) => {
        this.setState({ user: response.data.user,
                        followers: response.data.user.followers,
                        following: response.data.user.following,
                        societies: response.data.user.societies,
                        posts: response.data.user.posts,
                        badges: response.data.user.badges,




        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  followUser(user) {
    this.setState({
      isDisabled: true
    });
    addUserToFollow(user);
    console.info("Followed User")
  }

  unfollow(user) {

    var getUser = JSON.parse(localStorage.getItem('user'))
  
    const myUser = {
        user_id: getUser._id,
        user: user._id,
    }
    const followUser = {
      user_id: user._id,
      user: getUser._id
      
  }
    
  
    // Adds user to following array in user model.
   axios.post('http://localhost:4000/users/unfollow',myUser)
        //add to following array
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function (error) {
            console.log(error);
        })

   axios.post('http://localhost:4000/users/DeleteFollower',followUser)
        //add to following array
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function (error) {
            console.log(error);
        })
  
  
  alert("you just unfollowed"+user.fullname);
  
  }

  render() {
    
    var user = JSON.parse(localStorage.getItem('user'));
    var pp = user.pic;

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


        <div className="containerFeedMiddleProfile">
          <div className="profile-card">
            <div id="social">
              <Image src={this.state.user.pic} className="user-image" roundedCircle/>
              <h2> {this.state.user.fullname} <b className="user-score">{this.state.user.score}</b></h2>
            </div>
            <div>
              <button className="standard-button" disabled={this.state.isDisabled} onClick={() => this.followUser(this.state.user)}>Follow</button>
              <button className="standard-button" disabled={this.state.isDisabled} onClick={() => this.unfollow(this.state.user)}>Unfollow</button>

            </div>
          </div>

          <div className="profile-card">
          </div>
          <div className="user-profile-about">
              {this.state.user.bio}
            </div>
          <div className="user-profile-about">

              {/* Users Name */}
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Name</Tooltip>}>
                <span className="d-inline-block">
                <p><SiAboutDotMe /> </p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.fullname}</b><br/>
              
              {/* Users College */}
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Education</Tooltip>}>
                <span className="d-inline-block">
                  <p><MdSchool /></p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.college}</b><br/>

              {/* Users Course Details */}
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Studying</Tooltip>}>
                <span className="d-inline-block">
                <p><FaBook/></p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.course}</b><br/>

              {/* User Joined Date */}
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cake Day</Tooltip>}>
                <span className="d-inline-block">
                <p><RiCake2Fill />  </p>
                </span>
              </OverlayTrigger>
              Joined on <b >{moment(this.state.user.time).format("MMM Do, YYYY.")}</b>
                          
            </div>

          <div className="user-profile-about">
              <h4>Stats</h4><br/>
              <section className="badge-container">
                <div className="stats-item-1">
                  <FaRegLemon size={30}/> <b>{this.state.user.score}</b><br/>Score
                </div>
                <div className="stats-item-1">
                  <span><FaRegGem size={30}/> <b> {this.state.followers.length}</b><br/>Followers</span>
                </div>
                <div className="stats-item-1">
                  <span><FaRegCircle size={30}/> <b> {this.state.societies.length}</b><br/>Communties</span>
                </div>
                <br/>
                <div className="stats-item-1">
                  <span><FaRegCommentAlt size={30}/> <b> {this.state.posts.length}</b><br/>Posts</span>
                </div>
                <div className="stats-item-1">
                  <FaRegLightbulb size={30}/> <b>{this.state.followers.length}</b><br/>Questions
                </div>
                <div className="stats-item-1">
                  <span><FaRegHeart size={30}/> <b> {this.state.societies.length}</b><br/>Answers</span>
                </div>
              </section>
            </div>


          <div className="user-profile-about">
              <h4>Badges</h4>
              <section className="badge-container">
                <div className="badge-item-1">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Gold</Tooltip>}>
                            <span className="d-inline-block">
                            <span>🥇 <h2>{this.state.badges.length}</h2></span>
                          </span>
                  </OverlayTrigger>   
                </div>
                <div className="badge-item-2">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Silver</Tooltip>}>
                            <span className="d-inline-block">
                            <span>🥈 <h2>{this.state.badges.length}</h2></span>
                          </span>
                  </OverlayTrigger>  
                </div>
                <div className="badge-item-3">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Bronze</Tooltip>}>
                            <span className="d-inline-block">
                            <span>🥉 <h2>{this.state.badges.length}</h2></span>
                          </span>
                  </OverlayTrigger>  
                </div>
                <br></br><a href="#" id="dropdown-basic"><p>View All</p></a>
              </section>
            </div>


          <div className="user-profile-about">
            <h4>Communities</h4>
       
            {this.state.societies.map(society=>
                  <li className="community-members-item-profile"><b><a href={"/s/?id="+society}>{society}</a></b></li>)}<br/>
          </div>
        </div>

        <div className="containerFeedRightUser">
          <div  className="top-posts-profile-container">
            <h3>Top Posts</h3>
            <History />
          </div>
          
        </div>
      </>
    );
  }
}


// Follow the user profile and add to array
function addUserToFollow(user) {

  var getUser = JSON.parse(localStorage.getItem('user'))

  const myUser = {
      user_id: getUser._id,
      user: user._id,
  }

  const followUser = {
      user_id: user._id,
      user: getUser._id
      
  }

  // Adds user to following array in user model.
 axios.post('http://localhost:4000/users/addToFollowingList',myUser)
      //add to following array
      .then(function (resp) {
          console.log(resp);
      })
      .catch(function (error) {
          console.log(error);
      })


  // Adds user to followers array in users model.
 axios.post('http://localhost:4000/users/updateFollowers',followUser)
      .then(function (resp) {
          console.log(resp);
          console.log(followUser);
          alert(JSON.stringify(followUser));
      })
      .catch(function (error) {
          console.log(error);
  })

}


 