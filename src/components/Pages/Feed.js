import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import FeedOptions from '../Lists/FeedOptions'
import QuickOptions from '../Common/QuickOptions'
import InfiniteScroll from '../Common/InfiniteScroll'
import { Card, Badge } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { FaRegCommentDots, FaTintSlash } from 'react-icons/fa'
import TextField from '@material-ui/core/TextField';
import PostLinks from '../Posts/PostLinks'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'


class Feed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      posts: [],
      FollowingID:'',
      comment:''
    
    };
    this.onChangeComment = this.onChangeComment.bind(this);
  }

    async componentDidMount() {
      document.body.style.backgroundColor = "#f0f2f5";

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

    onChangeComment(e) {
      this.setState({
          comment: e.target.comment
      });
  }


render(){
  return (
     <div>
      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
        <QuickOptions/>
        <div>
          <div className="post-option-btns">
              <button className="post-option-btn-item-global">Global</button>
              <a href="/discussions"><button className="post-option-btn-item">Community</button></a>
              <button className="post-option-btn-item">Media</button>
              <button className="post-option-btn-item">Links</button>
          </div>

          <div className="global-feed">
            {/* POST TAB */}
              {this.state.posts.sort((a, b) => b.time - a.time).map(post => (  // sorts the posts by the time posted
                    <div>
                      <Card className='feedPost'>

                        <Card.Body>
                          <div className="-u-prof-stats" id="social-user">
                            <span className="username-wrapper">
                              <div class="dropdown3">
                                <a href={"/u/?id=" + post.user_id} className="user-profile-shortlink">{post.user} <b className="user-score-post">1,200</b></a>
                                <div class="dropdown-content3">
                                  <a href="#">{post.user}</a>
                                  <a href="#"><Badge variant="primary">Admin</Badge> <Badge variant="secondary">Member</Badge></a>
                                </div>
                              </div>
                              <big className="text-muted">{moment(post.time).format("H:mma - MMM Do, YYYY.")}</big>

                              {/* <a href={"/u/?id="+post.user_id}>{post.user} <b className="user-score-post-tag">1,231</b> {/*{post._id}*/}
                            </span><br />
                          </div>

                          <Card.Text className="fontPost">
                            {post.post} <br />

                            {/* <div className="-user-tag">
                              {post.tags.map(tag => (
                                <div key={tag.value} className="-user-tag">
                                  <a href="/profile"><Image className="tag-img" src={Tag} />{tag.label}</a>
                                </div>
                              ))}
                            </div> */}
                          </Card.Text>
                          {/* <big className="text-muted-society">#{post.category}</big> */}
                          <div className="post-interactions">
                            <div>
                              <span className="voting-btn"><MdThumbUp id="thumb-up" size={20} /></span><span className="voting-btn"><MdThumbDown id="thumb-down" size={20} /></span>
                              <span className="voting-btn"><FaRegCommentDots size={20} onClick={() => { this.setState({ toggle: !this.state.toggle }) }} className="feed-comment" /></span><PostLinks />
                              <TextField
                               id="outlined-textarea"
                                  label="Comment"
                                  style={{ margin: 1, fontSize: 20, maxLength:150, paddingBottom:10}}         
                                  placeholder="Comment"         
                                  fullWidth
                                  required
                                  multiline
                                  variant="outlined"
                                  margin="normal"
                                  value={this.state.comment}
                                  onChange={this.onChangeComment}
                                  InputLabelProps={{
                                  shrink: true,
                                                   }}
                                                  />

                              
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
        {/*<InfiniteScroll/>*/}
      </div>

      <div className="containerFeedRight">
        <Recommended/>  
        <Contributors/>  
      </div>
  </div>
  );
 }
}

export default Feed;