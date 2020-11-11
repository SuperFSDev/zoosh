import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {Form, InputGroup, FormControl } from 'react-bootstrap';
import Select from 'react-select';


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
      tags:[]
      
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
  this.setState({tags:e})
}


onSubmit(e) {

  e.preventDefault();

  const newPost = {
      user: this.state.user,
      post: this.state.post,
      time: new Date().getTime(),
      category: this.state.category,
      tags:this.state.tags
     
  }




  axios.post('http://localhost:4000/posts/NewPosts', newPost)
    .then()
        .catch();
        
    this.setState({
      user: '',
      post: '',
      time: new Date().getTime(),
      category: '',
      tags:[]
    });
    window.location = '/feed';
    }

  render(){
    var user = JSON.parse(localStorage.getItem('user'));
    var fullname = user.fullname;
    this.state.user = fullname;
    
    let options = this.state.users.map(function (user) {
      return { value: user._id, label: user.fullname };
    })

  return ( 
    <div className="create-a-post">
      <div>
      <Form onSubmit={this.onSubmit} className="post-container">

        <TextField
          id="outlined-textarea"
          label="Create a Post"
          style={{ margin: 1, fontSize: 20, maxLength:150, paddingBottom:10}}         
          placeholder="Whats on your mind"         
          fullWidth
          required
          multiline
          variant="outlined"
          margin="normal"
          value={this.state.post}
          onChange={this.onChangePost}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <Select options={options} isMulti onChange={this.onChangeTag} value={this.state.tags} placeholder="Tag a friend" />

      
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