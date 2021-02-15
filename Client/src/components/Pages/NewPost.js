import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import { Helmet } from 'react-helmet'
import axios from 'axios';
import { Form, Row, Col, Container } from 'react-bootstrap';
import Select from 'react-select';
import ImageUploader from 'react-images-upload';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import $ from 'jquery';

const Compress = require('compress.js')

export default class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      score: 10,
      users: [],
      societies: [],
      posts: [],
      title: '',
      user: '',
      claps: 0,
      UniqueUser: '',
      content: '',
      caption: '',
      time: new Date().getTime(),
      society: '',
      tags: [],
      thumbnail_picture: '',
      selectedFile: null,
      full_picture: '',
      FollowingID: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeCaption = this.onChangeCaption.bind(this);
    this.onChangeSociety = this.onChangeSociety.bind(this);
    this.onDropPicture = this.onDropPicture.bind(this);
  }

  componentDidMount() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: this.user._id });

    if (this.user)
      var fullname = this.user.fullname;

    this.setState({ user: fullname });

    // Get the societies the current user is in from the database.
    this.getUserSocieties();

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeSociety(e) {
    this.setState({ society: e });
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }
  onChangeContent(e) {
    this.setState({
      content: e.target.value
    });
  }

  onChangeTime(e) {
    this.setState({
      time: new Date().getTime(),
    });
  }

  onChangeCaption(e) {
    this.setState({
      caption: e.target.value
    });
  }

  async onDropPicture(pictureFiles, pictureDataURLs) {

    this.setState({ full_picture: pictureFiles[0] }, () => {
      console.log(this.state.full_picture);
    })

    // const compress = new Compress();

    // // Create thumbnail picture
    // compress.compress(pictureFiles, {
    //   size: 4, // the max size in MB, defaults to 2MB
    //   quality: 0.8, // the quality of the image, max is 1,
    //   maxWidth: 200, // the max width of the output image, defaults to 1920px
    //   maxHeight: 125, // the max height of the output image, defaults to 1920px
    //   resize: true, // defaults to true, set false if you do not want to resize the image width and height
    // }).then((data) => {
    //   if (data[0]) {
    //     data = data[0];
    //     var b64 = data.prefix + data.data;

    //     this.setState({
    //       //picture: this.state.picture.concat(b64)
    //       thumbnail_picture: b64
    //     });
    //   }
    // })

    // // Create full picture
    // compress.compress(pictureFiles, {
    //   size: 4, // the max size in MB, defaults to 2MB
    //   quality: 1, // the quality of the image, max is 1,
    //   maxWidth: 800, // the max width of the output image, defaults to 1920px
    //   maxHeight: 500, // the max height of the output image, defaults to 1920px
    //   resize: true, // defaults to true, set false if you do not want to resize the image width and height
    // }).then((data) => {
    //   if (data[0]) {
    //     data = data[0];
    //     var b64 = data.prefix + data.data;

    //     this.setState({
    //       //picture: this.state.picture.concat(b64)
    //       full_picture: b64
    //     });
    //   }
    // })
  }

  getUserSocieties() {
    axios.get('http://localhost:4000/societies/get-users-societies', {
      params: {
        id: this.user._id,
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({ societies: response.data.societies });
        console.log(this.state.societies);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async onSubmit(e) {

    var user = JSON.parse(localStorage.getItem('user'));

    e.preventDefault();

    const newPost = {
      user: this.state.user,
      username: this.state.username,
      user_id: user._id,
      title: this.state.title,
      caption: this.state.caption,
      content: this.state.content,
      time: new Date().getTime(),
      society: this.state.society,
      society_id: this.state.society_id,
      user_pic: user.pic,
      full_pic: null
    }

    const formData = new FormData();

    if (this.state.full_picture) {
      formData.append('picture', this.state.full_picture, this.state.full_picture.name);
      await axios.post('http://localhost:4000/discussions/picture-upload', formData, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        }
      })
        .then((response) => {

          alert(JSON.stringify(response.data));

          newPost.full_pic = response.data.location;

          alert(newPost.full_pic);

          axios.post('http://localhost:4000/discussions/NewDiscussions', newPost)
          .then()
          .catch();
        })
        .catch();
    }

    this.setState({
      user: '',
      title: '',
      claps: 0,
      content: '',
      caption: '',
      time: new Date().getTime(),
      category: '',
      society: '',
      society_id: '',
      thumbnail_picture: '',
      full_picture: '',
      user_pic: '',
      username: '',
      tags: []
    });
    window.location = '/';
  }

  render() {

    let options = null;

    if (this.state.societies !== undefined) {
      options = this.state.societies.map(function (society) {
        return { value: society.name, label: society.name };
      })
    } else {
      this.state.tags = "General";
    }

    return (
      <div>
        {/* REACTJS HELMET */}
        <Helmet>
          <meta charSet="utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Post / Website</title>

          {/* LINKS */}

          <link rel="canonical" href="http://mysite.com/example" />
          <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet>

        <Container>
          <Row>
            <Col>
              <div className="new-post-feed">
                <Form onSubmit={this.onSubmit}>
                  <ImageUploader
                    withIcon={false}
                    withPreview={true}
                    buttonText='Add a cover image'
                    onChange={this.onDropPicture}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    fileTypeError
                    withLabel={false}
                    buttonStyles={{ backgroundColor: 'whitesmoke', color: 'black', fontWeight: 'bold', fontSize: 20 }}
                  />

                  <label><input
                    placeholder="New post title..."
                    className="Title-input"
                    minlength={1}
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    required
                  /></label>

                  <label><input
                    placeholder="Post Caption"
                    className="Content-input"
                    value={this.state.caption}
                    maxlength={140}
                    minlength={1}
                    onChange={this.onChangeCaption}
                    required
                  /></label>

                  <TextareaAutosize
                    placeholder="Write your post content here ..."
                    aria-label="empty textarea"
                    className="Content-input"
                    minlength={1}
                    value={this.state.content}
                    onChange={this.onChangeContent}
                    required
                  />
                  <div className="spacing"></div>

                  {options != null && <Select className="comm-post-selection" options={options} onChange={this.onChangeSociety} value={this.state.society} placeholder="Choose a community" defaultValue="General" />}
                  <br />
                  <br />
                  <br />
                  <div className="post-buttons">
                    <button className="standard-button" type="submit">Publish</button>
                  </div>


                </Form>
              </div>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}