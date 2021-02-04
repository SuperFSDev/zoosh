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
    };
  }

  async componentDidMount() {
    document.body.style.backgroundColor = "#F7F7F7";
    var user = JSON.parse(localStorage.getItem('user'));
    
    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id,
      }
    })
      .then((response) => {
        this.setState({
          user: response.data.user,
          notifications: response.data.user.notifications,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  render() {
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
                <h3 className="heading">Notifications</h3><hr/><br />
                {this.state.notifications.length === 0 && <div >No Notifications</div>}
                {this.state.notifications.map(notification=>
                    <a href={"/d/?id=" + notification.discussion} aria-label="notification" rel="noopener"><div className="notification">
                        <Image src={Clapped} />  <b>{notification.user}</b> clapped to your post.
                    </div></a>
                )}
              </div>
            </Col>
            <Col sm></Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}