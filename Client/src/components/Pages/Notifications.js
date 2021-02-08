import React, { Fragment } from 'react';
import '../../assets/App.css';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { Row, Col, Container, Image } from 'react-bootstrap'
import Clapped from '../../images/clap-hands.png'
import Avatar from '@material-ui/core/Avatar';
import { BsXCircleFill } from "react-icons/bs";
export default class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
      searchValue: '',
      posts: [],
      notifications:[],
      user: '',
      notifications: [],
      name: ''
    };
  }

  async componentDidMount() {
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
              notifications: this.state.notifications.concat(response.data.notifications)
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }

  deleteNotification(id){

      axios.get('http://localhost:4000/notifications/deleteNotification',{
        params: {
          _id:id,   
        }    
  });
  window.location.reload();
}

deleteAllNotification(){
  var user = JSON.parse(localStorage.getItem('user'));
    axios.get('http://localhost:4000/notifications/deleteAllNotifications',{
      params: {
        id:user._id,   
      }    
});
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
                <div>
                  <a href={(notification.discussion_title != null && "/d/?id=" + notification.discussion_id) || (notification.discussion_title == null && "/u/?id=" + notification.user_id)} aria-label="notification" rel="noopener"  class="nowrap">
                    <div className="notification">
                    <p>
                      <span class="nowrap"><Image className="user-image-mini" roundedCircle src={notification.user_pic}/>  <b>{notification.user_name}</b> {notification.message} {notification.discussion_title != null && <b> "{notification.discussion_title}" </b>}</span>
                      <span class="nowrap">- {moment(notification.time).startOf('seconds').fromNow()}</span>
                     
                    </p>
                  
                  </div></a>
               <button aria-label="add" className="standard-option-btn-post" onClick={() => { this.deleteNotification(notification._id) }}><BsXCircleFill size={30} /></button>
               </div> )}
                           
                <button aria-label="add" className="standard-option-btn-post" onClick={() => { this.deleteAllNotification() }}>Delete all  <BsXCircleFill size={30} /></button>
              </div>
  
            </Col>
            <Col sm></Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}