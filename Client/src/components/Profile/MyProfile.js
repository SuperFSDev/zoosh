import React from 'react';
import '../../assets/App.css';
import { Image, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios';
import { Helmet } from 'react-helmet'
import History from './ProfilePostHistory'

export default class MyProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      id: '',
      user: '',
      college: '',
      course: '',
      dob: '',
      time: '',
      posts: [],
      following: [],
      followers: [],
      societies: [],
      society_ids: [],
      likedDiscussions: [],
      admin: [],
      badges: [],
      isYellowTag: false,
    };
  }

  async componentDidMount() {

    var user = JSON.parse(localStorage.getItem('user'));
    document.body.style.backgroundColor = "#F7F7F7";

    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id,
        fields: 'fullname followers likedPosts pic societies badges college time score'
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({
          user: response.data.user,
          followers: response.data.user.followers,
          following: response.data.user.following,
          admin: response.data.user.admin,
          society_ids: response.data.user.societies,
          badges: response.data.user.badges,
          posts: response.data.user.posts,
          likedPosts: response.data.user.likedPosts
        })
        console.log(this.state.societies);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:4000/discussions/get-user-discussions', {
      params: {
        id: user._id,
        fields: 'user society time thumbnail_pic title content likes comments user_id',
        sort: 'likes'
      }
    })
      .then((response) => {
        if (this.state.post == undefined) {
          this.setState({
            posts: response.data.discussions
          })
        } else {
          this.setState({
            posts: this.state.posts.concat(response.data.discussions)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (this.state.likedPosts != null) {
      for (var i = 0; i < this.state.likedPosts.length; i++) {
        this.GetLikedPost(this.state.likedPosts[i])
      }
    }

    // Loops through society ID's and gets the data for each society.
    this.state.society_ids.map(society_id => (
      axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
        .then((response) => {
          var joined = this.state.societies.concat(response.data.society);
          this.setState({ societies: joined });
        })
    ));
  }

  async GetLikedPost(DiscussionID) {
    console.log("disc id = " + DiscussionID);
    await axios.get('http://localhost:4000/discussions/get-discussion-page', {
      params: {
        id: DiscussionID,
      }
    })
      .then((response) => {
        if (response.data.discussion == null) {
          this.checkIfNull(DiscussionID)
        }
        else {
          this.setState({
            likedDiscussions: this.state.likedDiscussions.concat(response.data.discussion),
            isLoading: false,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    var title = this.state.user.fullname + " - Website"

    return (
      <>
        {/* REACTJS HELMET */}
        <Helmet>
          <meta charSet="utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{title}</title>

          {/* LINKS */}

          <link rel="canonical" href="http://mysite.com/example" />
          <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet>

        <Container fluid>
          <Row>
            <div className="community-header" style={{ background: '#222831' }}>
              <Col md>
                <div className="community-profile">
                  <span>
                    <Image alt="" src={this.state.user.pic} className="profile-image" roundedCircle />
                    <a href="/settings"><button className="community-btn-a" >Settings</button></a>
                  </span>

                  <br />
                  <h5>{this.state.user.fullname} <b className="user-score">{this.state.user.score}</b></h5>
                  <br />
                  {this.state.followers != null && this.state.followers.length === 0 && <b>{this.state.followers.length} followers</b>}
                  {this.state.followers != null && this.state.followers.length > 1 && <b>{this.state.followers.length} followers</b>}
                  {this.state.followers != null && this.state.followers.length === 1 && <b>{this.state.followers.length} follower</b>}                      <br />
                </div>
              </Col>
            </div>
          </Row>

          <Row>
            <Col sm></Col>
            <Col sm>
              <div className="community-feed">
                <div className="top-posts">
                  {this.state.posts != null && this.state.posts.length === 0 && <div className="top-posts-empty">No Posts</div>}
                  {this.state.posts != null && this.state.posts.length > 0 && <div><History /></div>}
                </div>
              </div>

            </Col>
            <Col sm>
              <div className="community-members-container">
                <span>Activity</span>
                <div>
                  {this.state.likedDiscussions !== undefined && this.state.likedDiscussions.map(discussion =>
                    <p>
                      <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect">
                        <b>You</b> clapped to a post written by <b>{discussion.user}.</b>
                      </a>
                      <hr />
                    </p>
                  )}
                </div>
              </div>

              <div className="contributors-container">
                <span>Communities</span><br />

                {this.state.societies[0] === undefined ? (
                  <div></div>
                ) : (
                    this.state.societies.map(society =>
                      <span key={society._id}>
                        <b><a href={"/c/?id=" + society._id}>{society.name}</a> <b className="user-admin">Founder</b></b><br /><br />
                      </span>
                    )
                  )}
              </div>
            </Col>
            <Col sm></Col>
          </Row>
        </Container>
      </>
    );
  }
}

// // MODAL TO CREATE SOCIETY/CLUB
// function QuickOptions() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <div>
//       <div>
//         <VscDiffAdded size={55} className="square" id="dropdown-basic" onClick={() => setModalShow(true)} />
//         <MyVerticallyCenteredModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//         />
//       </div>
//     </div>
//   );
// }

// // MODEL HANDLE
// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       textAlign="left"
//     >
//       <Modal.Header closeButton>
//         <h3>Create Community</h3>
//       </Modal.Header>
//       <Modal.Body>
//         <CreateASoc />
//       </Modal.Body>
//     </Modal>
//   );
// }