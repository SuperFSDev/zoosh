import React from 'react';
import '../../assets/App.css';
import EditProfile from './EditProfile'
import {Image,Card, OverlayTrigger, Tooltip, Modal, Navbar, Nav, Badge} from 'react-bootstrap'
import CreateASoc from '../Socs/CreateASoc'
import {SiAboutDotMe} from 'react-icons/si'
import { RiCake2Fill } from 'react-icons/ri'
import { MdSchool } from 'react-icons/md'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {FaBook,FaRegGem,FaRegLightbulb,FaRegLemon,FaRegHeart,FaRegCommentAlt,FaRegCircle} from 'react-icons/fa'
import moment from 'moment'
import {VscDiffAdded} from 'react-icons/vsc'
import {TiLocation} from 'react-icons/ti'
import Avatar from '@material-ui/core/Avatar';

export default class MyProfile extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
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
          admin:[],
          badges:[],
          isYellowTag:false,
      };
    }

  componentDidMount() {
      var user = JSON.parse(localStorage.getItem('user'));
      // document.body.style.backgroundColor = "#FCFCFC";

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
              admin: response.data.user.admin,
              societies: response.data.user.societies,
              posts:response.data.user.posts,
              badges:response.data.user.badges,
              

            })
          })
          .catch((error) => {
              console.log(error);
          });

  }

  render(){

    var title = this.state.user.fullname + " - Website"

    return (
      <>
      {/* REACTJS HELMET */}
      <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{title}</title>

                {/* LINKS */}
                
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet> 

        <Navbar  className="navbar-profile" >
                  <Nav className="mr-auto">
                      <Navbar.Brand className="header-profile">
                        <span  className="navbar-title">
                          <b>{this.state.user.fullname} </b>
                          {/* <b className="user-member-profile">{this.state.user.score}</b> */}
                        </span> 
                        <span>
                          <EditProfile/>
                        </span>       
                        </Navbar.Brand>
                  </Nav>

                  <Navbar.Collapse className="justify-content-end">
                    <div className="quick-create-option">
                      <div>
                        <a href="/home"><button className="write-button">Home</button></a>
                      </div>
                    </div>   

                    <div className="navbar-prof-btn">
                      <div id="#battleBox">
                        <a href="/me"><Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"  onClick={this.showProfile} roundedCircle/></a>
                      </div>
                    </div>                   
                  </Navbar.Collapse>
        </Navbar>

        <div className="containerFeedMiddleProfile">
          <div className="profile-card"></div>
            {/* <div className="user-profile-about"> */}
              <div className="profile-card-align">
                <Image src={this.state.user.pic} className="user-image"/>
                {/* <h3>
                  {this.state.user.score >= 1 && this.state.user.score <=999 ? (
                      <span><b className="user-member">{this.state.user.score}</b><br/></span>

                  ) : this.state.user.score >=1000 ?(
                    <span><b  className="user-mod">{this.state.user.score}</b><br/></span>
                  ) : this.state.user.score >= 5000 ? (
                    <span><b  className="user-admin">{this.state.user.score}</b><br/></span>
                  ) : (
                    <span><b>{this.state.user.score}</b><br/></span>
                  )} 
                
                </h3> */}
                <br/><br/>
                <Badge variant="secondary"><h6>{this.state.user.college} &#x2022; {this.state.user.course}</h6></Badge>
              </div>
              <br/>
              <div className="user-profile-about-bio">

                <br/><br/>
                <span className="text-muted">COMMUNTIES</span>
                {this.state.societies.map(society=>
                  <li className="community-members-item-profile">
                    <p>
                      <b><a href={"/s/?id="+society} className="community-item-link">{society}</a> <b className="user-admin">Admin</b></b><br/>
                    </p>
                   
                  </li>)}
              </div>
              
            {/* </div> */}

            {/* <div className="user-profile-about">
              <section className="badge-container"> */}
                {/* <div className="stats-item-1">
                {this.state.user.score >= 1 && this.state.user.score <=999 ? (
                      <span><b className="user-member">{this.state.user.score}</b><br/></span>

                  ) : this.state.user.score >=1000 ?(
                    <span><b  className="user-mod">{this.state.user.score}</b><br/></span>
                  ) : this.state.user.score >= 5000 ? (
                    <span><b  className="user-admin">{this.state.user.score}</b><br/></span>
                  ) : (
                    <span><b>{this.state.user.score}</b><br/></span>
                  )} Score
                </div>
                <div className="stats-item-1">
                  <span><BsPerson size={30}/> <b> {this.state.followers.length}</b><br/>Followers</span>
                </div>
                <div className="stats-item-1">
                  <span><BsCircle size={30}/> <b> {this.state.societies.length}</b><br/>Communties</span>
                </div>
                <br/> */}
                {/* <div className="stats-item-1">
                  <span><BsChatSquareDots size={30}/> <b> {this.state.societies.length}</b><br/>Posts</span>
                </div>
                <div className="stats-item-1">
                  <BsQuestionSquare size={30}/> <b>{this.state.followers.length}</b><br/>Questions
                </div>
                <div className="stats-item-1">
                  <span><BsShieldShaded size={30}/> <b> {this.state.societies.length}</b><br/>Answers</span>
                </div>
              </section>
          
            </div> */}

            {/* <div className="user-profile-about">
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Name</Tooltip>}>
                <span className="d-inline-block">
                <p><SiAboutDotMe /> </p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.fullname}</b><br/>
              
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Education</Tooltip>}>
                <span className="d-inline-block">
                  <p><MdSchool /></p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.college}</b><br/>

              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Studying</Tooltip>}>
                <span className="d-inline-block">
                <p><FaBook/></p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.course}</b><br/>        
            </div> */}

            {/* <div className="user-profile-about">
              <h5>Badges</h5>
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
              </section>
            </div> */}
            
            {/* <div className="user-profile-about">
            <h5>Communities <QuickOptions /></h5>
            {this.state.societies.map(society=>
                  <li className="community-members-item-profile">
                    <b><a href={"/s/?id="+society}>{society}</a></b><br/>
                    <b>Admin</b>
                  </li>)}<br/>
            </div> */}
        </div>
        

        <div className="containerFeedRightProfile">
        {/* <div  className="top-posts-profile-container">
          <div className="user-profile-overview">
          <span><p>{this.state.user.bio}</p></span>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cake Day</Tooltip>}>
                <span className="d-inline-block">
                <p id="icons"><RiCake2Fill size={25}/>  </p>
                </span>
              </OverlayTrigger>
                Joined on {moment(this.state.user.time).format("MMM Do, YYYY.")}

              <OverlayTrigger  overlay={<Tooltip id="tooltip-disabled">Location</Tooltip>}>
                <span className="d-inline-block" >
                <p  id="icons" className="spacing-right"><TiLocation  size={25}/>  </p>
                </span>
              </OverlayTrigger>
                 Galway, Ireland.
          </div>
              
        </div> */}
          <div  className="top-posts-profile-container">
            <h5  className="-feed-item-header">TOP POSTS</h5>
            {this.state.posts.slice(0,10).reverse().map(post=>  (
              <div key={this.state.user._id}>  
               <Card className='userPosts'>
                  <Card.Body>          
                    <Card.Text className="fontPost">
                    <a href={"/p/?id=" + post.Post_id}>
                      <p>
                        <span className="forum-title">{post.title}</span><br/>
                        <span className="content-muted">{post.post.slice(0,100)}...</span><br/>
                        {post.society == null ? (
                            <span  className="content-muted">Posted in<b> General</b><br/></span>
                        ) : (
                          <span  className="content-muted"><b>{post.society}</b><br/></span>
                        )}
                        <small className="text-muted">{moment(post.time).format(" MMM Do 'YY.")}</small><hr/>
                      </p>
                    </a>
                    </Card.Text>        
                  </Card.Body>  
                  <h1></h1>                
                </Card>
              </div>
            ))} 
          </div>

          <div  className="top-posts-profile-container">
            <h5>Badges</h5>
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
                
              </section>
          </div>
               
        </div>
      </>
    );
  }
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