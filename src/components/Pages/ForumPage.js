import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import FeedOptions from '../Lists/FeedOptions'
import {Badge} from 'react-bootstrap'

export default class ForumPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forum: [],
      followers:[]
    };
  }

    componentDidMount() {
      var forum_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#f0f2f5";

      axios.get('http://localhost:4000/forums/get-forum-page', {
        params: {
          id: forum_id
        }
      })
        .then((response) => {
          this.setState({ forum: response.data.forum,
            followers: response.data.forum.followers, })
        })
        .catch((error) => {
          console.log(error);
        });

    }
    render(){
      return (
         <div>
          <div className="containerFeedLeft">
            <FeedOptions/>
          </div>
    
          <div className="containerFeedMiddle">
              <div className="forum-container">
                  <span  className="username-wrapper">
                      <h4>{this.state.forum.name}</h4>
                      <Badge  pill variant="info">{this.state.forum.visibility}</Badge>
                      <p className="forum-followers-item"><b className="forum-followers">{this.state.followers.length} Followers</b></p>

                    
                      <button className="post-option-btn-item-forum">Create Post</button>
                      <button className="post-option-btn-item-forum">Ask a Question</button>

                  </span>
                  
              </div>
              <div className="forum-post-container">
                      <h4>Forum Post 1</h4>
                      <p className="forum-post-content">Posted by Aaron</p>
                      <hr/>
                      <p  className="forum-post-content">Small amount of text content</p>
              </div>
              <div className="forum-post-container">
                      <h4>Forum Post 2</h4>
                      <p className="forum-post-content">Posted by Aaron</p>
                      <hr/>
                      <p  className="forum-post-content">Small amount of text content</p>
              </div>
              <div className="forum-post-container">
                      <h4>Forum Post 3</h4>
                      <p className="forum-post-content">Posted by Aaron</p>
                      <hr/>
                      <p  className="forum-post-content">Small amount of text content</p>
              </div>
              <div className="forum-post-container">
                      <h4>Forum Post 4</h4>
                      <p className="forum-post-content">Posted by Aaron</p>
                      <hr/>
                      <p  className="forum-post-content">Small amount of text content</p>
              </div>

          </div>
    
          <div className="containerFeedRight">
        
          </div>
      </div>
      );
     }
}
