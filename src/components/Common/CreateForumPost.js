import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Form } from 'react-bootstrap';


class CreateForumPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          users: [],
          posts: [],
          user: '',
          title: '',
          content: '',
          time: new Date().getTime(),
        };
    
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
      }
    
      componentDidMount() {
    
        var user = JSON.parse(localStorage.getItem('user'));
        if (user)
          var fullname = user.fullname;
        this.state.user = fullname;
    
        // Get all users from database.
        axios.get('http://localhost:4000/users/getUsers')
          .then((response) => {
            this.setState({ users: response.data.users })
          })
          .catch((error) => {
            console.log(error);
          });
    
        // Get the societies the current user is in from the database.
      }
    
      onChangeTitle(e) {
        this.setState({
          title: e.target.value
        });
      }
    
      onChangeContent(e) {
        this.setState({
          content: e.target.value
        });
      }
    
    
      onSubmit(e) {
    
        e.preventDefault();
    
        const newLink = {
          user: this.state.user,
          title: this.state.title,
          content: this.state.content,
          time: new Date().getTime(),
        }
    
        axios.post('http://localhost:4000/forums/NewPost', newLink)
          .then()
          .catch();
    
        this.setState({
          user: '',
          title: '',
          content: '',
          time: new Date().getTime(),
        });
        window.location = '/forum';
      }


  render() {
    return (
      <div className="create-a-post">
        <div>
          <Form onSubmit={this.onSubmit} className="post-container">

          <TextField
              id="outlined-textarea"
              label="Title"
              style={{ margin: 1, fontSize: 20, maxLength: 150, paddingBottom: 10 }}
              placeholder="Whats on your mind"
              fullWidth
              required
              multiline
              variant="outlined"
              margin="normal"
              value={this.state.title}
              onChange={this.onChangeTitle}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="outlined-textarea"
              label="Link"
              style={{ margin: 1, fontSize: 20, maxLength: 150, paddingBottom: 10 }}
              placeholder="URL"
              fullWidth
              required
              multiline
              variant="outlined"
              margin="normal"
              value={this.state.content}
              onChange={this.onChangeContent}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <button className="create-post-btn-submit" variant="primary" type="submit">Post</button>
          </Form>
        </div>

      </div>
    );
  }
}
export default CreateForumPost;