import React from 'react';
import '../../App.css';
import ProfileUsername from '../Profile/ProfileUsername'
import ProfilePicture from '../Profile/ProfilePicture'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {BiSend,BiUpvote,BiDownvote} from 'react-icons/bi'
import moment from 'moment'
import { Form } from 'react-bootstrap';

export default class GlobalPost extends React.Component {

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
                  <title>Post</title>

                  {/* LINKS */}
                  <link rel="canonical" href="http://mysite.com/example" />
                  <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                  <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
          </Helmet> 

          <div className="containerPostLeft">
              <ProfilePicture/>
              <ProfileUsername/>
          </div>

          <div className="containerPostMiddle">
            <div className="forum-container">
              {/* <h1>{this.state.discussion.title}</h1> */}
              {/* <p>{this.state.discussion.content}</p> */}
              {/* <big className="text-muted">{moment(this.state.discussion.time).format("H:mma - MMM Do, YYYY.")}</big><br/> */}

                {/* Discussion Post interaction options */}
                <span className="voting-btn"><button className="standard-option-btn-post"><BiUpvote size={20} /> Upvote</button></span>
                <span className="voting-btn"><button className="standard-option-btn-post"><BiDownvote  size={20} /> Downvote</button></span>
          </div>

          {/* Comment Section of Discussion Post */}
          <div className="comment-container">
              <hr/>  
                <Form>
                  <input            
                    className="commentBox"
                    label="Comment"
                    style={{ margin: 1, fontSize: 20, maxLength:150, paddingBottom:10}}         
                    placeholder="Add a comment..."         
                    required
                  />
                    <button className="trending-soc">Post Comment</button>
                </Form>   
          </div>    
          <div className="comment-container">
            <div className="users-comment">
              <a className="user-profile-shortlink">Test<b className="user-score-post">123</b></a>
                 <p>hello</p>  
            </div>
                                           
          </div>
          
        </div>   
        </>
      );
    }
  }

