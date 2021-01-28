import React, {Fragment} from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import {Image, Form, Tooltip, OverlayTrigger} from 'react-bootstrap'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import moment from 'moment'
import { RiCake2Fill } from 'react-icons/ri'
import {Modal} from 'react-bootstrap'
import Event from '../../Common/StartEvent'
import {RiAddFill} from 'react-icons/ri'
import {FaFacebook,FaTwitter,FaInstagram,FaLink} from 'react-icons/fa'
import {Navbar, Nav} from 'react-bootstrap'
import {BsChat,BsHouseFill} from 'react-icons/bs';
import Avatar from '@material-ui/core/Avatar';

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
      score: [],
      users:[],
      UserList:[],
      mods:[],
      posts:[],
      pic:'',
      events: [],
      showPeople:false,
      showStats:false,
      showEvents:false,
      showQuestions:false,
      showFeed:true,
      showSettings:false,
      isLoading:true,
      id: '',
      user: '',
      following:[],
      followers:[],
    };
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.onMakeMod = this.onMakeMod.bind(this);
  }

  async componentDidMount() {
    
      var society_id = new URLSearchParams(document.location.search).get("id");
      document.body.style.backgroundColor = "white";

      var user = JSON.parse(localStorage.getItem('user'));
      this.setState({ id: user._id });

      axios.get('http://localhost:4000/users/getUsers')
      .then((response)=>{
          this.setState({users: response.data.users})
      })
      .catch((error)=>{
          console.log(error);
      });

      
     await axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
        .then((response) => {
          this.setState({ society: response.data.society,
           users:response.data.society.users,
           admin:response.data.society.admin,
           mods:response.data.society.mods,
           score: response.data.society.score,  
           isLoading:false,
           society: response.data.society,
           mods:response.data.society.mods
          })
        })
        .catch((error) => {
          console.log(error);
        });
        
        for (var i = 0; i < this.state.users.length; i++) {
          this.GetFollowedUser(this.state.users[i]._id)
        } 


        axios.get('http://localhost:4000/discussions/get-society-discussions',{
          params: {
            society: this.state.society.name
          }
        })
        .then((response) => {
          this.setState({posts: this.state.posts.concat(response.data.discussion),})
        })
        .catch((error) => {
          console.log(error);
        });


        axios.get('http://localhost:4000/events/get-society-events',{
          params: {
            society: this.state.society.name
          }
        })
        .then((response) => {
          this.setState({events: this.state.events.concat(response.data.event),})
        })
        .catch((error) => {
          console.log(error);
        });
    
    }

    // addUser(soc) {
    //   AddUserToSoc(soc);
    //   var user = JSON.parse(localStorage.getItem('user'));
    // }


     async  GetFollowedUser(user_id){
    await axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id:user_id
        }
      })
        .then((response) => {
          this.setState({
            UserList: this.state.UserList.concat(response.data.user),
            score: response.data.user.score,  

          })
  
        })
        .catch((error) => {
          console.log(error);
        });
      }
      


    onDeleteUser(Soc_id,user_id,SocName) {

        const deletedUser = {
          id: Soc_id,
          _id:user_id       
      }


      const deletedSoc = {
        _id:user_id,
        socName:SocName    
    }
    alert("Removed user "+user_id)
   
        axios.post('http://localhost:4000/societies/deleteUser',deletedUser)
        .then().catch();
        axios.post('http://localhost:4000/users/deleteSoc',deletedSoc)
        .then().catch();



        window.location = '/s/?id='+Soc_id;



        }


    onMakeMod(Soc_id,user_id) {

        const Moderator = {
        id: Soc_id,
        _id:user_id       
        }
        alert("Mod added "+user_id)
          axios.post('http://localhost:4000/societies/addMod',Moderator)
          .then().catch();
          window.location = '/s/?id='+Soc_id;
          }



        ShowUsers() {
          this.setState({
            showPeople: true,
            showFeed: false,
            showEvents: false,
            showQuestions: false,
            showStats: false,
            showSettings:false,

          });   
          }

          
        ShowFeed() {
          this.setState({
            showPeople: false,
            showFeed: true,
            showEvents: false,
            showQuestions: false,
            showStats: false,
            showSettings:false,

          });   
          }

        ShowEvents() {
          this.setState({
            showPeople: false,
            showFeed: false,
            showEvents: true,
            showQuestions: false,
            showStats: false,
            showSettings:false,

          });   
        }


          
        ShowStats() {
          this.setState({
            showPeople: false,
            showFeed: false,
            showEvents: false,
            showQuestions: false,
            showStats: true,
            showSettings:false,

          });   
          }

          
        ShowQuestions() {
          this.setState({
            showPeople: false,
            showFeed: false,
            showEvents: false,
            showQuestions: true,
            showStats: false,
            showSettings:false,

          });   
          }


        ShowSettings() {
          this.setState({
            showPeople: false,
            showFeed: false,
            showEvents: false,
            showQuestions: false,
            showStats: false,
            showSettings:true,

          });   
          }
             
    render(){
      var{users} = this.state;
      var { events } = this.state;
      var title = this.state.society.name + " - Website"
      let i, k = 0;

      const discussionList = this.state.posts.reverse().map(discussion => {
        return(
    
            <div key={discussion._id}>
              <div className='discussion-post' style={{marginLeft:150}}>
                <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect">
                  <p>
                    <a href={"/me"} className="post-link-a"><span className="voting-btn">
                      <b style={{color:'#0693e3'}}>{discussion.user}</b> posted <span style={{color:'gray'}}>({moment(discussion.time).startOf('seconds').fromNow()})</span>
    
                      {/* {discussion.society == null ? (
                          <span> posted in <b style={{color:'green'}}>General</b></span>
                      ) : (
                        <span> posted in <b style={{color:'green'}}>{discussion.society}</b></span>
                      )} */}
                    </span></a><br/>
                    <span className="forum-title">{discussion.title.slice(0,35)}</span>
                    {discussion.picture == null ? (
                      <div></div>
                    ) : (
                      <Image className="post-image" src={discussion.picture} width={150} height={125}/>
                    )}<br/>
                    {/* <Image className="post-image" src={Test} width={150}/><br/> */}
                    <span className="post-content" style={{marginLeft:10}}>{discussion.caption}</span>

                    <small  className="text-muted">
                      <br/>
                      <button className="standard-option-btn-post"><BsChat size={22} /> {discussion.comments.length}</button>
                    
                    </small>
                  </p>
                </a>
              </div>
            </div>
          )})
      
        return (
          <Fragment>
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

              <Navbar  className="navbar-comm" >
                  <Nav className="mr-auto">
                      <Navbar.Brand className="header-landing">
                        <span><Image src={this.state.society.picture} className="user-image" roundedCircle /></span>
                        <span  className="navbar-title">
                          {this.state.society.name}<br/>
                          <p className="content-muted">z/{this.state.society.name}</p>
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

              <div className="community-nav">
                <span><button className="admin-comm-button" onClick={() => {this.ShowSettings()}}>Community Settings <small></small></button></span>
                <span className="comm-nav-item" onClick={() => {this.ShowUsers()}}>{this.state.users.length} Members</span>
                <span className="comm-nav-item" onClick={() => {this.ShowFeed()}}>Feed</span>
                <span className="comm-nav-item" onClick={() => {this.ShowQuestions()}}>Questions</span>
                <span className="comm-nav-item" onClick={() => {this.ShowEvents()}}>Events</span>
                <span className="comm-nav-item" onClick={() => {this.ShowStats()}}>Stats</span>
              </div>

              <div className="containerPostLeft">
                <div className="community-sticky">
                  <span ><p className="user-admin">You're an Admin.</p></span>

                  <span className="text-muted">ABOUT US</span>
                  <p  className="community-title">{this.state.society.name}</p>
                  <p className="text-muted">{this.state.society.description}</p>
                  <p className="text-muted"><RiCake2Fill /> Created on <b >{moment(this.state.society.time).format("MMM Do, YYYY.")}</b></p>
                  <div className="social-icons">
                    <big><a href={this.state.society.facebook} target="_blank" rel="noopener noreferrer" className="icon-link"><FaFacebook size={20}/> </a></big>
                    <big><a href={this.state.society.twitter} target="_blank" rel="noopener noreferrer" className="icon-link"><FaTwitter size={20}/> </a></big>
                    <big><a href={this.state.society.instagram} target="_blank" rel="noopener noreferrer" className="icon-link"><FaInstagram size={20}/> </a></big>
                    <big><a href={this.state.society.facebook} target="_blank" rel="noopener noreferrer" className="icon-link"><FaLink size={20}/> </a></big>
                  </div>

                </div>
              </div>

              <div className="containerPostMiddleCommunity">
              {this.state.showFeed &&
                  <div>
                    {discussionList}
                  
                  </div>
              }

                {this.state.showEvents &&
                <div>
                    <br/>
                    <div className="community-container">
                    <div>
                      <h3>Upcoming Events</h3>
                      <QuickEvent/>
                      <div className="EventSocietyLayout">
                      {events.reverse().map(event => (
                      <div key={event._id}>
                          <div>
                          <a href={"/e/?id=" + event._id} className="-soc-l-navigation">
                            <div className="events-card-community">
                                <h4><b>{event.title}</b></h4> 
                                <p>{event.society}</p> 
                                <p>{event.time}</p>
                                <div >
                                </div>
                            </div>
                            </a>
                          </div>
                        </div>
                        ))}
                      </div>
                    </div>
                    
                      <hr/>
                    </div>

                </div>
                }


                {this.state.showSettings &&
                <div>
                    <br/>
                    <div className="community-container">
                    <div>
                  <div className="community-card">
                      <h5>Community Details</h5>
                      <label>Name</label><br/>
                      <input className="comm-settings-i" /><br/>
                      <label>Description</label><br/>
                      <input className="comm-settings-i"/><br/><br/>
                      <input className="standard-button" type="submit" value="Save Changes"/><br/>
                    </div>
                    <br/>
                    <div className="community-card">
                      <h5>Roles</h5>

                      <label><b>Moderators</b></label>
                      <Form>
                        <input type="checkbox" value="remove"/>
                        <label for="vehicle1">  Can remove members.</label><br/>
                        <input type="checkbox" value="promote"/>
                        <label for="vehicle2"> Can promote to moderator. </label><br/>
                        <input type="checkbox" value="delete" />
                        <label for="vehicle3"> Can delete posts, questions or events.</label><br/><br/>
                        <input className="standard-button" type="submit" value="Save Changes"/>
                      </Form>
                      <br/><br/>
                      <label><b>Members</b></label>
                      <Form>
                        <input type="checkbox" value="events"/>
                        <label for="vehicle1">  Can Create Events</label><br/>
                        <input className="standard-button" type="submit" value="Save Changes"/>
                      </Form>
                    </div>
                    <br/>
                    <div className="community-card">
                      <h5>Delete Community</h5>
                      <br/>
                      <button className="delete-community-button">Delete Community</button>
                    </div>
                </div>
                    </div>

                </div>
                }

                {this.state.showStats &&
                <div>
                    <br/>
                    <div className="community-container">
                    <div> 
                    <h3>Community Leaderboard</h3>                          
                    <div className="container-individual-community">
                        <div className="">
                          {users.sort((a,b)=> b.score- a.score).map(user=>  ( 
                            <div>
                              <p className="leaderboard-item"><b>{i+=1}</b><a className="soc-leaderboard-name-item" href={"/u/?id="+user._id}>{user.fullname}</a> <b className="soc-leaderboard-score-item">{ user.score}</b></p><hr/>      
                            </div>
                          ))}    
                          <a href="#">See More</a>
                        </div>
                      </div>                         
                    </div>
                    
                    </div>

                </div>
                }

              {this.state.showPeople &&
                <div>
                    <br/>
                    <div className="community-container">
                      <h1>Meet the Community ({this.state.users.length})</h1>
                      <hr/>
                      <div>
                      <h1><b className="user-admin">Admins {this.state.society.admin}</b></h1>
                        <div className="CommunityMembers">
                          <div className="community-members-item">
                          </div>
                      </div><br/>

                      <div className="CommunityMembers">
                        {this.state.mods.map(mod=>(
                          <div className="community-members-item">
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{this.state.mod.fullname}</Tooltip>}>
                              <a href={"/u/?id="+mod._id}><Image src={mod.pic} className="community-member-item-pic" roundedCircle /></a> 
                            </OverlayTrigger>
                          </div>
                        ))}
                      </div><br/>

                      <div>
                        {this.state.users.map(user=>(
                          <div>
                            <p>
                              <span>
                                <Avatar src={user.pic} roundedCircle /><h3>{user.fullname}</h3>
                              </span>
                              {user.bio}
                              <br/><hr/><br/>
                            </p>
                          </div>
                        ))}
                      </div>
                      </div>
                    </div>

                </div>
              }

              </div>
        </Fragment>
        );
    } 
}


//  FUNCTIONS TO OPEN EVENT MODAL
function QuickEvent() {
  const [modalShow, setModalShowEvent] = React.useState(false);

  return (
    <div>
            <button className="post-option-btn-item-event"  onClick={() => setModalShowEvent(true)}>Create Event <RiAddFill size={25}/></button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShowEvent(false)}
            />
    </div>
  );
}

function Question() {
  const [modalShowQuestion, setModalShowQuestion] = React.useState(false);

  return (
    <div>
            <button className="post-option-btn-item-event"  onClick={() => setModalShowQuestion(true)}>Ask a Question</button>

            <QuestionModal
                show={modalShowQuestion}
                onHide={() => setModalShowQuestion(false)}
            />
    </div>
  );
}

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
          <Modal.Body>
              <Event/>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }

  function QuestionModal(props) {
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
              <Event/>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
}
