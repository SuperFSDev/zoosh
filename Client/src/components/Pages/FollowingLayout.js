import React, { Fragment } from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import { Image, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { RiChat1Line } from 'react-icons/ri'
import Clap from '../../images/clap.png'
import ScrollToTop from 'react-scroll-up'
import {BsArrowUp} from 'react-icons/bs'
import { Helmet } from 'react-helmet'
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

  componentDidMount() {
    document.body.style.backgroundColor = "#F7F7F7";

    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: user._id });

    this.CheckSessionStorage();
  }

  // Checks if the discussion feed is stored in session storage, if not
  // then get discussions and store them.
  CheckSessionStorage() {
    // Retrieve from storage
    var stored_discussions = JSON.parse(sessionStorage.getItem("FollowedPosts"));

    // If not stored, then get from database and store.
    if (stored_discussions !== null && stored_discussions.length !== 0) {
      this.setState({ posts: stored_discussions, isLoading: false }, () => {
        console.log(this.state.discussions);
      })
    } else {
      // Get discussions from database.
      this.GetFollowedUsers()
    }
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
        sessionStorage.setItem('FollowedPosts', JSON.stringify(response.data.discussions));
        this.setState({
          posts: response.data.discussions,
          isLoading: false,
        }) 
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
    var user = JSON.parse(localStorage.getItem('user'));    
    const discussionList = this.state.posts.map(discussion => {
      console.log(discussion.user_id);
      return (
        <Fragment key={discussion._id}>
          <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><div className='discussion-post' >
            <div class="one">
              <div class="two">
                <span class="showhim"><a href={"/u/?id=" + discussion.user_id} className="post-link-a"><Image alt="" src={discussion.user_pic} className="profile-btn-wrapper-left" roundedCircle /> <b> {discussion.user}</b></a>
                  <span class="showme"> <b>{discussion.user}</b></span></span>
                    {discussion.society == null ? (
                      <span> in <b style={{ color: 'green' }}>General</b></span>
                    ) : (
                        <span> in <b style={{ color: 'green' }}>{discussion.society}</b></span>
                )}<br />
                <h2>{discussion.title}</h2>
                <p>{discussion.content.slice(0,100)}</p>
                <span style={{ color: 'gray', fontSize: 10 }}>({moment(discussion.time).startOf('seconds').fromNow()})</span><br/>
                  <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                  {discussion.likes === 0 && <span> <Image src={Clap} size={20} alt="" /> Be the first</span>}
                  {discussion.likes === 1 && <span> <Image src={Clap} size={20} alt="" /> {discussion.likes} reaction</span>}
                  {discussion.likes > 1 && <span> <Image src={Clap} size={20} alt="" /> {discussion.likes} reactions</span>}
                </button></a>


                <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                  <RiChat1Line size={20} />
                  {discussion.comments.length === 0 && <span> Add comment</span>}
                  {discussion.comments.length === 1 && <span> {discussion.comments.length} comment</span>}
                  {discussion.comments.length > 1 && <span> {discussion.comments.length} comments</span>}

                </button></a>
              </div>
              <div class="two">
                {discussion.thumbnail_pic == null && <div></div>}
                {discussion.thumbnail_pic && <Image alt="" className="post-image" src={discussion.thumbnail_pic} width={200} height={125} />}
              </div>
            </div>
          </div></a>
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
            <title>Home / Website</title>

            {/* LINKS */}

            <link rel="canonical" href="http://mysite.com/example" />
            <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
          </Helmet>
        <Row>
          <Col sm></Col>
          <Col sm>
            <div className="filter-options">
              <a href="/"><button className="feed-option-active">Following</button></a>
              <a href="/top"><button className="feed-option">Top</button></a>
              {/* <a href="/new"><button className="write-button">Write a Post</button></a> */}

            </div>
            {this.state.posts.length === 0 && <div>Empty</div>}
            {this.state.isLoading && 
            <div>
              <div className="discussion-post" style={{padding:30}}>
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }}  />
                <Skeleton height={30} width={350} style={{ marginBottom: 10 }}  />
                <Skeleton height={30} width={300} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={400} style={{ marginBottom: 10 }}  /><br/>
              </div>
              <div className="discussion-post" style={{padding:30}}>
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }}  />
                <Skeleton height={30} width={350} style={{ marginBottom: 10 }}  />
                <Skeleton height={30} width={300} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={400} style={{ marginBottom: 10 }}  /><br/>
              </div>
              <div className="discussion-post" style={{padding:30}}>
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }}  />
                <Skeleton height={30} width={350} style={{ marginBottom: 10 }}  />
                <Skeleton height={30} width={300} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={400} style={{ marginBottom: 10 }}  /><br/>
              </div>
              <div className="discussion-post" style={{padding:30}}>
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }}  />
                <Skeleton height={30} width={350} style={{ marginBottom: 10 }}  />
                <Skeleton height={30} width={300} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={400} style={{ marginBottom: 10 }}  /><br/>
              </div>
            </div>}
            {!this.state.isLoading && <div>{discussionList}</div>}
            <ScrollToTop showUnder={1000}>
              <span className="back-to-top"><BsArrowUp size={25}/>Back to top</span>
            </ScrollToTop>
          </Col>

          <Col sm><Recommended /><Contributors /></Col>
          <Col sm></Col>

        </Row>
      </Container>
    );
  }
}
