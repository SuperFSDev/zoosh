import React from 'react';
import '../App.css';
import { Card, Button, Form, DropdownButton, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

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
      posts: [],
      user: '',
      post: '',
      time: ''
      
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUser= this.onChangeUser.bind(this);
    this.onChangePost = this.onChangePost.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);

  } 

  backToTop(e){

  }

  onChangeUser(e) {
    this.setState({
        user: e.target.value
    });
}
onChangePost(e) {
    this.setState({
        post: e.target.value
    });
}
onChangeTime(e) {
    this.setState({
      time: e.target.value
    });
}
onSubmit(e) {

  e.preventDefault();

  const newPost = {
      user: this.state.user,
      post: this.state.post,
      time: this.state.time
     
  }


  axios.post('http://localhost:4000/posts/NewPosts', newPost)
  .then()
      .catch();



this.setState({
  user: '',
  post: '',
  time: ''




});
window.location = '/feed';
}

render(){
  var{users} = this.state;
  var{posts} = this.state;

  return (
     <>
      <div className="containerFeedLeft">
          {/* <h2>Activities</h2>
          <Calendar className="Calender" /> */}
      </div>
      <div className="containerFeedMiddle">
        <Form onSubmit={this.onSubmit}>
          <div className="discussion-post">
          <InputGroup value={this.state.post} onChange={this.onChangePost}>
            <InputGroup.Prepend>
            </InputGroup.Prepend>
            <FormControl as="textarea" aria-label="With textarea" placeholder="Start a Discussion"/>
            <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title="Choose Club/Society"
                id="input-group-dropdown-2"
              >
                <Dropdown.Item href="#">Computer Science</Dropdown.Item>
                <Dropdown.Item href="#">Gaming</Dropdown.Item>
              </DropdownButton>
          </InputGroup>
              <div className="create-soc-div">
                  <button variant="primary" type="submit" class="post-btn">Post</button>
              </div>
          </div>
              {/* <input
                type='text'
                className='form-control'
                value={this.state.user}
                onChange={this.onChangeUser}
              ></input>

              <input
                type='text'
                className='form-control'
                value={this.state.post}
                onChange={this.onChangePost}
              ></input>

              <input
                type='text'
                className='form-control'
                value={this.state.time}
                onChange={this.onChangeTime}
              ></input>   */}
        </Form>

        {/* Back to top */}
        <a id="button"></a>

        <div className="spacing"></div>
          {posts.map(post=>  (
            <div key={post.id}>    
              <Card className='FeedLayout'>
                <Card.Body>
            <Card.Title>{post.user}</Card.Title>
                  <Card.Text>
              {post.post}
                  </Card.Text>
            <big className="text-muted"> Time posted {post.time}</big>
                </Card.Body>
                <Card.Footer>
                <Button variant="primary" className='LikeButton'>Like</Button>  
                <Form className='CommentBox'>
                          <Form.Control  type="Text" placeholder="Comment" />
                          <Form.Text className="text-muted">
                          </Form.Text>
                </Form>
                </Card.Footer>  
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