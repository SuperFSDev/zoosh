import React from 'react'
import '../../assets/App.css';
import axios from 'axios';
import {Image , OverlayTrigger, Tooltip, Badge, Navbar, Nav} from 'react-bootstrap'
import History from './ProfilePostHistory'
// import addUserToFollow from './AddUserToFollow'
import {Helmet} from 'react-helmet'
import Avatar from '@material-ui/core/Avatar';
import cogoToast from 'cogo-toast'

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
    // document.body.style.backgroundColor = "#FCFCFC";


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

  CheckDetails() {
    if(this.state.user.college === null){
      return(<div>
        <p>Delete comment</p>
      </div>)
  }
}

  render() {
    var isUnfollowing = this.state.isUnfollowing;
    var title = this.state.user.fullname + " - Website"
    var user = JSON.parse(localStorage.getItem('user'));
    var pp = user.pic;
    var size = 5;

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

        <Navbar  className="navbar-profile" >
                  <Nav className="mr-auto">
                      <Navbar.Brand className="header-profile">
                        <span  className="navbar-title">
                          <b>{this.state.user.fullname}</b>
                          {/* <b className="user-member-profile">{this.state.user.score}</b> */}
                        </span> 
                        <span>
                          {isUnfollowing ? (
                            <button className="community-btn-b" disabled={this.state.isDisabled} onClick={() => this.followUser(this.state.user)}>Follow</button>
                          ) : (
                            <button  className="community-btn-b" disabled={this.state.isDisabled} onClick={() => this.unfollow(this.state.user)}>Unfollow</button>
                          )}<br/>
                        </span>
                        {/* <span style={{marginTop:25,marginLeft:70, fontWeight:400, color:'gray'}}>{this.state.followers.length} Followers</span> */}
                        </Navbar.Brand>
                  </Nav>

                  <Navbar.Collapse className="justify-content-end">
                    <div className="quick-create-option">
                      <div>
                        <a href="/home"><button className="write-button">Home</button></a>
                      </div>
                    </div>           
                      
                    <div className="navbar-prof-btn">
                      <div id="#battleBox">
                        <a href="/me"><Avatar src={user.pic} className="profile-btn-wrapper-left"  onClick={this.showProfile} roundedCircle/></a>
                      </div>
                    </div>               
                  </Navbar.Collapse>
        </Navbar>


        <div className="containerFeedMiddleProfile">
          <div className="profile-card">
          </div>
            <div id="social">
              <div className="profile-card-align">
                <Image src={this.state.user.pic} className="user-image"/>

                {/* <br/>
                {isUnfollowing ? (
                  <button className="community-btn-a" disabled={this.state.isDisabled} onClick={() => this.followUser(this.state.user)}>Follow</button>
                ) : (
                  <button  className="community-btn-a" disabled={this.state.isDisabled} onClick={() => this.unfollow(this.state.user)}>Unfollow</button>
                )}
                <br/><br/> */}
                <br/><br/>
                
                {/* If the user has not edited their profile to display college/course then dont display */}
                {this.state.user.college == null ? (
                  <div></div>
                  // <b>{this.state.user.fullname} is hiding from you</b>
                ) : (
                  <Badge variant="secondary"><h6>{this.state.user.college} &#x2022; {this.state.user.course}</h6></Badge>
                )}
               </div>
               
              </div>

              <div className="user-profile-about-bio">
                  {/* {this.state.user.bio} */}

                <br/><br/>
                <span className="text-muted">COMMUNTIES</span>
                {this.state.societies.length == 0 ? (
                        <div>                        
                          <p className="text-muted">Nothing to see here yet...</p>
                        </div>
                      ) : (
                        <div>
                          {this.state.societies.map(society=>
                          <li className="community-members-item-user-profile">
                            <p>

                            <b><a href={"/s/?id="+society} className="community-item-link">{society}</a> <b className="user-admin">ADMIN</b></b><br/>

                              
                            </p>
                          </li>)}
                        </div>
                      )}
                
              </div>
        </div>

        <div className="containerFeedRightUser">
          <div  className="top-posts-profile-container-2">
            <h5  className="-feed-item-header" style={{marginLeft:35}}>TOP POSTS</h5>
            <History />
          </div>
          <br/>
          {/* <div  className="top-posts-profile-container-2">
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
          </div> */}
          
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


 