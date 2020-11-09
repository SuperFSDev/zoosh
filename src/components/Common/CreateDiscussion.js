import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Card, Button, Form, DropdownButton, InputGroup, FormControl, Dropdown, Nav } from 'react-bootstrap';
import { MentionsInput, Mention } from 'react-mentions'
class LayoutTextFeilds extends React.Component {
  componentDidMount() {
    axios.get('http://localhost:4000/users/getUsers')
    .then((response)=>{
        this.setState({users: response.data.users})
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
      time: new Date().getTime(),
      category: '',
      tag:''
      
    };

    

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUser= this.onChangeUser.bind(this);
    this.onChangePost = this.onChangePost.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);

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
      time: new Date().getTime(),
    });
}

onChangeCategory(e) {
  this.setState({ category: e.target.value });
}

onChangeTag(e) {
  this.setState({ tag: e.target.value });
}


onSubmit(e) {

  e.preventDefault();

  const newPost = {
      user: this.state.user,
      post: this.state.post,
      time: new Date().getTime(),
      category: this.state.category
     
  }




  axios.post('http://localhost:4000/posts/NewPosts', newPost)
  .then()
      .catch();
      
this.setState({
  user: '',
  post: '',
  time: new Date().getTime(),
  category: '',
  tag:''
});
window.location = '/feed';
}
  render(){
    
    const userMentionData = this.state.users.map(user => ({
      id: user._id,
      display: user.fullname
    }))
  return ( 
    <div className="create-a-post">
      <div>
      <Form onSubmit={this.onSubmit}>
        <MentionsInput
           className="mentionWrapper"
          id="standard-full-width"
          label="Create a Post"
          style={{ margin: 8, fontSize: 20,}}         
          placeholder="Whats on your mind"
   
          fullWidth
          required
          margin="normal"
          value={this.state.post}
          onChange={this.onChangePost}
          InputLabelProps={{
            shrink: true,
          }}
          >
          <Mention         
          type="user"
          markup= {"@__display__"}
          trigger="@"
          data={userMentionData}
          value={this.state.tag}
          onChange={this.onChangeTag}                       
        /></MentionsInput>

    
            <select required className="filterBox" name="category" id="category"  onChange={this.onChangeCategory}  >
                            <option disabled selected value="choose">Club/Society</option>
                            <option value="choose">Public</option>
                            <option value="GMIT Comp Sci">GMIT Comp Sci</option>
                            <option value="Music">Music</option>
                            <option value="Politics">Politics</option>
                            <option value="Technology">Technology</option>
                            <option value="Other">Other</option>
            </select>
            <button className="create-post-btn-submit"  variant="primary" type="submit">Post</button>
        </Form>
      </div>
      
    </div>
  );
}
}
export default LayoutTextFeilds;