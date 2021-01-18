import React from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import FeedOptions from '../../Lists/FeedOptions'
import {Badge, Modal} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import CreateForumPost from '../../Common/CreateForumPost'
import AskQuestion from '../../Common/AskQuestion'
import Avatar from '@material-ui/core/Avatar';
export default class ForumPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forum: [],
      users:[],
      user:'',
      isLoading:true,
      isUnfollowing:true,
    };
  }

    componentDidMount() {
      var forum_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#F7F7F7";
      var user = JSON.parse(localStorage.getItem('user'));
      this.setState({ id: user._id });
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
            isLoading:false
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

    addForum(frm) {
      addUserToForum(frm);
      this.setState({
        isUnfollowing:false,
      })
    }

    render(){
      var isUnfollowing = this.state.isUnfollowing;

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
              <div className="global-feed">
                  <span  className="username-wrapper">

                      <h2 className="forum-title">
                        {this.state.forum.name} 

                        {isUnfollowing ? (
                          <button className="forum-follow-btn" onClick={() => this.addForum(this.state.forum.name)}>Follow</button> 
                        ) : (
                          <button className="forum-follow-btn" onClick={() => this.addForum(this.state.forum.name)}>Unfollow</button> 
                          )}
                      </h2>

                      <div id="wrapper">
                        <Badge className="forum-badge-item"  pill variant="secondary">{this.state.forum.visibility}</Badge>
                        <p className="forum-followers-item"><b className="forum-followers">{this.state.users.length} Followers</b></p>
                        

                      </div>
                      </span>
                       <br/>
                      <PostOptions/>


                <div className="forum-post-container">
                        <h4>Forum Post 1</h4>
                        <p className="forum-post-content"><Avatar className="profile-btn-wrapper-left" src={this.state.user.pic}/> <b>Posted by Aaron</b></p>
                        <hr/>
                        <p  className="forum-post-content">Small amount of text content</p>
                </div>
                <div className="forum-post-container">
                        <h4>Forum Post 2</h4>
                        <p className="forum-post-content"><Avatar className="profile-btn-wrapper-left" src={this.state.user.pic}/> <b>Posted by Aaron</b></p>
                        <hr/>
                        <p  className="forum-post-content">Small amount of text content</p>
                </div>
                <div className="forum-post-container">
                        <h4>Forum Post 3</h4>
                        <p className="forum-post-content"><Avatar className="profile-btn-wrapper-left" src={this.state.user.pic}/> <b>Posted by Aaron</b></p>
                        <hr/>
                        <p  className="forum-post-content">Small amount of text content</p>
                </div>
                <div className="forum-post-container">
                        <h4>Forum Post 4</h4>
                        <p className="forum-post-content"><Avatar className="profile-btn-wrapper-left" src={this.state.user.pic}/> <b>Posted by Aaron</b></p>
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
          <Modal.Body>
              <CreateForumPost/>
          </Modal.Body>
        </Modal.Header>
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
        <Modal.Body>
            <AskQuestion/>
        </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }

  
// Adding a User to forum to follow
async function addUserToForum(frm) {

  var getUser = JSON.parse(localStorage.getItem('user'))

  const addForum = {
      forum: frm,
      user: getUser,
      user_id: getUser._id,
  }

   // Adds users to forums followers array in user model.
   await axios.post('http://localhost:4000/forums/update', addForum)
      .then(function (resp) {
          console.log(resp);
          alert("Successfully followed forum " + frm);
      })
      .catch(function (error) {
          console.log(error);
      })

  // Adds forum to following array in user model.
  await axios.post('http://localhost:4000/users/addToForumFollowingList',addForum)
      //add to following array
      .then(function (resp) {
          console.log(resp);
      })
      .catch(function (error) {
          console.log(error);
      })

}

