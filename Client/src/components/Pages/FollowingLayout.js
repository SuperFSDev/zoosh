import React, { Fragment } from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import { Image, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { Helmet } from 'react-helmet'
import cogoToast from 'cogo-toast'
import { BsBrightnessLow, BsChat } from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { RiHeart2Line, RiChat1Line, RiDeleteBinLine } from 'react-icons/ri'
import Clap from '../../images/clap.png'

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
      comments: [],
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

    axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id,
      }
    })
      .then((response) => {
        this.setState({
          following: response.data.user.following,
          claps: response.data.user.claps,
          likedPosts: response.data.user.likedPosts
        })
        this.GetFollowingPosts();
      })
      .catch((error) => {
        console.log(error);
      });


    // for (var i = 0; i < this.state.FollowingID.length; i++) {
    //   this.GetFollowedUser(this.state.FollowingID[i])
    // }
  }

  /*GetFollowedUser(FollowingID) {
    axios.get('http://localhost:4000/discussions/get-following-discussions', {
      params: {
        id: FollowingID,
      }
    })
      .then((response) => {
        console.log(response.data.discussion);
        this.setState({
          posts: this.state.posts.concat(response.data.discussion),
          isLoading: false,
        })

      })
      .catch((error) => {
        console.log(error);
      });
  }*/

  GetFollowingPosts()
  {
    console.log("Getting following posts");

    this.state.following.map(following_id => {
      axios.get('http://localhost:4000/discussions/get-following-feed', {
        params: {
          id: following_id
        }
      })
      .then((response) => {
          console.log(response.data);
          this.setState({
            posts: this.state.posts.concat(response.data.discussions),
            isLoading: false,
          }) 
      })
      .catch((error) => {
        console.log(error);
      });
    })

    console.log("finished map");
  }

  // Render hide/show comment section
  CheckPost(id, post_id) {
    var user = JSON.parse(localStorage.getItem('user'));
    if (id == user._id) {
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
      return (
        <Fragment key={discussion._id}>
          <Card className='discussion-post'>
            <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><CardContent>
              <span className="voting-btn">
                <span class="showhim"><a href={"/me"} className="post-link-a"><Image src={user.pic} className="profile-btn-wrapper-left" roundedCircle /> <b> {discussion.user}</b></a>
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
              <span className="title-post">{discussion.title}</span><br />
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
          </Card>
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
            {this.state.isLoading && <div><br /><Skeleton height={250} width={700} style={{ marginBottom: 10 }} count={5} /></div>}
            {!this.state.isLoading && <div>{discussionList}</div>}
          </Col>

          <Col sm><Recommended /><Contributors /></Col>
          <Col sm></Col>

        </Row>
      </Container>
    );
  }
}
