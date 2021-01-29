import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import {Helmet} from 'react-helmet'
import axios from 'axios';
import { Form, Row, Col, Container } from 'react-bootstrap';
import Select from 'react-select';
import ImageUploader from 'react-images-upload';

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
      caption:'',
      time: new Date().getTime(),
      society: '',
      tags: [],
      picture: '',
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

    var user = JSON.parse(localStorage.getItem('user'));
    document.body.style.backgroundColor = "#FDFEFE";
    this.setState({ id: user._id });

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
    axios.get('http://localhost:4000/users/getUserSocieties', {
      params: {
        id: user._id
      }
    })
      .then((response) => {
        this.setState({ societies: response.data.societies })
      })
      .catch((error) => {
        console.log(error);
      });
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

    alert("Picture dropped");

    const compress = new Compress();

    compress.compress(pictureFiles, {
      size: 50, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: 500, // the max width of the output image, defaults to 1920px
      maxHeight: 500, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    }).then((data) => {
      if(data[0])
      {
        var data = data[0];
        var b64 = data.prefix + data.data;
  
        this.setState({
          //picture: this.state.picture.concat(b64)
          picture: b64
        });
        console.log(this.state.picture);
      }
    })
  }

  onSubmit(e) {

    e.preventDefault();
 

    const newPost = {
        user: this.state.user,
        user_id: this.state.id,
        title: this.state.title,
        caption:this.state.caption,
        content: this.state.content,
        time: new Date().getTime(),
        society: this.state.society,
        picture: this.state.picture
    }

    axios.post('http://localhost:4000/discussions/NewDiscussions', newPost)
      .then()
      .catch();
    
    this.setState({
      user: '',
      title: '',
      claps: 0,
      content: '',
      caption:'',
      time: new Date().getTime(),
      category: '',
      society:'',
      picture: '',
      tags: []
    });
    window.location = '/';
  }

render(){

   let options = this.state.societies.map(function (society) {
     return { value: society, label: society };
   })

  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>New Post - Website</title>
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
                    buttonStyles={{backgroundColor:'whitesmoke', color:'black', fontWeight:'bold', fontSize:20}}
              />

              <input 
                placeholder="Title ..." 
                className="Title-input"
                value={this.state.title}
                onChange={this.onChangeTitle}
                required
                />

              <input 
                placeholder="Post Caption" 
                className="Content-input"
                value={this.state.caption}
                onChange={this.onChangeCaption}
                required
              />

              <textarea 
                placeholder="Write your post content here ..." 
                className="Content-input" 
                rows = "5" cols = "60"
                value={this.state.content}
                onChange={this.onChangeContent}
                required
                />
                
              <Select className="comm-post-selection" options={options} onChange={this.onChangeSociety} value={this.state.society} placeholder="Choose a community"  defaultValue="General"/><br/>
              <br/>
              <button className="standard-button" type="submit">Publish</button>
              <a href="/home"><button className="standard-button-cancel" type="button">Cancel</button></a>

            </Form>
            </div>
          </Col>

          {/* <Col><Recommended/><Contributors/></Col> */}
        </Row>
      </Container>

      {/* <div className="containerChartMiddle">
          <div className="global-feed">
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
                buttonStyles={{backgroundColor:'whitesmoke', color:'black', fontWeight:'bold', fontSize:20}}
          />

          <input 
            placeholder="Title ..." 
            className="Title-input"
            value={this.state.title}
            onChange={this.onChangeTitle}
            required
            />

          <input 
            placeholder="Post Caption" 
            className="Content-input"
            value={this.state.caption}
            onChange={this.onChangeCaption}
            required
          />

          <textarea 
            placeholder="Write your post content here ..." 
            className="Content-input" 
            rows = "5" cols = "60"
            value={this.state.content}
            onChange={this.onChangeContent}
            required
            />
            
          <Select className="comm-post-selection" options={options} onChange={this.onChangeSociety} value={this.state.society} placeholder="Choose a community"  defaultValue="General"/><br/>
          <br/>
          <button className="standard-button" type="submit">Publish</button>
          <a href="/home"><button className="standard-button-cancel" type="button">Cancel</button></a>

        </Form>
        </div>
      </div> */}
  </div>
  );
}
}
