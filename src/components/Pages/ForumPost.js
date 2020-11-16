import React from 'react';
import '../../App.css';
import ProfileUsername from '../Profile/ProfileUsername'
import ProfileURL from '../Profile/ProfileURL'
import ProfilePicture from '../Profile/ProfilePicture'
import axios from 'axios';

export default class ForumPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: '',
    };
  }

    componentDidMount() {
      var discussion_id = new URLSearchParams(this.props.location.search).get("id");

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
    }

    render() {
      return (
        <>
          <div className="containerFeedLeftForum">
            <a href="/profile"><div className="profile-card-forum">
              <ProfilePicture />
              <ProfileUsername />
              <div className="user-profile-btn-options">
                <span className="user-profile-btn-options">
                </span>
              </div>
            </div></a><br/>
            <a href="/list-of-clubs-and-societies"><div className="profile-card-society">
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