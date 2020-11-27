import React from 'react';
import '../../App.css';
import ProfileUsername from '../Profile/ProfileUsername'
import ProfileURL from '../Profile/ProfileURL'
import ProfilePicture from '../Profile/ProfilePicture'
import axios from 'axios';
import {Helmet} from 'react-helmet'

class DiscussionPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: '',
      societies: [],
    };
  }

    componentDidMount() {
      var discussion_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#f0f2f5";


      axios.get('http://localhost:4000/discussions/get-discussion-page', {
        params: {
          id: discussion_id
        }
      })
        .then((response) => {
          this.setState({ discussion: response.data.discussion })
        })
        .catch((error) => {
          console.log(error);
        });

      axios.get('http://localhost:4000/societies/getSocieties')
        .then((response) => {
          this.setState({ societies: response.data.societies })
      })
      .catch((error) => {
          console.log(error);
      });
    }

    render() {
      return (
        <>
          {/* REACTJS HELMET */}
        <Helmet>
                  <meta charSet="utf-8" />
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>Discussions</title>

                  {/* LINKS */}
                  <link rel="canonical" href="http://mysite.com/example" />
                  <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                  <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
          </Helmet> 
          <div className="containerFeedLeftForum">
            <a href="/me"><div className="profile-card-forum">
              <ProfilePicture />
              <ProfileUsername />
              <div className="user-profile-btn-options">
                <span className="user-profile-btn-options">
                </span>
              </div>
            </div></a><br/>
            <a href="/information"><div className="profile-card-society">
              {this.state.discussion.society}
            <div className="user-profile-btn-options">
                <span className="user-profile-btn-options">
                  <ProfileURL />
                </span>
              </div>
            </div></a>
            <br />
            {/* <div className="user-profile-about-social-forum">
              <p className="profile-social-icons"><RiFacebookCircleFill size={25} /> <SiTwitter size={25} /> <SiInstagram size={25} /> <SiLinkedin size={25} /></p>
            </div> */}
          </div>

          <div className="containerFeedMiddleForum">
            <div className="discussion-container">
              <h1>{this.state.discussion.title}</h1>
              <p>{this.state.discussion.content}</p>
              <p><b>{this.state.discussion.time}</b></p>
            </div>
          </div>

          <div className="containerFeedRightProfile">

          </div>
        </>
      );
    }
  }

  export default DiscussionPost;