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
      pictures: [],
      FollowingID: ''
      
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeCaption = this.onChangeCaption.bind(this);
    this.onChangeSociety = this.onChangeSociety.bind(this);
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


  


  onSubmit(e) {

    e.preventDefault();
 

    const newPost = {
        user: this.state.user,
        user_id: this.state.id,
        title: this.state.title,
        caption:this.state.caption,
        content: this.state.content,
        time: new Date().getTime(),
        society: this.state.society
      
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
      tags: []
    });
    window.location = '/discussions';
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

      <div className="containerFeedMiddle">
          <div className="global-feed">
        <Form onSubmit={this.onSubmit}>
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
      </div>
  </div>
  );
}
}
