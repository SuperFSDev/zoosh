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

    axios.get('http://localhost:4000/users/get-followed-users', {
      params: {
        id: user._id,
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({
          following: response.data.users,
        })
        this.GetFollowingPosts();
      })
      .catch((error) => {
        console.log(error);
      });

  }

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
        console.log(response);
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
          <div className='discussion-post'>
            <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><CardContent>
              <span className="voting-btn">
                <span class="showhim"><a href={"/u/?id=" + discussion.user_id} className="post-link-a"><Image src={user.pic} className="profile-btn-wrapper-left" roundedCircle /> <b> {discussion.user}</b></a>
                  <span class="showme"> <b>{discussion.user}</b></span></span>
                {discussion.society == null ? (
                  <span> in <b style={{ color: 'green' }}>General</b></span>
                ) : (
                    <span> in <b style={{ color: 'green' }}>{discussion.society}</b></span>
                  )}<br />
                <span style={{ color: 'gray', fontSize: 12 }}>({moment(discussion.time).startOf('seconds').fromNow()})</span>


                {discussion.thumbnail_pic == null && <div></div>}
                {discussion.thumbnail_pic && <Image className="post-image" src={discussion.thumbnail_pic} />}
              </span><br />
              <span className="heading">{discussion.title}</span><br />
              <span className="content-post">{discussion.content.slice(0, 200)}</span>
            </CardContent></a>
            <CardActions>

              <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary" >
                {discussion.likes === 0 && <></>}
                {discussion.likes === 1 && <span> <Image src={Clap} size={20} /> {discussion.likes} reaction</span>}
                {discussion.likes > 1 && <span> <Image src={Clap} size={20} /> {discussion.likes} reactions</span>}
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
          <Col sm></Col>
          <Col sm>
            <div className="filter-options">
              <a href="/"><button className="feed-option-active">Following</button></a>
              <a href="/top"><button className="feed-option">Top</button></a>
              <a href="/new"><button className="write-button">Write a Post</button></a>

            </div>
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
