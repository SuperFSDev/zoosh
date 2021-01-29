import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Modal, Row, Col, Container} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import CreateForumPost from '../Common/CreateForumPost'
import AskQuestion from '../Common/AskQuestion'
import moment from 'moment'

export default class Forum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forums: [],
      users:[],
      user:'',
      isLoading:true,
      isUnfollowing:true,
      showPosts:true,
      showQuestions:false,
    };
  }

    componentDidMount() {
      document.body.style.backgroundColor = "#FDFEFE";
      var forum_id = new URLSearchParams(this.props.location.search).get("id");
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

      axios.get('http://localhost:4000/forums/getForumPosts')
        .then((response) => {
          this.setState({ 
            forums: response.data.forums,
            users:response.data.forums,
            isLoading: false, })
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
      var { forums } = this.state;
      var isUnfollowing = this.state.isUnfollowing;
      var user = JSON.parse(localStorage.getItem('user'));

      const forumList = forums.reverse().map(forum => {
        return(
            <div key={forum._id}>
              <div className='discussion-post'>
                <a href={"/q/?id=" + forum._id} className="miniprofile-post-redirect">
                <div>
                  <p>
                    <a href={"u/?id=" + user._id} className="post-link-a"><span className="voting-btn">
                      <b>{forum.user}</b>  
                    </span></a><br/>
                    <span className="forum-title">{forum.post}</span><br/>
                    <span style={{marginLeft:10}}>({moment(forum.time).startOf('seconds').fromNow()})</span>
                    <br/>
                  </p>
                </div>
                </a>
              </div>
            </div>
          )})

      return (

        <Container>
          <Row>
            <Col>
                <div className="forum-container">
                  <h4>Feature Requests / Bugs</h4>
                  {isUnfollowing ? (
                  <button className="community-btn-b" onClick={() => this.addForum(this.state.forum.name)}>Follow</button> 
                  ) : (
                  <button className="community-btn-b" onClick={() => this.addForum(this.state.forum.name)}>Unfollow</button> 
                  )}
                  <br/>
                  <p className="forum-followers-item"><b className="forum-followers">This forum is Public</b></p>
                  <p className="forum-followers-item"><b className="forum-followers">{this.state.users.length} Posts</b></p>
                  <PostOptions/>
                </div>
            </Col>
    
            <Col>
                <p>{forumList}</p>
            </Col>
          </Row>
        </Container>

      //   <div class="row">
          // <div className="columnForum2" style={{background:'white'}}>
          //   <div className="forumContainer">
          //     <div>
          //       <h4>Feature Requests / Bugs</h4>
          //       {isUnfollowing ? (
          //       <button className="community-btn-b" onClick={() => this.addForum(this.state.forum.name)}>Follow</button> 
          //       ) : (
          //       <button className="community-btn-b" onClick={() => this.addForum(this.state.forum.name)}>Unfollow</button> 
          //       )}
          //       <br/>
          //       <p className="forum-followers-item"><b className="forum-followers">This forum is Public</b></p>
          //       <p className="forum-followers-item"><b className="forum-followers">{this.state.users.length} Posts</b></p>
          //       <PostOptions/>
          //     </div>
          // </div>
      //   </div>


      //   <div className="columnForum" style={{background:'white',marginTop:100,}}>
      //     <h5 style={{marginLeft:10}}>Forum Posts</h5>
      //     <hr/>
        
      //   <div>
          // <div className="forum-post-container">
          //     <p>{forumList}</p>
          // </div>
      //   </div>
          
      //   </div>

      // </div>
    );
  }
}

//  FUNCTIONS TO OPEN EVENT MODAL
function PostOptions() {
  const [modalShowPost, setShowPost] = React.useState(false);
  const [modalShowQuestion, setShowQuestion] = React.useState(false);

  return (
    <div>
            <button className="post-option-btn-item-event" onClick={() => setShowPost(true)}>Create Post</button>

            <ForumPost
                show={modalShowPost}
                onHide={() => setShowPost(false)}
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

