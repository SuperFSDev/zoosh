import React from 'react';
import '../../App.css';
import { Card, Badge, Tabs, Nav, Image } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { FaRegCommentDots, FaTintSlash } from 'react-icons/fa'
import CommentReply from '../Posts/CommentReply'
import PostAvatar from '../Posts/PostAvatar'
import PostLinks from '../Posts/PostLinks'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import Tag from '../../images/mailid.png'; // gives image path
import { BsConeStriped } from 'react-icons/bs';

class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      posts: [],
      FollowingID:'',
      empty:[]
    
    };
    
  }

  async componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: user._id });

    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id
      }
    })
      .then((response) => {
        this.setState({
          FollowingID: response.data.user.following
          
        })

      })
      .catch((error) => {
        console.log(error);
      });

      for (var i = 0; i < this.state.FollowingID.length; i++) {
        this.GetFollowedUser(this.state.FollowingID[i])
      } 
     
    }

    async GetFollowedUser(FollowingID){
    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id:FollowingID
      }
    })
      .then((response) => {
        this.setState({
          posts: this.state.posts.concat(response.data.user.posts)
        })
        console.log("Posts = " + this.state.posts);

      })
      .catch((error) => {
        console.log(error);
      });
    }
      
  

  render() {

   
  return (
    <div>
    <div className="post-option-btns">
        <button className="post-option-btn-item">Global</button>
        <a href="/discussions"><button className="post-option-btn-item">Discussions</button></a>
        <button className="post-option-btn-item">Links</button>
    </div>

    <div className="global-feed">
      {/* POST TAB */}
        {this.state.posts.sort((a, b) => b.time - a.time).map(post => (  // sorts the posts by the time posted
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
        </div>

      );
    } 
  
    
  }



export default PostList;
