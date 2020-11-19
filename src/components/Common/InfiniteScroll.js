import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import { Card, Badge, Tabs,Nav,Image } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {FaRegCommentDots} from 'react-icons/fa'
import CommentReply from '../Posts/CommentReply'
import PostLinks from '../Posts/PostLinks'
import {FiThumbsUp,FiThumbsDown} from 'react-icons/fi'

export default class Infinite extends React.Component {
  state = {
    items: Array.from({ length: 20 })
  };

  
componentDidMount() {
    axios.get('http://localhost:4000/users/getUsers')
    .then((response)=>{
        this.setState({users: response.data.users
                                                  })
    })
    .catch((error)=>{
        console.log(error);
    });
  }
  
    constructor(props) {
      super(props);
      this.state = {
        users: [],
        posts: [],
        toggle:false
      };
  
    } 
  

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        posts: this.state.posts.concat(Array.from({ length: 5 }))
      });
    }, 500);
  };

  render() {
  var{users} = this.state;
  var{posts} = this.state;
    return (
      <div>
        <InfiniteScroll
          dataLength={this.state.posts.length}
          next={this.fetchMoreData}
          hasMore={true}
        >
          {this.state.posts.map((i, post) => (
            <Card className="feedPost" key={post}>
              {post.user}
              <Card.Body>          
                 <div className="-u-prof-stats" id="social-user">
                     {/* <span className="avatar-wrapper-left"><a href="/profile" className="post-user-profile" target="_blank"><PostAvatar/></a></span> */}
                     <span className="username-wrapper"><a href={"/user?id="+post.user_id}>{post.user} <b className="user-score-post-tag">1,231</b> {/*{post._id}*/}</a></span><br/>
                     <big  className="text-muted">{moment(post.time).format("H:mma - MMM Do, YYYY.")}</big>

                     {/* <ProfileURL/> */}
                 </div>
   
                 <Card.Text className="fontPost">
                  {post.post} <br/>
                 </Card.Text>
                 <big  className="text-muted-society">#{post.category}</big> <Badge variant="primary">Admin</Badge> <Badge variant="secondary">Member</Badge><br></br>
                 <div className="post-interactions">
                 <div><hr/>
                     <span className="voting-btn"><FiThumbsUp id="thumb-up" size={20}/></span><span className="voting-btn"><FiThumbsDown id="thumb-down" size={20}/></span>
                     <span className="voting-btn"><FaRegCommentDots size={20} onClick={()=>{this.setState({toggle:!this.state.toggle})}} className="feed-comment"/></span><PostLinks/>

                     {
                       this.state.toggle ? <div  className="-post-reply-comment-div"><CommentReply/></div> : null
                     }
                 </div>
                 </div>
               </Card.Body>  
            </Card>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
