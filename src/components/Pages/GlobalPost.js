import React from 'react';
import '../../App.css';
import ProfileUsername from '../Profile/ProfileUsername'
import ProfilePicture from '../Profile/ProfilePicture'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {BiSend,BiUpvote,BiDownvote} from 'react-icons/bi'
import moment from 'moment'
import { FaRegCommentDots } from 'react-icons/fa'
import { Form } from 'react-bootstrap';

export default class GlobalPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        post: '',
    };
  }

    componentDidMount() {
      var post_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#f0f2f5";


      axios.get('http://localhost:4000/users/get-post-page', {
        params: {
          id: post_id
        }
      })
        .then((response) => {
          this.setState({ post: response.data.post })
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
                  <title>Post</title>

                  {/* LINKS */}
                  <link rel="canonical" href="http://mysite.com/example" />
                  <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                  <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
          </Helmet> 

          <div className="containerFeedLeft">
            <div className="profile-card">
              <ProfilePicture />
              <a href="/me"><ProfileUsername /></a>
            </div>
          </div>

          <div className="containerFeedMiddle">
            <div className="forum-container">
              <h1>{this.state.post.post}</h1>
              <p><b>{this.state.post.time}</b></p>
            </div>
            <div>
                <div>
                  <div>      
                    <a className="user-profile-shortlink">Test<b className="user-score-post">123</b></a>
                    <p>hello</p>                               
                  </div>                 
                </div><hr/>  
                <Form>
                  <input            
                    className="commentBox"
                    label="Comment"
                    style={{ margin: 1, fontSize: 20, maxLength:150, paddingBottom:10}}         
                    placeholder="Add a comment..."         
                    required
                  />
                    <button className="standard-option-btn" ><BiSend size={25}/></button>
                  </Form>                          
                </div>
          </div>
        </>
      );
    }
  }

