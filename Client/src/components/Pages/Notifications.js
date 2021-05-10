import React, { Fragment } from 'react';
import '../../assets/App.css';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { Row, Col, Container, Image, Modal } from 'react-bootstrap'
import { BsTrash, BsHouse, BsBell, BsSearch, BsBarChart } from "react-icons/bs";
import { BiRocket } from 'react-icons/bi'
import NewPost from './NewPost';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import Skeleton from 'react-loading-skeleton';
import { AiOutlineTrophy } from 'react-icons/ai'

export default class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
      searchValue: '',
      posts: [],
      notifications: [],
      user: '',
      notifications: [],
      name: ''
    };
  }

  async componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.getUserDetails();

    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id
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

    // Fetching the users notifications by searching the Notifications Model for documents containing the logged in users ID
    await axios.get('http://localhost:4000/notifications/get-user-notifications', {
      params: {
        notify_id: user._id,
        fields: 'user_id user_name user_pic time message discussion_id discussion_title ',
      }
    })
      .then((response) => {
        if (this.state.notifications == undefined) {
          this.setState({
            notifications: response.data.notifications
          })
        } else {
          this.setState({
            notifications: this.state.notifications.concat(response.data.notifications),
            isLoading: false
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Fetching the users Details
  getUserDetails() {
    var user = JSON.parse(localStorage.getItem('user'));
    axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id,
        fields: 'forums societies likedPosts username pic'
      }
    })
      .then((response) => {
        this.setState({
          user: response.data.user,
          forums: response.data.user.forums,
          socs: response.data.user.societies,
          likedPosts: response.data.user.likedPosts
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteNotification(id) {

    axios.get('http://localhost:4000/notifications/deleteNotification', {
      params: {
        _id: id,
      }
    });
    window.location.reload();
  }

  deleteAllNotification() {
    var user = JSON.parse(localStorage.getItem('user'));
    axios.get('http://localhost:4000/notifications/deleteAllNotifications', {
      params: {
        id: user._id,
      }
    });
    window.location.reload();
  }



  render() {
    console.log(this.state.notifications);
    return (
      <Fragment>
        <Container>
          {/* REACTJS HELMET */}
          <Helmet>
            <meta charSet="utf-8" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Notifications / Zoosh</title>

            {/* LINKS */}
            <link rel="canonical" href="http://mysite.com/example" />
            <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
          </Helmet>
          <Row>
            <Col sm>
              <div className="filter-options">
                <a href="/"><button className="feed-option"><BsHouse size={25} className="icon" /> Home</button></a><br />
                <a href="/top"><button className="feed-option"><BsBarChart size={25} className="icon" />  Top</button></a>
                <a href="/explore"><button className="feed-option"><BiRocket size={25} className="icon" />  Explore</button></a>
                <a href="/notifications"><button className="feed-option-active"><BsBell size={25} className="icon" />  Notifications</button></a>
                <a href="/leaderboard"><button className="feed-option"><AiOutlineTrophy size={30} className="icon" />  Leaderboard</button></a>
                <a href="/search"><button className="feed-option"><BsSearch size={25} className="icon" />  Search</button></a>
                <a href="/me"><button className="feed-option-avatar"><Image alt={this.state.user.fullname} src={this.state.user.pic} className="avatar-feed" /><b>@{this.state.user.username}</b></button></a>
                <br /><br />
                <CreatePost />
              </div>
            </Col>
            <Col>

              <div className="feed">
                {this.state.isLoading &&
                  <div className="feed">
                    <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }} />
                    <Skeleton height={30} width={350} style={{ marginBottom: 10 }} />
                    <Skeleton height={30} width={300} style={{ marginBottom: 10 }} /><br />
                    <Skeleton height={30} width={400} style={{ marginBottom: 10 }} /><br />
                  </div>}
                {!this.state.isLoading && this.state.notifications.length === 0 && <div >No Notifications</div>}
                {this.state.notifications.reverse().map(notification =>
                  <div>
                    <a href={(notification.discussion_title != null && "/d/?id=" + notification.discussion_id) || (notification.discussion_title == null && "/u/?id=" + notification.user_id)} aria-label="notification" rel="noopener" class="nowrap">
                      <div className="notification">
                        <p>
                          <span class="nowrap"><Image className="user-image-mini" roundedCircle src={notification.user_pic} />  <b>{notification.user_name}</b> {notification.message} {notification.discussion_title != null && <b> "{notification.discussion_title}" </b>}</span>
                          <br /><span class="nowrap" style={{ marginLeft: 55 }}>{moment(notification.time).startOf('seconds').fromNow()}</span>

                        </p>

                      </div></a>
                    {/* <button aria-label="add" className="standard-option-btn-post" onClick={() => { this.deleteNotification(notification._id) }}><BsXCircleFill size={30} /></button> */}
                  </div>)}
                <button aria-label="add" className="standard-option-btn-post" onClick={() => { this.deleteAllNotification() }}>Clear Notifications  <BsTrash size={20} /></button>
              </div>
            </Col>
            <Col sm>
              <Recommended /><Contributors />
            </Col>

          </Row>
        </Container>
      </Fragment>
    );
  }
}

// MODAL TO CREATE SOCIETY/CLUB
function CreatePost() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <div>
        <button className="write-button" onClick={() => setModalShow(true)}>Write a post</button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
}

// MODEL HANDLE
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      textAlign="left"
    >
      <Modal.Header closeButton>
        <h5>Write a post</h5>
      </Modal.Header>
      <Modal.Body>
        <NewPost />
      </Modal.Body>
    </Modal>
  );
}