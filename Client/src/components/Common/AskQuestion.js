import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {Form} from 'react-bootstrap';
import { ObjectID } from 'bson';
import Select from 'react-select';

class AskQuestion extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      users: [],
      societies: [],
      posts: [],
      question: '',
      user: '',
      claps: 0,
      UniqueUser: '',
      time: new Date().getTime(),
      society: '',
      FollowingID: ''
      
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeSociety = this.onChangeSociety.bind(this);
  }

  componentDidMount() {

    var user = JSON.parse(localStorage.getItem('user'));
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

  onChangeQuestion(e) {
    this.setState({
      question: e.target.value
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

  onChangeTime(e) {
    this.setState({
      time: new Date().getTime(),
    });
  }


  onSubmit(e) {

    e.preventDefault();
 

    const newQuestion = {
        user: this.state.user,
        user_id: this.state.id,
        question: this.state.question,
        time: new Date().getTime(),
        society: this.state.society,
    }

    axios.post('http://localhost:4000/questions/NewQuestion', newQuestion)
      .then()
      .catch();
    
    this.setState({
      user: '',
      question: '',
      time: new Date().getTime(),
      society:'',
    });
    window.location = '/questions';
  }


  render(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(user)
      var fullname = user.fullname;
    this.state.user = fullname;

    let options = this.state.societies.map(function (society) {
      return { value: society, label: society };
    })
  

  return ( 
    <div className="create-a-post">
      <div>

        <h1>Ask a Question</h1><br/><br/>
  
      <Form onSubmit={this.onSubmit} className="post-container">

        <TextField
          id="outlined-textarea"
          style={{ margin: 1, fontSize: 20, maxLength:150, paddingBottom:10}}         
          placeholder="Whats on your mind?"         
          fullWidth
          required
          multiline
          variant="outlined"
          margin="normal"
          value={this.state.question}
          onChange={this.onChangeQuestion}
          InputLabelProps={{
            shrink: true,
          }}
          />

        <Select className="comm-post-selection" options={options} onChange={this.onChangeSociety} value={this.state.society} placeholder="Choose a community"  defaultValue="General"/><br/>

          <button className="standard-button"  variant="primary" type="submit">Post Question</button>
        </Form>
      </div>
      
    </div>
  );
}
}
export default AskQuestion;