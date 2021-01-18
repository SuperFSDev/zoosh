import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import {Helmet} from 'react-helmet'
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { ObjectID } from 'bson';

export default class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      score: 10,
      users: [],
      posts: [],
      title: '',
      user: '',
      UniqueUser: '',
      post: '',
      time: new Date().getTime(),
      category: '',
      tags: [],
      pictures: [],
      FollowingID: ''
      
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePost = this.onChangePost.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
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


  onSubmit(e) {

    e.preventDefault();
    var id = new ObjectID();

    const newPost = {
      user_id: this.state.id,
      score: this.state.UniqueUser.score + 1,
      post: {
        Post_id: id,
        user: this.state.user,
        user_id: this.state.id,
        title: this.state.title,
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
      title: '',
      score: +1,
      post: '',
      time: new Date().getTime(),
      category: '',
      tags: []
    });
    window.location = '/discussions';
  }

render(){

  // let options = this.state.societies.map(function (society) {
  //   return { value: society, label: society };
  // })

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

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
        <Form onSubmit={this.onSubmit}>
          <input 
            placeholder="Title ..." 
            className="Title-input"
            value={this.state.title}
            onChange={this.onChangeTitle}
            required
            /><br/>

          <textarea 
            placeholder="Write your post content here ..." 
            className="Content-input" 
            rows = "5" cols = "60"
            value={this.state.post}
            onChange={this.onChangePost}
            required
            />

            
            
          {/* <Select className="comm-post-selection" options={options} onChange={this.onChangeSociety} value={this.state.society} placeholder="Choose a community"  defaultValue="General"/><br/> */}
          <button className="standard-button" type="submit">Publish</button>
          <a href="/home"><button className="standard-button-cancel" type="button">Cancel</button></a>

        </Form>
        </div>
      </div>
  </div>
  );
}
}
