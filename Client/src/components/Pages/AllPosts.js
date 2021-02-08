import React, { Fragment } from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import { Image, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';
import Button from '@material-ui/core/Button';
import { BsBell, BsChat, BsGem, BsHeart, BsPerson } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import ScrollToTop from 'react-scroll-up'
import { Helmet } from 'react-helmet'
import {FaRegArrowAltCircleUp} from 'react-icons/fa'
import Clap from '../../images/clap.png'
import {BiPlanet} from 'react-icons/bi'

export default class AllPosts extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      isLoading: true,
      isLoadingUsers: true,
      comments: [],
      time: '',
      toggle: false,
      isSaved: false,
      socs: [],
      posts: [],
      likedPosts: [],
      user: '',
    };
  }

  componentDidMount() {
    // document.body.style.backgroundColor = "#F7F7F7";

    this.getUserDetails();
    this.getDiscussions();
    this.onDeletePost = this.onDeletePost.bind(this);

    // Fetch discussions every 1 second
    // this.timer = setInterval(() => this.getDiscussions(), 1000);
  }

  // Fetching the users Details
  getUserDetails() {
    var user = JSON.parse(localStorage.getItem('user'));
    axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id,
        fields: 'forums societies likedPosts'
      }
    })
      .then((response) => {
        this.setState({
          user: response.data.user,
          forums: response.data.user.forums,
          socs: response.data.user.societies,
          likedPosts: response.data.user.likedPosts
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Fetching the discussions from MongoDB Atlas
  getDiscussions() {
    axios.get('http://localhost:4000/discussions/get-discussions', {
      params: {
        fields: 'user user_id society time thumbnail_pic user_pic title content likes comments',
        sort: 'likes'
      }
    })
      .then((response) => {
        this.setState({
          discussions: response.data.discussions,
          isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // // Checks if the discussion feed is stored in session storage, if not
  // // then get discussions and store them.
  // checkSessionStorage() {
  //   // Retrieve from storage
  //   var stored_discussions = JSON.parse(sessionStorage.getItem("AllPosts"));

  //   console.log(stored_discussions);

  //   // If not stored, then get from database and store.
  //   if (stored_discussions !== null && stored_discussions.length !== 0) {
  //     this.setState({ discussions: stored_discussions, isLoading: false }, () => {
  //       console.log(this.state.discussions);
  //     })
  //   } else {
  //     // Get discussions from database.
  //     this.getDiscussions()
  //   }
  // }


  removeSaved = () => {
    this.setState({
      isSaved: false,
    })
  }

  addToReadingList(discussion, user_id) {

    const addDiscussion = {
      user_id: user_id,
      discussion: discussion._id,
    }
    // Adds society to societies array in user model.
    axios.post('http://localhost:4000/users/addToReadingList', addDiscussion)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  // Render hide/show comment section
  CheckPost(id, discussion_id) {
    var user = JSON.parse(localStorage.getItem('user'));
    if (id === user._id) {
      return (<div>
        <button size="small" color="primary" className="reaction-button" onClick={() => { this.onDeletePost(id, discussion_id) }}>
          <RiDeleteBinLine size={20} /> Delete Post
      </button>
      </div>)
    }
  }

  isLiked(discussion_id, user_id, likes) {
    if (this.state.likedPosts.includes(discussion_id) === true) {
      return (<div>
        <Button size="small" color="primary" onClick={() => { this.RemovefromLikedPosts(discussion_id, user_id, likes) }}>
          Unlike
              </Button>
      </div>)
    }
    else {
      return (<div>
        <Button size="small" color="primary" onClick={() => { this.addToLikedPosts(discussion_id, user_id, likes) }}>
          like
              </Button>
      </div>)

    }
  }


  onDeletePost(id, discussion_id) {
    axios.delete('http://localhost:4000/discussions/getDiscussions' + discussion_id) //deletes a discussion by ID
      .then()
      .catch();

    const RemovedDiscussion = {
      discussion_id: discussion_id
    }
    axios.post('http://localhost:4000/users/removeFromReadingList', RemovedDiscussion)
      .then().catch();
    window.location.reload(); //refreshes page automatically 

  }

  addToLikedPosts(discussion, user_id, likes) {

    const addDiscussion = {
      id: user_id,
      discussion: discussion,
    }
    // Adds the discussion to liked list
    axios.post('http://localhost:4000/users/addToLikedPosts', addDiscussion)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
    const UpdateLike = {
      discussion: discussion,
      likeCount: likes + 1
    }
    axios.post('http://localhost:4000/discussions/UpdateLikeCount', UpdateLike)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  RemovefromLikedPosts(discussion, user_id, likes) {

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
    const UpdateLike = {
      discussion: discussion,
      likeCount: likes - 1
    }
    axios.post('http://localhost:4000/discussions/UpdateLikeCount', UpdateLike)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    var { discussions } = this.state;
    var user = JSON.parse(localStorage.getItem('user'));

    const discussionList = discussions.map(discussion => {
      console.log(discussion);
      return (
        <Fragment key={discussion._id}>
        <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><div class="card">
          {discussion.thumbnail_pic == null && <></>}
          {discussion.thumbnail_pic != null && <Image src={discussion.thumbnail_pic} className="post-img"/>}
          <div class="container">
            <h3><b>{discussion.title}</b></h3> 
            <p className="nowrap"> <Image alt="" className="profile-btn-wrapper-left" src={discussion.user_pic}  roundedCircle /><b> @{discussion.user}</b></p> 
            <span>Posted in <b style={{ color: 'green' }}>
            {discussion.society == null ? (
              <span> in <b style={{ color: 'green' }}>General</b></span>
               ) : (
              <span> in <b style={{ color: 'green' }}>{discussion.society}</b></span>
              )}<br />
              </b></span><br/>
            <span style={{ color: 'gray', fontSize: 10 }}>({moment(discussion.time).startOf('seconds').fromNow()})</span><br/>
            <span className="reactions">
            <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                  {discussion.likes === 0 && <span> <Image src={Clap} size={20} alt=""  className="icon"/> Be the first</span>}
                  {discussion.likes === 1 && <span> <Image src={Clap} size={20} alt=""  className="icon"/> {discussion.likes}</span>}
                  {discussion.likes > 1 && <span> <Image src={Clap} size={20} alt=""  className="icon"/> {discussion.likes}</span>}
                </button></a>


                <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                  {discussion.comments.length === 0 && <span><BsChat size={20}  className="icon"/> Add comment</span>}
                  {discussion.comments.length === 1 && <span><BsChat size={20}  className="icon"/> {discussion.comments.length}</span>}
                  {discussion.comments.length > 1 && <span><BsChat size={20}  className="icon"/> {discussion.comments.length}</span>}
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
          <title>Home / Website</title>

          {/* LINKS */}

          <link rel="canonical" href="http://mysite.com/example" />
          <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet>
        <Row>
        <Col sm>
            <div className="filter-options">
              <a href="/"><button className="feed-option"><BsPerson size={25} className="icon"/> Following</button></a><br/>
              <a href="/top"><button className="feed-option-active"><BsGem  size={25} className="icon"/>  Top</button></a>
              <a href="/explore"><button className="feed-option"><BiPlanet  size={25} className="icon"/>  Explore</button></a>
              <a href="/notifications"><button className="feed-option"><BsBell  size={25} className="icon"/>  Notifications</button></a>
              <a href="/new"><button className="write-button">Write a post</button></a>
            </div>
          </Col>  
                  
          <Col >
            {this.state.isLoading && 
            <div className="feed">
              <div className="card" style={{padding:30, marginBottom: 20}}>
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }}  />
                <Skeleton height={30} width={350} style={{ marginBottom: 10 }}  />
                <Skeleton height={30} width={300} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={400} style={{ marginBottom: 10 }}  /><br/>
              </div>
              <div className="card" style={{padding:30, marginBottom: 20}}>
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }}  />
                <Skeleton height={30} width={350} style={{ marginBottom: 10 }}  />
                <Skeleton height={30} width={300} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={400} style={{ marginBottom: 10 }}  /><br/>
              </div>
              <div className="card" style={{padding:30, marginBottom: 20}}>
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }}  />
                <Skeleton height={30} width={350} style={{ marginBottom: 10 }}  />
                <Skeleton height={30} width={300} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={400} style={{ marginBottom: 10 }}  /><br/>
              </div>
              <div className="card" style={{padding:30, marginBottom: 20}}>
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }}  />
                <Skeleton height={30} width={350} style={{ marginBottom: 10 }}  />
                <Skeleton height={30} width={300} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={400} style={{ marginBottom: 10 }}  /><br/>
              </div>
            </div>}
            {!this.state.isLoading && <div className="feed">{discussionList}</div>}
            <ScrollToTop showUnder={1000}>
            <span><FaRegArrowAltCircleUp size={25} /></span>
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