import React from 'react'
import '../../assets/App.css';
import axios from 'axios';
import { Image, Row, Col, Container } from 'react-bootstrap'
import History from './ProfilePostHistory'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';
import {BsFillCircleFill} from 'react-icons/bs'
import Default from '../../images/defaults/default5.jpg'

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: '',
      user_loggedin: '',
      followers: [],
      following: [],
      societies: [],
      likedPosts: [],
      likedDiscussions: [],
      posts: [],
      badges: [],
      time: '',
      usersFollows:'',
      showFollow: false,
      showUnfollow: false,
      followBtn: false,
      unfollowBtn: false,
      isUnfollowing: true,
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

  async componentDidMount() {

    let user_id = new URLSearchParams(this.props.location.search).get("id");

    // document.body.style.backgroundColor = "#F7F7F7";

    await axios.get(`http://localhost:4000/users/get-user-details`, {
      params: {
        id: user_id,
        fields: 'fullname username followers following posts likedPosts pic societies badges college time score'
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({
          user: response.data.user,
          followers: response.data.user.followers,
          following: response.data.user.following,
          society_ids: response.data.user.societies,
          posts: response.data.user.posts,
          badges: response.data.user.badges,
          likedPosts: response.data.user.likedPosts,
          isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error);
      });


      var user = JSON.parse(localStorage.getItem('user'));
    // document.body.style.backgroundColor = "#F7F7F7";

    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id,
        fields: 'following '
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({
          usersFollows: response.data.user.following
        })
      })
      .catch((error) => {
        console.log(error);
      });


    axios.get('http://localhost:4000/discussions/get-user-discussions', {
      params: {
        id: user_id,
        fields: 'user society time thumbnail_pic title content likes comments user_id',
        sort: 'likes'
      }
    })
      .then((response) => {
        if (this.state.post == undefined) {
          this.setState({
            posts: response.data.discussions
          })
        } else {
          this.setState({
            posts: this.state.posts.concat(response.data.discussions)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Loops through society ID's and gets the data for each society.
    if(this.state.society_ids != undefined) {
      this.state.society_ids.map(society_id => (
        axios.get('http://localhost:4000/societies/get-societies-page', {
          params: {
            id: society_id
          }
        })
          .then((response) => {
            var joined = this.state.societies.concat(response.data.society);
            this.setState({ societies: joined });
          })
      ));
    }

    if (this.state.likedPosts != null) {
      for (var i = 0; i < this.state.likedPosts.length; i++) {
        this.GetLikedPost(this.state.likedPosts[i])
      }
    }

  }

  async GetLikedPost(DiscussionID) {
    await axios.get('http://localhost:4000/discussions/get-discussion-page', {
      params: {
        id: DiscussionID,
      }
    })
      .then((response) => {
        if (response.data.discussion == null) {
          this.checkIfNull(DiscussionID)
        }
        else {
          this.setState({
            likedDiscussions: this.state.likedDiscussions.concat(response.data.discussion),
            isLoading: false,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  followUser(user) {
    addUserToFollow(user);
    window.location.reload();
  }


  unfollow(user) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    this.setState({
      isUnfollowing: true,
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
    axios.post('http://localhost:4000/users/unfollow', myUser)
      //add to following array
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.post('http://localhost:4000/users/DeleteFollower', followUser)
      //add to following array
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
    window.location.reload();
  }

  CheckDetails() {
    if (this.state.user.college === null) {
      return (<div>
        <p>Delete comment</p>
      </div>)
    }
  }

  checkIfNull(discussion) {
    let user_id = new URLSearchParams(this.props.location.search).get("id");

    const removeDiscussion = {
      id: user_id,
      discussion: discussion,
    }
    // Adds the discussion to liked list
    axios.post('http://localhost:4000/users/removeFromLikedPosts', removeDiscussion)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  isMyProfile(fullname, discussionUser) {
    let user_id = new URLSearchParams(this.props.location.search).get("id");
    var getUser = JSON.parse(localStorage.getItem('user'))
    if (user_id === getUser._id) {
      return (<div>
        <b>You</b> clapped to a post written by <b>{discussionUser}.</b>
      </div>)

    } else {
      return (<div>
        <b>{fullname}</b> clapped to a post written by <b>{discussionUser}.</b>
      </div>)
    }

  }


  isUserFollowed(id){

    if (this.state.usersFollows.includes(id) === true) {
      return(
        <button className="follow-btn" disabled={this.state.isDisabled} onClick={() => this.unfollow(this.state.user)}>Unfollow</button>
      )
    }
    else{
      return(
        <button className="follow-btn" disabled={this.state.isDisabled} onClick={() => this.followUser(this.state.user)}>Follow</button>

      )
    }

  }

  render() {
    var isUnfollowing = this.state.isUnfollowing;
    var title = this.state.user.fullname + " - Website"

    return (
      <>
        {/* REACTJS HELMET */}
        <Helmet>
          <meta charSet="utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{title}</title>

          {/* LINKS */}

          <link rel="canonical" href="http://mysite.com/example" />
          <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet>

        <Container >
          <Row>
            <Col>
            <div className="user-column-one">
              <p className="nowrap">
                  <figure class="headshot">
                    {this.state.isLoading && <div><Skeleton circle={true} height={120} width={120}/></div>}
                    {this.state.user.pic == null &&<Image alt="" className="user-image" src={Default} roundedCircle  width={130} height={130} />}
                    {this.state.user.pic != null &&<Image alt="" className="user-image" src={this.state.user.pic} roundedCircle  width={130} height={130} />}                  
                  </figure>
                  <section class="bio-box">
                   <dl class="details"> 
                    <b className="user-name">{this.state.user.fullname}</b>
                     {this.isUserFollowed(this.state.user._id)}
                    <br/>
                    <b>@{this.state.user.username}</b> <br/>
                    <span className="user-badge"><BsFillCircleFill/> Member</span>
                      <br/>
                      {this.state.followers.length === 0 && <span><b>{this.state.followers.length}</b> followers</span>}
                      {this.state.followers.length > 1 && <span><b>{this.state.followers.length}</b> followers</span>}
                      {this.state.followers.length === 1 &&<span><b>{this.state.followers.length}</b> follower</span>}

                      {this.state.following.length === 0 && <span><b>{this.state.following.length}</b> following</span>}
                      {this.state.following.length > 1 && <span><b>{this.state.following.length}</b> following</span>}
                      {this.state.following.length === 1 && <span><b>{this.state.following.length}</b> following</span>}

                      <span><b>{this.state.user.score}</b> claps</span>
                  </dl>
                </section>
              </p>   
            </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="top-posts">
                  {this.state.isLoading && <div  className='discussion-post'></div>}
                  {this.state.posts != null && this.state.posts.length === 0 && <div className="card-empty">{this.state.user.fullname} is staying quiet for now</div>}
                  {this.state.posts != null && this.state.posts.length > 0 && <div><History /></div>}
              </div>
            </Col>
          </Row>
        </Container>
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

  
  const notify = {
    user:user._id,
    notify_id:getUser._id,
    user_pic:getUser.pic,
    user_name: getUser.fullname,
    message: "just followed you",
    time:new Date().getTime()
    
}
// Adds the discussion to liked list
axios.post('http://localhost:4000/notifications/notify', notify)
    .then(function (resp) {
        console.log(resp);
    })
    .catch(function (error) {
        console.log(error);
    })


  // Adds user to following array in user model.
  axios.post('http://localhost:4000/users/addToFollowingList', myUser)
    //add to following array
    .then(function (resp) {
      console.log(resp);
    })
    .catch(function (error) {
      console.log(error);
    })


  // Adds user to followers array in users model.
  axios.post('http://localhost:4000/users/updateFollowers', followUser)
    .then(function (resp) {
      console.log(resp);
      console.log(followUser);
      alert(JSON.stringify(followUser));
    })
    .catch(function (error) {
      console.log(error);
    })
}


