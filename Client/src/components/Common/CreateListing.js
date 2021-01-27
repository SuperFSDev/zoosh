import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Form } from 'react-bootstrap';

export default class CreateListing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      user: '',
      description: '',
      subject: '',
      rate: 0,
      time: new Date().getTime(),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeRate = this.onChangeRate.bind(this);

  }

  componentDidMount() {

    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: user._id });

    if (user)
      var fullname = user.fullname;
      this.state.user = fullname;

  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeRate(e) {
    this.setState({
      rate: e.target.value
    });
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    });
  }


  onSubmit(e) {

    e.preventDefault();

    const newListing = {
      user: this.state.user,
      user_id: this.state.id,
      subject: this.state.subject,
      description: this.state.description,
      rate: this.state.rate,
    }

    axios.post('http://localhost:4000/listings/NewListing', newListing)
      .then()
      .catch();

    this.setState({
      user:'',
      subject: '',
      description: '',
      rate: 0,
      time: new Date().getTime(),
    });
    window.location = '/listings';
  }

  render() {

    return (
      <div className="create-a-post">
        <div>

          <h1>Become a Tutor</h1><br/><br/>
          <Form onSubmit={this.onSubmit} className="post-container">

            <TextField
              id="outlined-textarea"
              style={{ margin: 1, fontSize: 20, maxLength: 20, paddingBottom: 10 }}
              placeholder="Subject"
              required
              fullWidth
              multiline
              variant="outlined"
              margin="normal"
              type="text"
              value={this.state.subject}
              onChange={this.onChangeSubject}
            />

            <TextField
              id="outlined-textarea"
              style={{ margin: 1, fontSize: 20, maxLength: 150, paddingBottom: 10 }}
              placeholder="Description of listing"
              required
              fullWidth
              multiline
              variant="outlined"
              margin="normal"
              type="text"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />   

            <TextField
              id="outlined-number"
              type="number"
              placeholder="Rate/hr"
              InputLabelProps={{
              shrink: true,
              }}
              variant="outlined"
              fullWidth
              value={this.state.rate}
              onChange={this.onChangeRate}
            />     

            <button className="create-post-btn-submit" variant="primary" type="submit">Post</button>
          </Form>
        </div>

      </div>
    );
  }
}
