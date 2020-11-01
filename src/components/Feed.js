import React from 'react';
import '../App.css';
import { Card, Nav, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
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


  axios.get('http://localhost:4000/posts/posts')
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
     <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Feed</Breadcrumb.Item>
      </Breadcrumb>
       <h4 className="header" align="Center">Feed</h4>
      <div className="containerFeedLeft">
          <h2>Activities</h2>
          <Calendar className="Calender" />
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

<Card className='FeedLayout'>
    <Card.Body>
<Card.Title>Thomas</Card.Title>
      <Card.Text>
          <h4>Hello Everyone!</h4>
 
      </Card.Text>
<big className="text-muted"> Time posted 9:00</big>
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