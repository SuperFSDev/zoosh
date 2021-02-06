import React from 'react';
import '../../../assets/App.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import { Row, Col, Container,Form } from 'react-bootstrap';
import moment from 'moment'
import { Image } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import Clapping from '../../../images/clap-hands.png'
import Clap from '../../../images/clap.png'
import { RiShieldStarLine } from 'react-icons/ri'
import ShowMoreText from 'react-show-more-text';
import cogoToast from 'cogo-toast'


export default class DiscussionPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: '',
      discussions: [],
      likedPosts: [],
      discussion_id: '',
      comments: [],
      readingList: [],
      societies: [],
      isLoading: true,
      hearts: 0,
      views: 0,
      isSaved: false,
      comment: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
  }

  componentDidMount() {
    var id = new URLSearchParams(this.props.location.search).get("id");

    // document.body.style.backgroundColor = "#F7F7F7";
    this.getUserDetails();
    axios.get('http://localhost:4000/discussions/get-discussion-page', {
      params: {
        id: id,
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({
          discussion: response.data.discussion,
          comments: response.data.discussion.comments,
          isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error);
      });

  }
  async getUserDetails() {
    var user = JSON.parse(localStorage.getItem('user'));
    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id,
        fields: "likedPosts readingList"
      }
    })

      .then((response) => {
        this.setState({
          likedPosts: response.data.user.likedPosts,
          readingList: response.data.user.readingList
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addPageView = () => {

    const { views } = this.state;

    this.setState({
      views: views + 1
    })
  }

  onChangeComment(e) {
    this.setState({
      comment: e.target.value
    });
  }

  addToReadingList(discussion, user_id) {

    const addDiscussion = {
      user_id: user_id,
      discussion: discussion,
    }
    // Adds society to societies array in user model.
    axios.post('http://localhost:4000/users/addToReadingList', addDiscussion)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
    // alert("Discussion added to your reading list!")
    cogoToast.success(
      <div>
        <div>Added to your reading list!</div>
      </div>
    );
  }
  RemoveFromReadingList(discussion, user_id) {

    const RemovedDiscussion = {
      user_id: user_id,
      discussion: discussion,
    }
    // Adds society to societies array in user model.
    axios.post('http://localhost:4000/users/removeFromReadingList', RemovedDiscussion)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
    // alert("Discussion added to your reading list!")
    cogoToast.warn(
      <div>
        <div>Removed from your reading list!</div>
      </div>
    );

  }



  addToLikedPosts(discussion, discussion_uID, user_id, likes, user_name, title, user_pic) {

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

    const notify = {
      id: discussion_uID,
      notification: {
        user: user_id,
        user_name: user_name,
        discussion: discussion,
        discussion_title: title,
        user_pic: user_pic,
        message: "liked your post",
        time: new Date().getTime()
      }
    }
    // Adds the discussion to liked list
    axios.post('http://localhost:4000/users/notify', notify)
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
    // alert(this.state.posts.likes);
    axios.post('http://localhost:4000/discussions/UpdateLikeCount', UpdateLike)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
    window.location.reload();
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
    window.location.reload();
  }

  onSubmit(e) {
    var user = JSON.parse(localStorage.getItem('user'));
    const newComment = {
      _id: this.state.discussion._id,
      comment: {
        user_id: user._id,
        user_name: user.fullname,
        comment: this.state.comment,
        time: new Date().getTime(),
        user_img: user.pic
      }

    }
    const notify = {
      id: this.state.discussion.user_id,
      notification: {
        user: user._id,
        user_name: user.fullname,
        user_pic: user.pic,
        discussion: this.state.discussion._id,
        discussion_title: this.state.discussion.title,
        message: "commented on post",
        time: new Date().getTime()
      }
    }
    axios.post('http://localhost:4000/discussions/CreateComment', newComment)
      .then()
      .catch();
    // Adds the discussion to liked list
    axios.post('http://localhost:4000/users/notify', notify)
      .then()
      .catch();
    window.location.reload();
  }


  isLiked(discussion_id, discussion_uID, user_id, likes, user_fullname, title, user_pic) {
    if (this.state.likedPosts.includes(discussion_id) === true) {
      return (<span className="voting-btn"><button className="standard-option-btn-post" onClick={() => { this.RemovefromLikedPosts(discussion_id, user_id, likes) }}>
        <Image src={Clapping} size={30} /> {this.state.discussion.likes}</button><br /></span>
      )
    }
    else {
      return (<span className="voting-btn"><button aria-label="add" className="standard-option-btn-post" onClick={() => { this.addToLikedPosts(discussion_id, discussion_uID, user_id, likes, user_fullname, title, user_pic) }}>
        <Image src={Clap} size={30} /> {this.state.discussion.likes} </button></span>
      )
    }
  }

  isInReadingList(discussion_id, user_id) {
    if (this.state.readingList.includes(discussion_id) === true) {
      return (<span className="voting-btn">
        <button aria-label="remove" className="standard-option-btn-post" onClick={() => { this.RemoveFromReadingList(discussion_id, user_id) }}><BsBookmarkFill size={30} /></button></span>
      )
    }
    else {
      return (<span className="voting-btn">
        <button aria-label="add" className="standard-option-btn-post" onClick={() => { this.addToReadingList(discussion_id, user_id) }}><BsBookmark size={30} /></button></span>
      )
    }
  }

  render() {
    var user = JSON.parse(localStorage.getItem('user'));
    console.log(this.state.likedPosts);

    return (
      <>
        {/* REACTJS HELMET */}
        <Helmet>
          <meta charSet="utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{this.state.discussion.user}</title>

          {/* LINKS */}
          <link rel="canonical" href="http://mysite.com/example" />
          <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet>

        <Container>
          <Row>
            <Col sm={2}>
              <div className="post-reactions">
                <span>
                  <Image alt={user.fullname} src={user.pic} className="user-image"  roundedCircle/>
                  <b>{this.state.discussion.user}</b><br />
                  <a href={"/u/?id=" + this.state.discussion.user_id}><button aria-label="view" className="standard-button">View Profile</button></a>
                </span>

                {this.isLiked(this.state.discussion._id, this.state.discussion.user_id, user._id, this.state.discussion.likes, user.fullname, this.state.discussion.title, user.pic)}
                <br />
                {this.isInReadingList(this.state.discussion._id, user._id,)}
                <br />
                <span className="voting-btn"><button aria-label="community" className="standard-option-btn-post" ><RiShieldStarLine size={30} /></button></span>

              </div>
            </Col>
            <Col sm={8}>
              <div className="discussion-container">


                <p>
                  <p className="post-header">{this.state.discussion.title}</p>
                  <p style={{ fontSize: 14, color: 'gray' }}>
                    <a href={"/u/?id=" + this.state.discussion.user_id} style={{ textDecoration: 'none', color: 'black' }}>
                      <span class="showhim">
                        <b>{this.state.discussion.user}</b> - {moment(this.state.discussion.time).format("MMM Do")}
                        <span class="showme"> <b>{this.state.discussion.user}</b></span>
                      </span>
                    </a>
                  </p>

                  <Image src={this.state.discussion.full_pic} className="thumbnail" />
                  {/* <img src={this.state.discussion.full_pic} className="thumbnail"/> */}
                </p>

                <p className="post-content">{this.state.discussion.content}</p>


                <div className="spacing"></div>
                <span className="d-inline-block">
                  <div className="post-reactions-mobile">
                    {this.isLiked(this.state.discussion._id, this.state.discussion.user_id, user._id, this.state.discussion.likes)}
                    {this.isInReadingList(this.state.discussion._id, user._id,)}
                    <span className="voting-btn"><button aria-label="community" className="standard-option-btn-post" ><RiShieldStarLine size={30} /></button></span>
                  </div>
                </span>
                <hr />

                <div className="comment-container" id="responses">

                  <h4>Responses ({this.state.comments.length})</h4>

                  <div className="comment-box-acc">
                    <Avatar alt="User" src={user.pic} /><br />
                    <Form>
                      <label>
                        <textarea required rows={2} cols={40} className="comment-input" multiple placeholder="Leave a comment" value={this.state.comment} onChange={this.onChangeComment} />
                        <button aria-label="submit" className="standard-button" onClick={this.onSubmit}>Publish</button>
                      </label>
                    </Form>
                  </div>

                  <div className="users-comment">
                    {this.state.comments.sort((a, b) => b.time - a.time).map(comment => (
                      <div className="comment-box">
                        <span >
                          <Avatar alt="User" src={comment.user_img} /><a href={"/u/?id=" + comment.user_id} className="post-link-a"><b>{comment.user_name} </b></a>
                          {moment(comment.time).startOf('seconds').fromNow()}
                          <ShowMoreText
                            lines={1}
                            more='Read more'
                            less='Read less'
                            onClick={this.executeOnClick}
                            expanded={false}
                            font={20}
                            width={1000}
                            height={100}
                          >
                            <p className="post-content">{comment.comment}</p>
                          </ShowMoreText>
                          <span><button aria-label="clap" className="standard-option-btn-comment">
                            <Image alt="Clap" src={Clap} size={30} /></button></span>
                        </span>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
            <Col md></Col>

          </Row>
        </Container>



      </>
    );
  }
}


