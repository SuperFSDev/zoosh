import React, { Fragment } from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import { Image, Row, Col, Container, Modal } from 'react-bootstrap'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';
import Button from '@material-ui/core/Button';
import { BsBell, BsChat, BsSearch, BsArrowUp, BsHouse, BsHeart, BsBarChartFill } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import ScrollToTop from 'react-scroll-up'
import { Helmet } from 'react-helmet'
import { BiRocket } from 'react-icons/bi'
import NewPost from './NewPost';
import Avatar from '@material-ui/core/Avatar';

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
        fields: 'forums societies likedPosts username pic'
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
        fields: 'user user_id society time full_pic user_pic title content likes comments',
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
            {discussion.full_pic === null && <div></div>}
            {discussion.full_pic != null && <Image src={discussion.full_pic} className="post-img" />}
            <div class="container">
              <h2><b>{discussion.title}</b></h2>

              <span><p className="nowrap"> <Image alt="" className="profile-btn-wrapper-left" src={discussion.user_pic} roundedCircle /></p>  <b> {discussion.user}</b> Posted in <b style={{ color: 'rgb(52,199,89)' }}>
                {discussion.society == null ? (
                  <span> <b style={{ color: 'rgb(52,199,89)' }}>General</b></span>
                ) : (
                  <span> <b style={{ color: 'rgb(52,199,89)' }}>{discussion.society}</b></span>
                )}<br />
              </b></span><br />
              <span style={{ color: 'gray', fontSize: 10 }}>({moment(discussion.time).startOf('seconds').fromNow()})</span><br /><hr />
              <span className="reactions">
                <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                  <span><BsHeart size={20} alt="" className="icon" /> {discussion.likes}</span>
                </button></a>


                <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                  <span><BsChat size={20} className="icon" /> {discussion.comments.length}</span>
                </button></a>
              </span></div>
          </div></a><br />
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
          <title>Top / Zoosh</title>

          {/* LINKS */}

          <link rel="canonical" href="http://mysite.com/example" />
          <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet>
        <Row>
          <Col sm>
            <div className="filter-options">
              <a href="/"><button className="feed-option"><BsHouse size={25} className="icon" /> Home</button></a><br />
              <a href="/top"><button className="feed-option-active"><BsBarChartFill size={25} className="icon" />  Top</button></a>
              <a href="/explore"><button className="feed-option"><BiRocket size={25} className="icon" />  Explore</button></a>
              <a href="/notifications"><button className="feed-option"><BsBell size={25} className="icon" />  Notifications</button></a>
              <a href="/search"><button className="feed-option"><BsSearch size={25} className="icon" />  Search</button></a>
              <a href="/me"><button className="feed-option-avatar"><Image alt={this.state.user.fullname} src={this.state.user.pic} className="avatar-feed" /><b>@{this.state.user.username}</b></button></a>
              <br /><br />
              <CreatePost />
            </div>
          </Col>

          <Col >
            {this.state.isLoading &&
              <div className="feed">
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }} />
                <Skeleton height={30} width={350} style={{ marginBottom: 10 }} />
                <Skeleton height={30} width={300} style={{ marginBottom: 10 }} /><br />
                <Skeleton height={30} width={400} style={{ marginBottom: 10 }} /><br />
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
        <NewPost />
      </Modal.Body>
    </Modal>
  );
}