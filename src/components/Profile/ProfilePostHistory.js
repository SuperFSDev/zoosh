import React from 'react';
import '../../App.css';
import { Card} from 'react-bootstrap';
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
                      <span className="username-wrapper"><a href={"/user?id=" +this.state.user._id}>{post.user} <b className="user-score-post-tag">{post.user.score}</b> {/*{post._id}*/}</a></span><br/>
                      <big  className="text-muted">{moment(post.time).format("H:mma - MMM Do, YYYY.")}</big>

                      {/* <ProfileURL/> */}
                  </div>
    
                  <Card.Text className="fontPost">
                    {post.post} <br/>
                  </Card.Text>        
                </Card.Body>  
                <h1></h1>
                
              </Card>
        
                    </div>
                    ))}
                    
              
       </div>


  );
}
}