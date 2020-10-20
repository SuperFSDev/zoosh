import React from 'react';
import '../App.css';
import { Card, Nav, Button, Form } from 'react-bootstrap';

import axios from 'axios';




class Feed extends React.Component {

  


componentDidMount() {
  axios.get('http://localhost:4000/api/Users')
  .then((response)=>{
      this.setState({users: response.data.users})
  })
  .catch((error)=>{
      console.log(error);
  });


  axios.get('http://localhost:4000/api/posts')
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
  


render(){
  var{users} = this.state;
  var{posts} = this.state;

  return (

     <>
       <h4 className="tasq">Feed</h4>
<div className="containerFeedLeft">
  <h2>News</h2>
  </div>


  <div className="containerFeedMiddle">

 
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
  </div>
))}
  </div>



  <div className="containerFeedRight">

<h2>Users</h2>
 
{users.map(user=>  (

<div key={user.id}>
<h4>{user.username}</h4>

</div>
))}        
  </div>

  </>
  );
}
}


export default Feed;