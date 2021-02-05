import React, { Fragment } from 'react';
import '../../assets/App.css';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { Row, Col, Container, Image } from 'react-bootstrap'
import Clapped from '../../images/clap-hands.png'
import Avatar from '@material-ui/core/Avatar';

export default class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
      searchValue: '',
      posts: [],
      user: '',
      notifications: [],
      name: ''
    };
  }

  async componentDidMount() {
    document.body.style.backgroundColor = "#F7F7F7";
    var user = JSON.parse(localStorage.getItem('user'));
    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id,
        fields: "notifications"
      }
    })
      .then((response) => {
        console.log("Notification data");
        console.log(response.data);
        this.setState({
          // user: response.data.user,
          notifications: response.data.user.notifications,

        })
      })
      .catch((error) => {
        console.log(error);
      });
  }


  Clearlikes() {
    var user = JSON.parse(localStorage.getItem('user'));
    const UserID = {
      id: user._id
    }
    // Adds the discussion to liked list
    axios.post('http://localhost:4000/users/clearLikes', UserID)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
    window.location.reload();
  }


  getNotificationUser(id) {
    axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: id,
        fields: "fullname"
      }
    })
      .then((response) => {
        console.log(response.data.user)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  ClearComments() {
    var user = JSON.parse(localStorage.getItem('user'));
    const UserID = {
      id: user._id
    }
    // Adds the discussion to liked list
    axios.post('http://localhost:4000/users/clearComments', UserID)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
    window.location.reload();
  }


  ClearFollows() {
    var user = JSON.parse(localStorage.getItem('user'));
    const UserID = {
      id: user._id
    }
    // Adds the discussion to liked list
    axios.post('http://localhost:4000/users/clearFollows', UserID)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
    window.location.reload();
  }

  render() {
    console.log(this.state.notifications);
    return (
      <Fragment>
        {/* REACTJS HELMET */}
        <Helmet>
          <meta charSet="utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Notifications</title>

          {/* LINKS */}
          <link rel="canonical" href="http://mysite.com/example" />
          <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet>

        <Container>
          <Row>
            <Col sm></Col>
            <Col sm>
              <div className="dashboard">
                <h3 className="heading">Notifications</h3><hr /><br />
                {this.state.notifications.length === 0 && <div >No Notifications</div>}
                {this.state.notifications.reverse().map(notification =>
                  <a href={(notification.discussion_title != null && "/d/?id=" + notification.discussion) || (notification.discussion_title == null && "/u/?id=" + notification.user)} aria-label="notification" rel="noopener"  class="nowrap">
                    <div className="notification">
                    <p>
                      <span class="nowrap"><Image className="user-image-mini" roundedCircle src={notification.user_pic}/>  <b>{notification.user_name}</b> {notification.message} {notification.discussion_title != null && <b> "{notification.discussion_title}" </b>}</span>
                      <span class="nowrap">- {moment(notification.time).startOf('seconds').fromNow()}</span>
                    </p>
                    
                  </div></a>

                )}
                <button aria-label="Clear Notifications" className="standard-option-btn-post" onClick={() => { this.Clearlikes() }}>Clear Likes</button>
                <button aria-label="Clear Notifications" className="standard-option-btn-post" onClick={() => { this.ClearComments() }}>Clear Comments</button>
                <button aria-label="Clear Notifications" className="standard-option-btn-post" onClick={() => { this.ClearFollows() }}>Clear Follows</button>
              </div>
            </Col>
            <Col sm></Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}