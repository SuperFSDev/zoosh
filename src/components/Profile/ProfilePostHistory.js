import React from 'react';
import '../../App.css';
import { Card, Badge} from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {FaRegCommentDots} from 'react-icons/fa'
import CommentReply from '../Posts/CommentReply'
import PostLinks from '../Posts/PostLinks'
import {FiThumbsUp,FiThumbsDown} from 'react-icons/fi'


export default class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      posts:[]
    };
  }

    componentDidMount() {
      var user_id = new URLSearchParams(document.location.search).get("id");
      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
        }
      })
        .then((response) => {
          this.setState({ user: response.data.user,
             posts:response.data.user.posts
          })
          
        })
        .catch((error) => {
          console.log(error);
        });
        
    }

  render(){
    

     return (

      <div>
      <div className="containerFeedLeftProfileCell">
        </div>
              {this.state.posts.reverse().map(post=>  (
            <div key={this.state.user._id}>  
              <Card className='userPosts'>
                <Card.Body>          
                  <div className="-u-prof-stats" id="social-user">
                      {/* <span className="avatar-wrapper-left"><a href="/profile" className="post-user-profile" target="_blank"><PostAvatar/></a></span> */}
                      <span className="username-wrapper"><a href={"/user?id=" +this.state.user._id}>{post.user} <b className="user-score-post-tag">1,231</b> {/*{post._id}*/}</a></span><br/>
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
                <h1></h1>
                
              </Card>
        
                    </div>
                    ))}
                    
              
       </div>


  );
}
}