import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import {Helmet} from 'react-helmet'
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

export default class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      societies: [],
      posts: [],
      user: '',
      title: '',
      content: '',
      time: new Date().getTime(),
      society: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeSociety = this.onChangeSociety.bind(this);
  }

  componentDidMount() {

    var user = JSON.parse(localStorage.getItem('user'));
    document.body.style.backgroundColor = "#f0f2f5";

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

  onChangeContent(e) {
    this.setState({
      content: e.target.value
    });
  }

  onChangeSociety(e) {
    this.setState({ society: e });
  }


  onSubmit(e) {

    e.preventDefault();

    const newDiscussion = {
      user: this.state.user,
      title: this.state.title,
      content: this.state.content,
      time: new Date().getTime(),
      society: this.state.society,
    }

    axios.post('http://localhost:4000/discussions/NewDiscussions', newDiscussion)
      .then()
      .catch();

    this.setState({
      user: '',
      title: '',
      content: '',
      time: new Date().getTime(),
      society: ''
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
            value={this.state.content}
            onChange={this.onChangeContent}
            required
            />
            
          <Select className="comm-post-selection" options={options} onChange={this.onChangeSociety} value={this.state.society} placeholder="Choose a community" /><br/>
          <button className="standard-button" type="submit">Publish</button>
        </Form>
        </div>
      </div>
  </div>
  );
}
}
