import React from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import {Image, Card, Form, Tooltip, OverlayTrigger} from 'react-bootstrap'
import ProfilePic from '../../../images/blogging.jpg'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import moment from 'moment'
import { RiCake2Fill } from 'react-icons/ri'
import {Modal} from 'react-bootstrap'
import Event from '../../Common/StartEvent'
import {RiAddFill} from 'react-icons/ri'
import {FaFacebook,FaTwitter,FaInstagram,FaLink} from 'react-icons/fa'
import { TextField } from '@material-ui/core';
import {BsReply} from 'react-icons/bs'
import {Navbar, Nav} from 'react-bootstrap'
import {BsGear,BsBell,BsBookmarks,BsPeople,BsReplyAll} from 'react-icons/bs'
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

      axios.get('http://localhost:4000/users/get-user-details', {
          params: {
              id: user._id
          }
      })
          .then((response) => {
              this.setState({ user: response.data.user,
                following: response.data.user.following,
                followers: response.data.user.followers,

              })
          })
          .catch((error) => {
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
           mods:response.data.society.mods})
        })
        .catch((error) => {
          console.log(error);
        });
        
        for (var i = 0; i < this.state.users.length; i++) {
          this.GetFollowedUser(this.state.users[i]._id)
        } 

        axios.get('http://localhost:4000/events/getEvents')
        .then((response) => {
          this.setState({ events: response.data.events })
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
      
        return (
          <div>
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
                        <span><Image src={this.state.society.pic} className="user-image" roundedCircle /></span>
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
                    <big><a href={this.state.society.facebook} target="_blank" className="icon-link"><FaFacebook size={20}/> </a></big>
                    <big><a href={this.state.society.twitter} target="_blank" className="icon-link"><FaTwitter size={20}/> </a></big>
                    <big><a href={this.state.society.instagram} target="_blank" className="icon-link"><FaInstagram size={20}/> </a></big>
                    <big><a href={this.state.society.facebook} target="_blank" className="icon-link"><FaLink size={20}/> </a></big>
                  </div>

                </div>
              </div>

              <div className="containerPostMiddleCommunity">
              {this.state.showFeed &&
                <div>
                    <br/>
                    <div className="community-container">
                      <h1>Hello World</h1>
                      <p>Hello test content</p>
                      <hr/>
                    </div>
                    <div className="community-container">
                      <h1>Hello World</h1>
                      <p>Hello test content</p>
                      <hr/>
                    </div>
                    <div className="community-container">
                      <h1>Hello World</h1>
                      <p>Hello test content</p>
                      <hr/>
                    </div>
                    <div className="community-container">
                      <h1>Hello World</h1>
                      <p>Hello test content</p>
                      <hr/>
                    </div>
                    <div className="community-container">
                      <h1>Hello World</h1>
                      <p>Hello test content</p>
                      <hr/>
                    </div><div className="community-container">
                      <h1>Hello World</h1>
                      <p>Hello test content</p>
                      <hr/>
                    </div><div className="community-container">
                      <h1>Hello World</h1>
                      <p>Hello test content</p>
                      <hr/>
                    </div>
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

              {/* <header>
                <section>
                  <nav className="nav">
                  </nav>
                  
                  <article>
                    <h1>{this.state.society.name}</h1>
                    <p className="member-count">{this.state.society.description}</p>
                    <p><RiCake2Fill /> Created on <b >{moment(this.state.society.time).format("MMM Do, YYYY.")}</b></p>
                    <button className="admin-comm-button"  onClick={() => {this.ShowSettings()}}>Settings</button>
                    <button className="admin-comm-button"  onClick={() => {this.ShowSettings()}}><BsReply size={20}/>   Invite</button>

                  </article>
                </section>
              </header> */}
          
     
              {/* <div className="containerFeedLeftCommunity">
                <div className="communityFilter">
                      <button  onClick={() => {this.ShowFeed()}} className="community-btn">Feed</button>
                      <button  onClick={() => {this.ShowQuestions()}} className="community-btn">Questions</button>
                      <button  onClick={() => {this.ShowEvents()}} className="community-btn">Events</button>
                      <button  onClick={() => {this.ShowStats()}}className="community-btn">Stats</button>
                      <button  onClick={() => {this.ShowUsers()}}className="community-btn">People</button>
                      <button  onClick={() => {this.ShowSocials()}}className="community-btn">Socials</button>
                      <button  onClick={() => {this.ShowSettings()}}className="community-btn">Settings</button>

                </div>


                {this.state.showFeed &&

                <div>
                  <div className="community-card">
                    <div className="peopleTab">           
                          <a href="/new" className="quick-options-a"><div>
                            <p><b>Post Something</b></p>
                            <hr/>
                              <input
                              className="quick-options-input"
                              placeholder="What's on your mind?"
                              />
                          </div> </a>
                        </div>         
                    </div>
                    <br/>
                    <div className="community-card">
                      <h1>Hello</h1>
                    </div>
                </div>
                }


                {this.state.showSettings &&

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
                }


                {this.state.showPeople && <div className="community-card">
                  <div className="peopleTab">    
                       
                      <div>
                      <h1><b className="user-admin">Admins {this.state.society.admin}</b></h1>
                        <div className="CommunityMembers">
                          <div className="community-members-item">
                          </div>
                      </div><br/>

                      <h1><b className="user-mod">Moderators {this.state.mods.length}</b></h1>
                      <div className="CommunityMembers">
                        {this.state.mods.map(mod=>(
                          <div className="community-members-item">
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{this.state.mod.fullname}</Tooltip>}>
                              <a href={"/u/?id="+mod._id}><Image src={mod.pic} className="community-member-item-pic" roundedCircle /></a> 
                            </OverlayTrigger>
                          </div>
                        ))}
                      </div><br/>

                      <h1><b className="user-member">Members {this.state.users.length}</b></h1>
                      <div className="CommunityMembers">
                        {this.state.users.map(user=>(
                          <div className="community-members-item">
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{this.state.user.fullname}</Tooltip>}>
                              <a href={"/u/?id="+user._id}><Image src={user.pic} className="community-member-item-pic" roundedCircle /> </a>
                            </OverlayTrigger>
                          </div>
                        ))}
                      </div>
                      </div>
                      
                    </div>
                </div>}


                {this.state.showEvents &&<div className="community-card">
                  <div className="peopleTab">   
                   
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
                    
                  </div>
                </div>}


                {this.state.showSocials && <div className="community-card">
                  <div className="peopleTab">  
                              
                    <div> 
                          <big><FaFacebook size={30}/> <a href={this.state.society.facebook} target="_blank"><TextField defaultValue={this.state.society.facebook} InputProps={{readOnly: true,}} variant="outlined"/></a></big><br/><br/>
                          <big><FaTwitter size={30}/> <a href={this.state.society.twitter} target="_blank"><TextField defaultValue={this.state.society.twitter} InputProps={{readOnly: true,}} variant="outlined"/></a></big><br/><br/>
                          <big><FaInstagram size={30}/> <a href={this.state.society.instagram} target="_blank"><TextField defaultValue={this.state.society.instagram} InputProps={{readOnly: true,}} variant="outlined"/></a></big><br/><br/>
                          <big><FaLink size={30}/> <a href={this.state.society.facebook} target="_blank"><TextField defaultValue={this.state.society.other} InputProps={{readOnly: true,}} variant="outlined"/></a></big><br/><br/>
                      </div>
                      
                    </div>    
                </div>}



                {this.state.showQuestions &&
                  <div>
                  <div className="community-card">
                    <div className="peopleTab">           
                          <a href="/new" className="quick-options-a"><div>
                            <p><b>Ask a Question</b></p>
                            <hr/>
                              <input
                              className="quick-options-input"
                              placeholder="Need Help?"
                              />
                          </div> </a>
                        </div>         
                    </div>
                    <br/>
                    <div className="community-card">
                      <h1>Question</h1>
                    </div>
                </div>
                }

                {this.state.showStats &&<div className="community-card">
                  <div className="peopleTab"> 
                            
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
                  </div>}

                
            </div> */}

             
            {/* <div className="containerFeedMiddleCommunity">
                <div className="community-users-card">
                <h1><b className="user-admin">You're an Admin.</b></h1>
                  <p className="member-count">Meet the community: {this.state.users.length}</p>
                    <div className="Connections">
                    {this.state.UserList.map(u => ( 
                      <div key={u._id} >
                        {console.log(u)}
                          <Image src={u.pic} className="user-image-mini" roundedCircle />
                      </div>
                    ))} 
                </div>
              </div>
                <br/>
              <div className="community-users-card">
                  <p className="member-count">Leaderboard</p>
                  <div className="container-individual-community">
                          {users.sort((a,b)=> b.score- a.score).map(user=>  ( 
                            <div>
                              <p className="leaderboard-item"><b>{k+=1}</b><a className="soc-leaderboard-name-item" href={"/u/?id="+user._id}>{user.fullname}</a> <b className="soc-leaderboard-score-item">{ user.score}</b></p><hr/>      
                            </div>
                          ))}    
                          <a href="#">See More</a>
                    </div>         
              </div>
            </div> */}
        </div>
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