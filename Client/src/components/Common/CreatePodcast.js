import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Form } from 'react-bootstrap';

class CreatePodcast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      societies: [],
      posts: [],
      user: '',
      name: '',
      link: '',
      title: '',
      description: '',
      time: new Date().getTime(),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
  }

  componentDidMount() {

    var user = JSON.parse(localStorage.getItem('user'));
    if (user)
      var fullname = user.fullname;
      this.state.user = fullname;

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeLink(e) {
    this.setState({
      link: e.target.value
    });
  }

  onSubmit(e) {

    e.preventDefault();

    const newPodcast = {
      user: this.state.user,
      name: this.state.name,
      link: this.state.link,
      description: this.state.description,
      title: this.state.title,
      time: new Date().getTime(),
    }

    axios.post('http://localhost:4000/podcasts/NewPodcast', newPodcast)
      .then()
      .catch();

    this.setState({
      user: '',
      name: '',
      link: '',
      description: '',
      title: '',
      time: new Date().getTime(),
    });
    window.location = '/podcasts';
  }

  render() {

    return (
      <div className="create-a-post">
        <div>

          <h1>Share your Podcast</h1><br/><br/>
          <Form onSubmit={this.onSubmit} className="post-container">

            <TextField
              id="outlined-textarea"
              label="Episode Title"
              style={{ margin: 1, fontSize: 20, maxLength: 150, paddingBottom: 10 }}
              placeholder="eg. #1 Getting Started"
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
              label="Podcast Name"
              style={{ margin: 1, fontSize: 20, maxLength: 150, paddingBottom: 10 }}
              placeholder="eg. The Joe Rogan Experience"
              fullWidth
              required
              multiline
              variant="outlined"
              margin="normal"
              value={this.state.name}
              onChange={this.onChangeName}
              InputLabelProps={{
                shrink: true,
              }}
            />   

            <TextField
              id="outlined-textarea"
              label="Description"
              style={{ margin: 1, fontSize: 20, maxLength: 150, paddingBottom: 10 }}
              placeholder="What is this podcast about?"
              fullWidth
              required
              multiline
              variant="outlined"
              margin="normal"
              value={this.state.description}
              onChange={this.onChangeDescription}
              InputLabelProps={{
                shrink: true,
              }}
            />     

            <input type="url" name="url" id="url"
                placeholder="https://example.com"
                pattern="https://open.spotify.com.*" size="30"
                value={this.state.link}
                onChange={this.onChangeLink}
                /><br/>

            <button className="create-post-btn-submit" variant="primary" type="submit">Post</button>
          </Form>
        </div>

      </div>
    );
  }
}
export default CreatePodcast;