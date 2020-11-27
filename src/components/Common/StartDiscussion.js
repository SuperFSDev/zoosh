import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import {Helmet} from 'react-helmet'

export default class StartDiscussion extends React.Component {

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

  render() {

    let options = this.state.societies.map(function (society) {
      return { value: society, label: society };
    })

    return (
      <div className="create-a-post">
        {/* REACTJS HELMET */}
        <Helmet>
                  <meta charSet="utf-8" />
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                  <meta charset="utf-8" />
                  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>{this.state.user.fullname}</title>

                  {/* LINKS */}
                  
                  <link rel="canonical" href="http://mysite.com/example" />
                  <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                  <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
          </Helmet>
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
              label="Content"
              style={{ margin: 1, fontSize: 20, maxLength: 150, paddingBottom: 10 }}
              placeholder="Whats on your mind"
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
            <Select options={options} onChange={this.onChangeSociety} value={this.state.society} placeholder="Choose a society to post to..." />

            

            <button className="create-post-btn-submit" variant="primary" type="submit">Post</button>
          </Form>
        </div>

      </div>
    );
  }
}