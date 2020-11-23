import React from 'react';
import '../../App.css';
import { Card, Badge, Tabs, Nav, Image } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { FaRegCommentDots } from 'react-icons/fa'
import CommentReply from '../Posts/CommentReply'
import PostAvatar from '../Posts/PostAvatar'
import PostLinks from '../Posts/PostLinks'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import Tag from '../../images/mailid.png'; // gives image path

class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      UserPosts: [],
      toggle: false,
      user: '',
      followedUsers: []
    };
  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: user._id });

    axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id
      }
    })
      .then((response) => {
        this.setState({
          user: response.data.user
        })
        if (response.data.user.following) {
          this.setState({
            followedUsers: response.data.user.following
          })
        }

      })
      .catch((error) => {
        console.log(error);
      });

  }

  openComments(e) {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


  render() {
    var { users } = this.state;
    var { posts } = this.state;
    var { UserPosts } = this.state;
    var { followedUsers } = this.state;

    console.log(JSON.stringify(followedUsers));

    if (followedUsers.length > 0) {
      return (
        <div className="global-feed">
          {/* POST TAB */}
          {followedUsers.map(user => (
            <div key={user._id}>
              <div hidden="true">
                {UserPosts.push(user.posts)}
                {/*  loop through users and add each post to an array */}
              </div>
              {console.log(UserPosts)}
            </div>
          ))}
          {UserPosts.map(post => (
            <div key={post._id} >
              {post.map(p => (
                <div hidden="true">
                  {posts.push(p)}

                </div>
              ))}
            </div>
          ))}

          {posts.sort((a, b) => b.time - a.time).map(post => (  // sorts the posts by the time posted
            <div>
              <Card className='feedPost'>

                <Card.Body>
                  <div className="-u-prof-stats" id="social-user">
                    {/* <span className="avatar-wrapper-left"><a href="/profile" className="post-user-profile" target="_blank"><PostAvatar/></a></span> */}
                    <span className="username-wrapper">
                      <div class="dropdown3">
                        <a href={"/u/?id=" + post.user_id} className="user-profile-shortlink">{post.user} <b className="user-score-post">1,200</b></a>
                        <div class="dropdown-content3">
                          <a href="#">{post.user}</a>
                          <a href="#"><Badge variant="primary">Admin</Badge> <Badge variant="secondary">Member</Badge></a>
                        </div>
                      </div>
                      {/* <a href={"/u/?id="+post.user_id}>{post.user} <b className="user-score-post-tag">1,231</b> {/*{post._id}*/}
                    </span><br />
                    <big className="text-muted">{moment(post.time).format("H:mma - MMM Do, YYYY.")}</big>

                    {/* <ProfileURL/> */}
                  </div>

                  <Card.Text className="fontPost">
                    {post.post} <br />

                    <div className="-user-tag">
                      {post.tags.map(tag => (
                        <div key={tag.value} className="-user-tag">
                          <a href="/profile"><Image className="tag-img" src={Tag} />{tag.label}</a>
                        </div>
                      ))}
                    </div>
                  </Card.Text>
                  <big className="text-muted-society">#{post.category}</big>
                  <div className="post-interactions">
                    <div><hr />
                      <span className="voting-btn"><FiThumbsUp id="thumb-up" size={20} /></span><span className="voting-btn"><FiThumbsDown id="thumb-down" size={20} /></span>
                      <span className="voting-btn"><FaRegCommentDots size={20} onClick={() => { this.setState({ toggle: !this.state.toggle }) }} className="feed-comment" /></span><PostLinks />

                      {
                        this.state.toggle ? <div className="-post-reply-comment-div"><CommentReply /></div> : null
                      }
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

      );
    } else {
      return (<div>Hello</div>)
    }
  }
}


export default PostList;