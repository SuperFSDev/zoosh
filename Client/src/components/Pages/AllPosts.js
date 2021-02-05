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
import Clap from '../../images/clap.png'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { BsArrowUp } from 'react-icons/bs'
import { RiChat1Line, RiDeleteBinLine } from 'react-icons/ri'
import ScrollToTop from 'react-scroll-up'
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
    document.body.style.backgroundColor = "#F7F7F7";

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
        id: user._id
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

  // Fetching the discussions
  getDiscussions() {
    axios.get('http://localhost:4000/discussions/get-discussions', {
      params: {
        fields: 'user user_id society time thumbnail_pic user_pic title content likes comments',
        sort: 'likes'
      }
    })
      .then((response) => {
        console.log(response.data);
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
          <div className='discussion-post'>
            <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><CardContent>
              <span className="voting-btn">
                <span class="showhim"><a href={"/u/?id=" + discussion.user_id} className="post-link-a"><Image alt="" src={discussion.user_pic} className="profile-btn-wrapper-left" roundedCircle /> <b> {discussion.user}</b></a>
                  <span class="showme"> <b>{discussion.user}</b></span></span>
                {discussion.society == null ? (
                  <span> in <b style={{ color: 'green' }}>General</b></span>
                ) : (
                    <span> in <b style={{ color: 'green' }}>{discussion.society}</b></span>
                  )}<br />
                <span style={{ color: 'gray', fontSize: 10 }}>({moment(discussion.time).startOf('seconds').fromNow()})</span>

                {discussion.thumbnail_pic == null && <div></div>}
                {discussion.thumbnail_pic && <Image alt="" className="post-image" src={discussion.thumbnail_pic} width={200} height={125} />}
              </span><br />
              <span className="heading">{discussion.title}</span><br />
              <span className="content-post">{discussion.content.slice(0, 200)}</span>
            </CardContent></a>
            <CardActions>
              <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                {discussion.likes === 0 && <></>}
                {discussion.likes === 1 && <span> <Image src={Clap} size={20} alt="" /> {discussion.likes} reaction</span>}
                {discussion.likes > 1 && <span> <Image src={Clap} size={20} alt="" /> {discussion.likes} reactions</span>}
              </button></a>


              <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                <RiChat1Line size={20} />
                {discussion.comments.length === 0 && <span> Add comment</span>}
                {discussion.comments.length === 1 && <span> {discussion.comments.length} comment</span>}
                {discussion.comments.length > 1 && <span> {discussion.comments.length} comments</span>}

              </button></a>

            </CardActions>

          </div>

        </Fragment>
      )
    })

    return (
      <Container>
        <Row>
          <Col sm className="d-none d-lg-block"></Col>
          <Col sm className="feed">
            <div className="filter-options">
              <a href="/"><button className="feed-option">Following</button></a>
              <a href="/top"><button className="feed-option-active">Top</button></a>
              <a href="/new"><button className="write-button">Write a Post</button></a>

            </div>


            {this.state.isLoading &&
              <div>
                <div className="discussion-post" style={{ padding: 30 }}>
                  <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }} />
                  <Skeleton height={30} width={350} style={{ marginBottom: 10 }} />
                  <Skeleton height={30} width={300} style={{ marginBottom: 10 }} /><br />
                  <Skeleton height={30} width={400} style={{ marginBottom: 10 }} /><br />
                  <Skeleton height={30} width={350} style={{ marginBottom: 10 }} /><br />

                </div>
                <div className="discussion-post" style={{ padding: 30 }}>
                  <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }} />
                  <Skeleton height={30} width={350} style={{ marginBottom: 10 }} />
                  <Skeleton height={30} width={300} style={{ marginBottom: 10 }} /><br />
                  <Skeleton height={30} width={400} style={{ marginBottom: 10 }} /><br />
                  <Skeleton height={30} width={350} style={{ marginBottom: 10 }} /><br />

                </div>
                <div className="discussion-post" style={{ padding: 30 }}>
                  <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }} />
                  <Skeleton height={30} width={350} style={{ marginBottom: 10 }} />
                  <Skeleton height={30} width={300} style={{ marginBottom: 10 }} /><br />
                  <Skeleton height={30} width={400} style={{ marginBottom: 10 }} /><br />
                  <Skeleton height={30} width={350} style={{ marginBottom: 10 }} /><br />

                </div>
                <div className="discussion-post" style={{ padding: 30 }}>
                  <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }} />
                  <Skeleton height={30} width={350} style={{ marginBottom: 10 }} />
                  <Skeleton height={30} width={300} style={{ marginBottom: 10 }} /><br />
                  <Skeleton height={30} width={400} style={{ marginBottom: 10 }} /><br />
                  <Skeleton height={30} width={350} style={{ marginBottom: 10 }} /><br />

                </div>
              </div>}
            {!this.state.isLoading && <div>{discussionList}</div>}
            <ScrollToTop showUnder={1000}>
              <span className="back-to-top"><BsArrowUp size={25} />Back to top</span>
            </ScrollToTop>
          </Col>

          <Col sm><Recommended /><Contributors /></Col>
          <Col sm></Col>

        </Row>
      </Container>
    );
  }
}