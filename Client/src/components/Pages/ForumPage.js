import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import FeedOptions from '../Lists/FeedOptions'
import {Badge, Modal} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import CreateForumPost from '../Common/CreateForumPost'
import AskQuestion from '../Common/AskQuestion'


export default class ForumPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forum: [],
      users:[],
      user:''
    };
  }

    componentDidMount() {
      var forum_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#f0f2f5";
      var user = JSON.parse(localStorage.getItem('user'));
      this.setState({ id: user._id });

      axios.get('http://localhost:4000/forums/get-forum-page', {
        params: {
          id: forum_id
        }
      })
        .then((response) => {
          this.setState({ forum: response.data.forum,
            users: response.data.forum.users, 
          })
        })
        .catch((error) => {
          console.log(error);
        });

      axios.get('http://localhost:4000/users/get-user-details', {
          params: {
            id: user._id
          }
        })
          .then((response) => {
            this.setState({
              forumPosts: response.data.user.forumPosts,
            })
    
          })
          .catch((error) => {
            console.log(error);
          });
          

    }
    render(){
      return (
         <div>
            {/* REACTJS HELMET */}
            <Helmet>
                      <meta charSet="utf-8" />
                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                      <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                      <title>Forum</title>

                      {/* LINKS */}
                      <link rel="canonical" href="http://mysite.com/example" />
                      <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                      <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
              </Helmet> 
          <div className="containerFeedLeft">
            <FeedOptions/>
          </div>
    
          <div className="containerFeedMiddle">
              <div className="forum-container">
                  <span  className="username-wrapper">
                      <h4>{this.state.forum.name}</h4>
                      <div id="wrapper">
                        <Badge className="forum-badge-item"  pill variant="secondary">{this.state.forum.visibility}</Badge>
                        <p className="forum-followers-item"><b className="forum-followers">{this.state.users.length} Followers</b></p>
                      </div>
                      </span>
                       <br/>
                      <PostOptions/>


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
       
              

          </div>
    
          <div className="containerFeedRight">
        
          </div>
      </div>
      );
     }
}

//  FUNCTIONS TO OPEN EVENT MODAL
function PostOptions() {
  const [modalShowPost, setShowPost] = React.useState(false);
  const [modalShowQuestion, setShowQuestion] = React.useState(false);

  return (
    <div>
            <button className="post-option-btn-item-event"  onClick={() => setShowPost(true)}>Create Post</button>
            <button className="post-option-btn-item-event"  onClick={() => setShowQuestion(true)}>Ask a Question</button>

            <ForumPost
                show={modalShowPost}
                onHide={() => setShowPost(false)}
            />

            <Question
                show={modalShowQuestion}
                onHide={() => setShowQuestion(false)}
            />
    </div>
  );
}

function ForumPost(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CreateForumPost/>
        </Modal.Body>
      </Modal>
    );
  }

function Question(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ask a Question
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AskQuestion/>
        </Modal.Body>
      </Modal>
    );
  }