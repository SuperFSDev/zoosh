import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Form, Image } from 'react-bootstrap';
import Select from 'react-select';
import ImageUploader from 'react-images-upload';
const Compress = require('compress.js')

class LayoutTextFeilds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      score: 50,
      users: [],
      posts: [],
      user: '',
      UniqueUser: '',
      post: '',
      time: new Date().getTime(),
      category: '',
      tags: [],
      pictures: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePost = this.onChangePost.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  async componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: user._id });

    axios.get('http://localhost:4000/users/getUsers')
      .then((response) => {
        this.setState({ users: response.data.users })
      })
      .catch((error) => {
        console.log(error);
      });

    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id
      }
    })
      .then((response) => {
        this.setState({ UniqueUser: response.data.user });
      })
      .catch((error) => {
        console.log(error);
      });
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
    this.setState({ tags: e })
  }

  
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async onDrop(pictureFiles, pictureDataURLs) {

    const compress = new Compress();

    compress.compress(pictureFiles, {
      size: 4, // the max size in MB, defaults to 2MB
      quality: .90, // the quality of the image, max is 1,
      maxWidth: 100, // the max width of the output image, defaults to 1920px
      maxHeight: 100, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    }).then((data) => {
      var data = JSON.stringify(data);
      console.log(data);
      var b64 = data.prefix + data.data;

      this.setState({
        pictures: this.state.pictures.concat(b64)
      });
      console.log(this.state.pictures);
    })
  }

  onSubmit(e) {

    e.preventDefault();

    const newPost = {
      user_id: this.state.id,
      score: this.state.UniqueUser.score + 50,
      post: {
        user_id: this.state.id,
        user: this.state.user,
        post: this.state.post,
        time: new Date().getTime(),
        category: this.state.category,
        tags: this.state.tags,
        pictures: this.state.pictures
      }
    }

    axios.post('http://localhost:4000/users/addPost', newPost)
      .then()
      .catch();

    this.setState({
      user: '',
      score: +50,
      post: '',
      time: new Date().getTime(),
      category: '',
      tags: []
    });
    alert(JSON.stringify(newPost));
    window.location = '/feed';
  }

  render() {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user)
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
              style={{ margin: 1, fontSize: 20, maxLength: 150, paddingBottom: 10 }}
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
            <ImageUploader
              withPreview={true}
              withIcon={true}
              buttonText='Choose images'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
            <Select options={options} isMulti onChange={this.onChangeTag} value={this.state.tags} placeholder="Tag a friend" />

            <button className="create-post-btn-submit" variant="primary" type="submit">Post</button>
          </Form>
        </div>

      </div>
    );
  }
}
export default LayoutTextFeilds;