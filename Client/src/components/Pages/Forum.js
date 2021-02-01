import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Modal, Row, Col, Container} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import CreateForumPost from '../Common/CreateForumPost'
import moment from 'moment'

export default class Forum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forums: [],
      users:[],
      user:'',
      tags:'',
      isLoading:true,
      isUnfollowing:true,
      showPosts:true,
      showQuestions:false,
    };
  }

    componentDidMount() {
      document.body.style.backgroundColor = "#F7F7F7";

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

    render(){
      var { forums } = this.state;
      var user = JSON.parse(localStorage.getItem('user'));

      const forumList = forums.map(forum => {
        return(
            <div key={forum._id}>
              <div className='forum-post'>
                <div>
                  <p>
                    <a href={"u/?id=" + user._id} className="post-link-a"><span className="voting-btn">
                    <span class="showhim">
                      <a href={"/me"} className="post-link-a"><b>{forum.user}</b></a>  
                      <span class="showme"> <b>{forum.user}</b></span>
                    </span>
                    </span></a><br/>
                    <span className="forum-title">{forum.post}</span><br/>
                    <span style={{marginLeft:10}}>({moment(forum.time).startOf('seconds').fromNow()})</span><br/>
                    <span style={{background:'lightblue', color:'gray'}}>#{forum.tags}</span>
                    <br/>
                  </p>
                </div>
              </div>
            </div>
          )})

      return (

        <Container>
          <Row>

            <Col sm>
                <div className="forum-container">
                  <h4>Feature Requests / Bugs</h4>
                  <br/>
                  <p className="forum-followers-item"><b className="forum-followers">This forum is Public</b></p>
                  <p className="forum-followers-item"><b className="forum-followers">{this.state.users.length} Posts</b></p>
                  <FeaturePost/>
                </div>
            </Col>
    
            <Col sm>
              <div className="forum-list">
                <p>{forumList}</p>
              </div>
            </Col>


          </Row>
        </Container>
    );
  }
}

//  FUNCTIONS TO OPEN EVENT MODAL
function FeaturePost() {
  const [modalShowPost, setShowPost] = React.useState(false);

  return (
    <div>
            <button className="post-option-btn-item-event" onClick={() => setShowPost(true)}>Post</button>

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


