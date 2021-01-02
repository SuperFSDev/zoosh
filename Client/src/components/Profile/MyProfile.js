import React from 'react';
import '../../App.css';
import EditProfile from './EditProfile'
import {Image,Card, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap'
import CreateASoc from '../Socs/CreateASoc'
import {SiAboutDotMe} from 'react-icons/si'
import { RiCake2Fill } from 'react-icons/ri'
import { MdSchool } from 'react-icons/md'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {FaBook,FaRegGem,FaRegLightbulb,FaRegLemon,FaRegHeart,FaRegCommentAlt,FaRegCircle} from 'react-icons/fa'
import moment from 'moment'
import {VscDiffAdded} from 'react-icons/vsc'

export default class MyProfile extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          id: '',
          user: '',
          college:'',
          course:'',
          dob:'',
          time:'',
          posts:[],
          following: [],
          followers: [],
          societies:[],
          badges:[]
      };
    }

  componentDidMount() {
      var user = JSON.parse(localStorage.getItem('user'));
      document.body.style.backgroundColor = "#f0f2f5";

      this.setState({ id: user._id });

      axios.get('http://localhost:4000/users/get-user-details', {
          params: {
              id: user._id,
             
          }
      })
          .then((response) => {
              this.setState({ user: response.data.user,
              followers: response.data.user.followers,
              following: response.data.user.following,
              societies: response.data.user.societies,
              posts:response.data.user.posts,
              badges:response.data.user.badges

            })
          })
          .catch((error) => {
              console.log(error);
          });

  }

  render(){
    return (
      <>
      {/* REACTJS HELMET */}
      <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{this.state.user.fullname}</title>

                {/* LINKS */}
                
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet> 
        <div className="containerFeedLeftProfile">

        </div>

        <div className="containerFeedMiddleProfile">
          <div className="profile-card"></div>
            <div className="user-profile-about">
              <div className="profile-card-align">
                <Image src={this.state.user.pic} className="user-image" roundedCircle/>
                <h2>{this.state.user.fullname} <b className="user-score">{this.state.user.score}</b></h2>
                <EditProfile/><br/>
              </div>
            </div>
            <div className="user-profile-about">
              {/* Users Name */}
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Name</Tooltip>}>
                <span className="d-inline-block">
                <p><SiAboutDotMe /> </p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.fullname}</b><br/>
              
              {/* Users College */}
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Education</Tooltip>}>
                <span className="d-inline-block">
                  <p><MdSchool /></p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.college}</b><br/>

              {/* Users Course Details */}
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Studying</Tooltip>}>
                <span className="d-inline-block">
                <p><FaBook/></p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.course}</b><br/>

              {/* User Joined Date */}
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cake Day</Tooltip>}>
                <span className="d-inline-block">
                <p><RiCake2Fill />  </p>
                </span>
              </OverlayTrigger>
              Joined on <b >{moment(this.state.user.time).format("MMM Do, YYYY.")}</b>
                          
            </div>

            <div className="user-profile-about">
              <h4>Stats</h4><br/>
              <section className="badge-container">
                <div className="stats-item-1">
                  <FaRegLemon size={30}/> <b>{this.state.user.score}</b><br/>Score
                </div>
                <div className="stats-item-1">
                  <span><FaRegGem size={30}/> <b> {this.state.followers.length}</b><br/>Followers</span>
                </div>
                <div className="stats-item-1">
                  <span><FaRegCircle size={30}/> <b> {this.state.societies.length}</b><br/>Communties</span>
                </div>
                <br/>
                <div className="stats-item-1">
                  <span><FaRegCommentAlt size={30}/> <b> {this.state.societies.length}</b><br/>Posts</span>
                </div>
                <div className="stats-item-1">
                  <FaRegLightbulb size={30}/> <b>{this.state.followers.length}</b><br/>Questions
                </div>
                <div className="stats-item-1">
                  <span><FaRegHeart size={30}/> <b> {this.state.societies.length}</b><br/>Answers</span>
                </div>
              </section>
          
            </div>

            <div className="user-profile-about">
              <h4>Badges</h4>
              <section className="badge-container">
                <div className="badge-item-1">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Gold</Tooltip>}>
                            <span className="d-inline-block">
                            <span>🥇 <h2>{this.state.badges.length}</h2></span>
                          </span>
                  </OverlayTrigger>   
                </div>
                <div className="badge-item-2">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Silver</Tooltip>}>
                            <span className="d-inline-block">
                            <span>🥈 <h2>{this.state.badges.length}</h2></span>
                          </span>
                  </OverlayTrigger>  
                </div>
                <div className="badge-item-3">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Bronze</Tooltip>}>
                            <span className="d-inline-block">
                            <span>🥉 <h2>{this.state.badges.length}</h2></span>
                          </span>
                  </OverlayTrigger>  
                </div>
                <br></br><a href="#" id="dropdown-basic"><p >View All</p></a>
              </section>
            </div>
            
            <div className="user-profile-about">
            <h4>Communities <QuickOptions /></h4>
            {this.state.societies.map(society=>
                  <li><b><a href={"/s/?id="+society}>{society}</a></b></li>)}<br/>
            </div>
        </div>
        

        <div className="containerFeedRightProfile">
          <div  className="top-posts-profile-container">
            <h3>Top Posts</h3>
            </div>
                {this.state.posts.reverse().map(post=>  (
                <div key={this.state.user._id}>  
                  <a href="/" className="post-link"><Card className='userPosts'>
                    <Card.Body>          
                      <Card.Text className="fontPost">
                        <a href={"/p/?id=" + post.Post_id}><b className="user-score-post-tag">1234</b>  {post.post} <big  className="text-muted-profile">{moment(post.time).format(" MMM Do 'YY.")}</big><hr/></a>
                      </Card.Text>        
                    </Card.Body>  
                    <h1></h1>                
                  </Card></a>
                </div>
              ))} 
        </div>
      </>
    );
  }
  
}

function ProfilePicture() {
  var user = JSON.parse(localStorage.getItem('user'));
  var pp = user.pic;

  return (
    <div id="social">
      <Image src={pp} className="user-image" />
    </div>
  );
}


// Get profile username
function Username(){
  var user = JSON.parse(localStorage.getItem('user'));
  if(user)
    var fullname = user.fullname; 

  return (
    <div id="social">
      <h3>{fullname}</h3>
      {/* {id} */}
    </div>
  );

}


// MODAL TO CREATE SOCIETY/CLUB
function QuickOptions() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
        <div>
           <VscDiffAdded size={55}  className="square" id="dropdown-basic" onClick={() => setModalShow(true)}/>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    </div>
  );
}

// MODEL HANDLE
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
      >
        <Modal.Header closeButton>
          <h3>Create Community</h3>
        </Modal.Header>
        <Modal.Body>
            <CreateASoc/>
        </Modal.Body>
      </Modal>
    );
  }