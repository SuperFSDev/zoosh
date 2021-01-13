import React from 'react'
import '../../assets/App.css';
import axios from 'axios';
import {Image , OverlayTrigger, Tooltip} from 'react-bootstrap'
import History from './ProfilePostHistory'
// import addUserToFollow from './AddUserToFollow'
import { RiCake2Fill } from 'react-icons/ri'
import {Helmet} from 'react-helmet'
import moment from 'moment'
import {TiLocation} from 'react-icons/ti'
import {BsHeart,BsCircle,BsPerson,BsChatSquareDots,BsQuestionSquare,BsShieldShaded} from 'react-icons/bs'
import SkeletonProfile from '../Common/SkeletonUI/SkeletonProfile';
import { MdSchool } from 'react-icons/md'
import {SiAboutDotMe} from 'react-icons/si'
import {FaBook} from 'react-icons/fa'

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: '',
      followers: [],
      following: [],
      societies:[],
      posts:[],
      badges:[],
      time:'',
      showFollow:false,
      showUnfollow:false,
      followBtn:false,
      unfollowBtn:false,
      isUnfollowing:true,
    };

    this.unfollow = this.unfollow.bind(this);

    this.followBtn = this.followBtn.bind(this);
    this.unfollowBtn = this.unfollowBtn.bind(this);


  }

  followBtn(event) {
    event.preventDefault();
    
    this.setState({ followBtn: true }, () => {
      document.addEventListener('click', this.closeMenu);      
    });
  }

  unfollowBtn(event) {
    event.preventDefault();
    
    this.setState({ unfollowBtn: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  componentDidMount() {

    var user_id = new URLSearchParams(this.props.location.search).get("id");
    document.body.style.backgroundColor = "#f0f2f5";


    axios.get(`http://localhost:4000/users/get-user-details`, {
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
                        isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  followUser(user) {
    this.setState({
      isUnfollowing:false,
    });
    addUserToFollow(user);
    console.info("Followed User")
  }

  unfollow(user) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    this.setState({
      isUnfollowing:true,
    })
  
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
    var isUnfollowing = this.state.isUnfollowing;
    var title = this.state.user.fullname + " - Website"
    var user = JSON.parse(localStorage.getItem('user'));
    var pp = user.pic;

    if(this.state.isLoading){
      return (
        <div>
          <SkeletonProfile/>
        </div>
      )
    }
    
    else{
    return (
      <>
      {/* REACTJS HELMET */}
      <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{title}</title>

                {/* LINKS */}
                
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet> 


        <div className="containerFeedMiddleProfile">
          <div className="profile-card">
          </div>
          <div className="user-profile-about">
            <div id="social">
              <div className="profile-card-align">
                <Image src={this.state.user.pic} className="user-image" roundedCircle/>
                <h3>
                  <b>{this.state.user.fullname} </b>  

                  {this.state.user.score >= 1 && this.state.user.score <=999 ? (
                      <span><b className="user-member">{this.state.user.score}</b><br/></span>

                  ) : this.state.user.score >=1000 ?(
                    <span><b  className="user-mod">{this.state.user.score}</b><br/></span>
                  ) : this.state.user.score >= 5000 ? (
                    <span><b  className="user-admin">{this.state.user.score}</b><br/></span>
                  ) : (
                    <span><b>{this.state.user.score}</b><br/></span>
                  )} 

                </h3><br/>

                {/* <b className="is-tutor"> Tutor</b> */}
                {/* <button  className="btn-leaderboard" disabled={this.state.isDisabled} onClick={() => this.followUser(this.state.user)}>Follow</button>
                <button  className="btn-leaderboard" disabled={this.state.isDisabled} onClick={() => this.unfollow(this.state.user)}>Unfollow</button> */}

                {isUnfollowing ? (
                  <button  className="btn-leaderboard" disabled={this.state.isDisabled} onClick={() => this.followUser(this.state.user)}>Follow</button>
                ) : (
                  <button  className="btn-leaderboard" disabled={this.state.isDisabled} onClick={() => this.unfollow(this.state.user)}>Unfollow</button>
                )}
              </div>
              </div>
              {/* {this.state.user.bio} */}
            </div>

            <div className="user-profile-about">
              <section className="badge-container">
                <div className="stats-item-1">
                  {this.state.user.score >= 1 && this.state.user.score <=999 ? (
                      <span><b className="user-member">{this.state.user.score}</b><br/></span>

                  ) : this.state.user.score >=1000 ?(
                    <span><b  className="user-mod">{this.state.user.score}</b><br/></span>
                  ) : this.state.user.score >= 5000 ? (
                    <span><b  className="user-admin">{this.state.user.score}</b><br/></span>
                  ) : (
                    <span><b>{this.state.user.score}</b><br/></span>
                  )} 
                  Score
                </div>
                <div className="stats-item-1">
                  <span><BsPerson size={30}/> <b> {this.state.followers.length}</b><br/>Followers</span>
                </div>
                <div className="stats-item-1">
                  <span><BsCircle size={30}/> <b> {this.state.societies.length}</b><br/>Communties</span>
                </div>
                <br/>
                <div className="stats-item-1">
                  <span><BsChatSquareDots size={30}/> <b> {this.state.societies.length}</b><br/>Posts</span>
                </div>
                <div className="stats-item-1">
                  <BsQuestionSquare size={30}/> <b>{this.state.followers.length}</b><br/>Questions
                </div>
                <div className="stats-item-1">
                  <span><BsShieldShaded size={30}/> <b> {this.state.societies.length}</b><br/>Answers</span>
                </div>
              </section>
          
            </div>

            <div className="user-profile-about">

              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Name</Tooltip>}>
                <span className="d-inline-block">
                <p><SiAboutDotMe /> </p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.fullname}</b><br/>
              
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Education</Tooltip>}>
                <span className="d-inline-block">
                  <p><MdSchool /></p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.college}</b><br/>

              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Studying</Tooltip>}>
                <span className="d-inline-block">
                <p><FaBook/></p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.course}</b><br/>
            </div>


          <div className="user-profile-about">
              <h5>Badges</h5>
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
              </section>
            </div>


          <div className="user-profile-about">
            <h5>Communities</h5>
       
            {this.state.societies.map(society=>
                  <li className="community-members-item-profile">
                    <b><a href={"/s/?id="+society}>{society}</a></b><br/>
                    <b>Admin</b>
                  </li>)}
          </div>
        </div>

        <div className="containerFeedRightUser">
        <div  className="top-posts-profile-container-2">
          <div className="user-profile-overview">
          <span><p>{this.state.user.bio}</p></span>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cake Day</Tooltip>}>
                <span className="d-inline-block">
                <p id="icons"><RiCake2Fill size={25}/>  </p>
                </span>
              </OverlayTrigger>
                Joined on {moment(this.state.user.time).format("MMM Do, YYYY.")}

              <OverlayTrigger  overlay={<Tooltip id="tooltip-disabled">Location</Tooltip>}>
                <span className="d-inline-block" >
                <p  id="icons" className="spacing-right"><TiLocation  size={25}/>  </p>
                </span>
              </OverlayTrigger>
                 Galway, Ireland.
          </div>
              
        </div><br/>
          <div  className="top-posts-profile-container-2">
            <h5>Top Posts</h5>
            <History />
          </div>
          
        </div>
      </>
    );
  }
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


 