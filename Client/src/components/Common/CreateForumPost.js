import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import Select from 'react-select';

class CreateForumPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      users: [],
      forumPosts: [],
      user: '',
      post: '',
      tags: [],
      time: new Date().getTime(),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUser= this.onChangeUser.bind(this);
    this.onChangePost = this.onChangePost.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);

  }
  
componentDidMount() {
  var user = JSON.parse(localStorage.getItem('user'));
  this.setState({ id: user._id });

  if (user)
    this.setState({user: user.fullname});

  // Get all users from database.
  axios.get('http://localhost:4000/users/getUsers')
    .then((response) => {
      this.setState({ users: response.data.users })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onChangePost(e) {
    this.setState({
      post: e.target.value
    });
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  onChangeTag(e) {
    this.setState({ tags: e })
  }

  onChangeTime(e) {
    this.setState({
      time: new Date().getTime(),
    });
  }

  onSubmit(e) {

    e.preventDefault();

    const newPost = {
        user: this.state.user,
        user_id: this.state.id,
        post: this.state.post,
        time: new Date().getTime(),
        tags: this.state.tags,
      }

    axios.post('http://localhost:4000/forums/NewPost', newPost)
      .then()
      .catch();
    
    this.setState({
      user: '',
      post: '',
      time: new Date().getTime(),
      tags: [],

    });
    window.location = '/forums';
}
  

  render(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.setState({user: user.fullname});
    }
    
    const options = [
      { value: 'bug', label: 'Bug' },
      { value: 'feature', label: 'Feature Request' },
    ]

  return ( 
    <div className="create-a-post">
      <div>
        
      <h1>Leave Feedback</h1><br/><br/>
  
      <Form onSubmit={this.onSubmit} className="post-container">

        <TextField
          id="outlined-textarea"
          style={{ margin: 1, fontSize: 20, maxLength:150, paddingBottom:10}}         
          placeholder="Whats on your mind?"         
          fullWidth
          required
          multiline
          variant="outlined"
          margin="normal"
          value={this.state.post}
          onChange={this.onChangePost}
          InputLabelProps={{
            shrink: true,
            maxLength: 100
          }}
          />

        <Select options={options} required onChange={this.onChangeTag} value={this.state.tags} placeholder="#tag" />

          <button className="standard-button"  variant="primary" type="submit">Submit</button>
        </Form>
      </div>
      
    </div>
  );
}
}
export default CreateForumPost;