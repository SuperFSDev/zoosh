import React from 'react';
import '../App.css';
import { Card, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Post from './Common/CreateDiscussion'
import {FaRegCommentDots} from 'react-icons/fa'
import {RiStarSmileLine} from 'react-icons/ri'
import {BsThreeDots} from 'react-icons/bs'
import Avatar from './Profile/Avatar'
import Recommended from './Lists/Recommended'

class Feed extends React.Component {

componentDidMount() {
  axios.get('http://localhost:4000/users/getUsers')
  .then((response)=>{
      this.setState({users: response.data.users})
  })
  .catch((error)=>{
      console.log(error);
  });


  axios.get('http://localhost:4000/posts/getPosts')
  .then((response)=>{
      this.setState({posts: response.data.posts})
  })
  .catch((error)=>{
      console.log(error);
  });
}

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: []
  
    };

  } 

  backToTop(e){

  }


render(){
  var{users} = this.state;
  var{posts} = this.state;

  return (
     <div>
      <div className="containerFeedLeft">
          {/* <h2>Activities</h2>
          <Calendar className="Calender" /> */}
      </div>
      <div className="containerFeedMiddle">
   
      <Post/>

        {/* Back to top */}
        <a id="button"></a>

        <div className="spacing"></div>
          {posts.reverse().map(post=>  (
            <div key={post.id}>    
            <Card.Footer className="-post-header-card"/>
              <Card className='feedPost'>
                <Card.Body>
                  <a href="/profile" className="post-user-profile"><Avatar/>@JohnDoe</a>
                  <Card.Title>{post.user}</Card.Title>
                  <Card.Text className="fontPost">
                   {post.post}
                
                  </Card.Text>
                  <big  className="text-muted-society">#{post.category}</big> <Badge variant="primary">Admin</Badge> <Badge variant="secondary">Member</Badge><br></br>
                  <big  className="text-muted">{moment(post.time).format("H:mma - MMM Do, YYYY.")}</big>
                  <div className="post-interactions">
                    <RiStarSmileLine size="25" color="gray"/>      <FaRegCommentDots size="25" color="gray"/> <BsThreeDots size="25" color="gray"/>
                  </div>
                </Card.Body>

                {/* <Card.Footer className="-post-footer-card"> */}
  
                
                {/* <Button variant="primary" className='LikeButton'>Like</Button>   */}
                <Form className='CommentBox'>
                          
                          {/* <Form.Control  type="Text" placeholder="Comment" /> */}
                          <Form.Text className="text-muted">
                          </Form.Text>
                </Form>
                {/* </Card.Footer>   */}
              </Card>
              
      <br></br>
      <br></br>
        </div>
      ))}
      <div class="anchor"><p>You reached the end. Back to <a href="#top">top</a></p></div>
  </div>

  <div className="containerFeedRight">
    <Recommended/>  
      {/* <h2>Users</h2><hr/>
      {users.map(user=>  (

      <div key={user.id}>
      <h4>{user.username}</h4>

      </div>
      ))}         */}
  </div>
  </div>
  );
}
}


export default Feed;