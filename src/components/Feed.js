import React from 'react';
import '../App.css';
import { Card, Button, Form, DropdownButton, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Post from './Common/CreateDiscussion'
import {FaRegCommentDots} from 'react-icons/fa'
import {RiStarSmileLine} from 'react-icons/ri'
import {BsThreeDots} from 'react-icons/bs'
import Avatar from './Profile/Avatar'
import PostStats from './Posts/PostStats'

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
     <>
             <Post/>

      <div className="containerFeedLeft">
          {/* <h2>Activities</h2>
          <Calendar className="Calender" /> */}
      </div>
      <div className="containerFeedMiddle">
   

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
                  <big  className="text-muted">{post.category}</big><br></br>
                  <big  className="text-muted">{moment(post.time).format("MMMM Do, YYYY H:mma")}</big>
                </Card.Body>

                {/* <Card.Footer className="-post-footer-card"> */}
                  <div>
                    <RiStarSmileLine size="25" color="gray"/>      <FaRegCommentDots size="25" color="gray"/> <BsThreeDots size="25" color="gray"/>
                  </div>
                
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

  {/* <div className="containerFeedRight">  
      <h2>Users</h2><hr/>
      {users.map(user=>  (

      <div key={user.id}>
      <h4>{user.username}</h4>

      </div>
      ))}        
  </div> */}
  </>
  );
}
}


export default Feed;