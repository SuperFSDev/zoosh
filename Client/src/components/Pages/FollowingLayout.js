import React, { Fragment } from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import { Image, Row, Col, Container, Modal} from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';
import Button from '@material-ui/core/Button';
import ScrollToTop from 'react-scroll-up'
import { BsSearch, BsChat, BsArrowUp, BsBell, BsBarChart, BsHeart,BsHouse} from 'react-icons/bs'
import { Helmet } from 'react-helmet'
import {BiRocket} from 'react-icons/bi'
import NewPost from './NewPost';
import {AiOutlineTrophy} from 'react-icons/ai'

// Allows array of following ids to be passed as params
var qs = require('qs');

export default class Feed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      isLoading: true,
      discussions: [],
      comments: [],
      following: [],
      comment: '',
      user: '',
      pic: '',
      claps: 0,
      likes: 0,
      posts: [],
      likedPosts: [],
      time: new Date().getTime(),
    };
  }

  // Fetching the users Details
  getUserDetails() {
      var user = JSON.parse(localStorage.getItem('user'));
      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user._id,
          fields: 'forums societies likedPosts username pic following'
        }
      })
        .then((response) => {
          this.setState({
            user: response.data.user,
            socs: response.data.user.societies,
            likedPosts: response.data.user.likedPosts,
            following: response.data.user.following

          })
        })
        .catch((error) => {
          console.log(error);
        });
    }

  componentDidMount() {

    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: user._id });

    this.getUserDetails();
    this.GetFollowedUsers();
  }
  
  // Gets the array of ID's that the user follows.
  GetFollowedUsers() 
  {
    var user = JSON.parse(localStorage.getItem('user'));

    axios.get('http://localhost:4000/users/get-followed-users', {
      params: {
        id: user._id,
      }
    })
      .then((response) => {
        this.setState({
          following: response.data.users,
        })
        // After getting array of id's, get posts.
        if(this.state.following.length !== 0)
          this.GetFollowingPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Gets the posts made by the array of followed user ID's
  GetFollowingPosts()
  {
    axios.get('http://localhost:4000/discussions/get-following-feed', {
      params: {
        ids: this.state.following
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      }
    })
    .then((response) => {
        console.log(response.data.discussions);

        this.setState({ 
          posts: response.data.discussions,
          isLoading: false
         });
         
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // Render hide/show comment section
  CheckPost(id, post_id) {
    var user = JSON.parse(localStorage.getItem('user'));
    if (id === user._id) {
      return (
        <div>
          <Button size="small" color="primary" onClick={() => { this.onDeletePost(id, post_id) }}>
            Delete Post
                </Button>
        </div>)
    }
  }

  onDeletePost(id, post_id) {

    const deletedPost = {
      id: id,
      Post_id: post_id
    }
    alert(post_id);
    axios.post('http://localhost:4000/users/deletePost', deletedPost)
      .then().catch();
  }

  render() {
    console.log(this.state.posts);
    var user = JSON.parse(localStorage.getItem('user'));    
    const discussionList = this.state.posts.map(discussion => {
      console.log(discussion.user_id);
      return (
        <Fragment key={discussion._id}>
        <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><div class="card">
          {discussion.full_pic && <Image src={discussion.full_pic} className="post-img" />}
          <div class="container">
            <h3><b>{discussion.title}</b></h3> 
            <p className="nowrap"> <Image alt="" className="profile-btn-wrapper-left" src={discussion.user_pic}  roundedCircle /></p> 
            <span><b> {discussion.user}</b> Posted in <b style={{ color: 'green' }}>
            {discussion.society == null ? (
              <span> <b style={{ color: 'green' }}>General</b></span>
               ) : (
              <span> <b style={{ color: 'green' }}>{discussion.society}</b></span>
              )}<br />
              </b></span><br/>
            <span style={{ color: 'gray', fontSize: 10 }}>({moment(discussion.time).startOf('seconds').fromNow()})</span><br/><hr/>
            <span className="reactions">
              <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                <span> <BsHeart  size={20} alt=""  className="icon"/> {discussion.likes}</span>
              </button></a>

              <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                <span><BsChat size={20}  className="icon"/> {discussion.comments.length}</span>
              </button></a>

          </span></div>
        </div></a><br/>
        </Fragment>
      )
    })

    return (
      <Container>
        {/* REACTJS HELMET */}
          <Helmet>
            <meta charSet="utf-8" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Home / Zoosh</title>

            {/* LINKS */}

            <link rel="canonical" href="http://mysite.com/example" />
            <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
          </Helmet>
        <Row>
        <Col sm>
            <div className="filter-options">
              <a href="/"><button className="feed-option-active"><BsHouse size={25} className="icon"/> Home</button></a><br/>
              <a href="/top"><button className="feed-option"><BsBarChart  size={25} className="icon"/>  Top</button></a>
              <a href="/explore"><button className="feed-option"><BiRocket  size={25} className="icon"/>  Explore</button></a>
              <a href="/notifications"><button className="feed-option"><BsBell  size={25} className="icon"/>  Notifications</button></a>
              <a href="/leaderboard"><button className="feed-option"><AiOutlineTrophy size={30} className="icon" />  Leaderboard</button></a>
              <a href="/search"><button className="feed-option"><BsSearch  size={25} className="icon"/>  Search</button></a>
              <a href="/me"><button className="feed-option-avatar"><Image alt={this.state.user.fullname} src={this.state.user.pic}  className="avatar-feed"/><b>@{this.state.user.username}</b></button></a>
              <br/><br/>
              <CreatePost/>
            </div>
          </Col>  
                  
          <Col >
          {this.state.isLoading && 
            <div className="feed">
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }}  />
                <Skeleton height={30} width={350} style={{ marginBottom: 10 }}  />
                <Skeleton height={30} width={300} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={400} style={{ marginBottom: 10 }}  /><br/>
            </div>}
            {this.state.user.following == 0  && 
            <div class="card4">
              <h4>It's pretty quiet in here...</h4>
              <a href="/users"><button className="community-btn-b">Find Friends</button></a>
            </div>}
            {!this.state.isLoading && <div className="feed">{discussionList}</div>}
            <ScrollToTop showUnder={1000}>
            <span><BsArrowUp size={25} /></span>
            </ScrollToTop>
          </Col>
          <Col sm>
            <Recommended /><Contributors />
          </Col>

        </Row>
      </Container>
    );
  }
}

// MODAL TO CREATE SOCIETY/CLUB
function CreatePost() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
        <div>
            <button className="write-button" onClick={() => setModalShow(true)}>Write a post</button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    </div>
  );
}

// MODEL HANDLE
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
      >
        <Modal.Header closeButton>
          <h5>Write a post</h5>
        </Modal.Header>
        <Modal.Body>
            <NewPost/>
        </Modal.Body>
      </Modal>
    );
  }