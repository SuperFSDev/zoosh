import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import {Image, Card, OverlayTrigger,Tooltip,Modal, Form} from 'react-bootstrap'
import ProfilePic from '../../images/blogging.jpg'
import axios from 'axios';
import {Helmet} from 'react-helmet';
import AdminPage from './AdminPage';
import moment from 'moment'
import { RiCake2Fill } from 'react-icons/ri'
import {BiUpvote,BiDownvote} from 'react-icons/bi'
import Event from '../Common/StartEvent'
import {RiAddFill} from 'react-icons/ri'
import {FaFingerprint,FaFacebook,FaTwitter,FaInstagram,FaLink,FaRegImage,FaRegCommentAlt} from 'react-icons/fa'
import { TextField } from '@material-ui/core';

export default class CommunityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
      users:[],
      time:'',
      score:'',
      UserList:[],
      showPeople:false,
      showStats:false,
      showEvents:false,
      showQuestions:false,
      showFeed:true,
      showSocials: false,

    };
   
  }
 
  async componentDidMount() {
      var society_id  = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#f0f2f5";


     await axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
        .then((response) => {
          this.setState({ society: response.data.society,
           users:response.data.society.users,
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
          })
  
        })
        .catch((error) => {
          console.log(error);
        });
      }

      ShowUsers() {
        this.setState({
          showPeople: true,
          showFeed: false,
          showEvents: false,
          showQuestions: false,
          showSocials: false,
          showStats: false
          
        });   
        }

        
      ShowFeed() {
        this.setState({
          showPeople: false,
          showFeed: true,
          showEvents: false,
          showQuestions: false,
          showSocials: false,
          showStats: false,
        });   
        }

      ShowEvents() {
        this.setState({
          showPeople: false,
          showFeed: false,
          showEvents: true,
          showQuestions: false,
          showSocials: false,
          showStats: false,
        });   
      }


        
      ShowStats() {
        this.setState({
          showPeople: false,
          showFeed: false,
          showEvents: false,
          showQuestions: false,
          showSocials: false,
          showStats: true,
        });   
        }

        
      ShowQuestions() {
        this.setState({
          showPeople: false,
          showFeed: false,
          showEvents: false,
          showQuestions: true,
          showSocials: false,
          showStats: false,
        });   
        }

      ShowSocials() {  
        this.setState({
            showPeople: false,
            showFeed: false,
            showEvents: false,
            showQuestions: false,
            showStats: false,
            showSocials: true,
          });   
          }


    
       
          
      
    render(){
      var title = this.state.society.name + " - Website"
      var{users} = this.state;
      var { events } = this.state;

      let i = 0;
     
      var user = JSON.parse(localStorage.getItem('user'));
      if(this.state.society.admin === user._id){


        return (
          <div>

              <AdminPage/>
          </div>
         
          );
      }

      else{

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
          
            <div className="containerFeedLeftCommunity">
              <div className="community-card">
                <Image src={ProfilePic} className="user-image" roundedCircle />
                <h3>{this.state.society.name}</h3>
                
                {/* <p className="community-copy-link">z/{this.state.society._id}</p> */}
                <p><RiCake2Fill /> Created on <b >{moment(this.state.society.time).format("MMM Do, YYYY.")}</b></p>


                <button className="standard-button" onClick={() => this.addUser(this.state.society.name)}>Join</button>
                <hr/>
                  <div>
                      <button  onClick={() => {this.ShowFeed()}} className="community-btn">Feed</button>
                      <button  onClick={() => {this.ShowQuestions()}} className="community-btn">Questions</button>
                      <button  onClick={() => {this.ShowEvents()}} className="community-btn">Events</button>
                      <button  onClick={() => {this.ShowStats()}}className="community-btn">Stats</button>
                      <button  onClick={() => {this.ShowUsers()}}className="community-btn">People</button>
                      <button  onClick={() => {this.ShowSocials()}}className="community-btn">Socials</button>
                  </div>
                <hr/>

                  <div className="peopleTab">   {/* SHOW FEED*/}
                  {this.state.showFeed &&           
                    <div> 
                        <hr/>  
                          <Form>
                            <input            
                              className="commentBox"
                              label="Comment"
                              style={{ margin: 1, fontSize: 20, maxLength:150, paddingBottom:10}}         
                              placeholder="Compose new post..."         
                              required
                            /><br/><br/>

                            <span> 
                              <FaRegCommentAlt size={40}  className="square" id="dropdown-basic"/>
                              <FaRegImage size={40}  className="square" id="dropdown-basic"/>   
                              <FaLink size={40}  className="square" id="dropdown-basic"/>                             
                            </span><br/><br/>
                          </Form> 
                        <hr/> 
                          <button className="standard-button">Post Comment</button>  
                    </div>
                    }
                  </div>                

              
                  <div className="peopleTab">     {/* SHOW PEOPLE*/}
                    {this.state.showPeople &&  
                    <div>
                      <h4>Admins {this.state.users.length}</h4><br/>
                      <div className="CommunityMembers">
                      {this.state.users.map(user=>(
                        <a href={"/u/?id="+user._id}><div className="community-members-item">
                          <Image src={user.pic} className="community-member-item-pic" roundedCircle /> 
                          <p>{user.fullname} <FaFingerprint/> </p>
                          {/* <b className="user-score-post">{user.score}</b> */}
                          <button className="btn-leaderboard">Follow</button><br/>
                          {/* <button className="standard-button" onClick={() => {this.onMakeMod(this.state.society._id,user._id)}}>Promote</button>                           */}
                        </div></a>
                      ))}
                    </div><br/>

                    {/* MODERATORS TAB */}
                    <h4>Moderators {this.state.users.length}</h4><br/>
                    <div className="CommunityMembers">
                      {this.state.users.map(user=>(
                        <a href={"/u/?id="+user._id}><div className="community-members-item">
                          <Image src={user.pic} className="community-member-item-pic" roundedCircle /> 
                          <p>{user.fullname} </p>
                          {/* <b className="user-score-post">{user.score}</b> */}
                          <button className="btn-leaderboard">Follow</button><br/>
                          {/* <button className="standard-button" onClick={() => {this.onMakeMod(this.state.society._id,user._id)}}>Promote</button>                           */}
                        </div></a>
                      ))}
                    </div><br/>

                    {/* MEMBERS TAB */}
                    <h4>Members {this.state.users.length} </h4><br/>
                    <div className="CommunityMembers">
                      {this.state.users.map(user=>(
                        <a href={"/u/?id="+user._id}><div className="community-members-item">
                          <Image src={user.pic} className="community-member-item-pic" roundedCircle /> 
                          <p>{user.fullname} </p>
                          {/* <b className="user-score-post">{user.score}</b> */}
                          <button className="btn-leaderboard">Follow</button><br/>
                          {/* <button className="standard-button" onClick={() => {this.onMakeMod(this.state.society._id,user._id)}}>Promote</button>                           */}
                        </div></a>
                      ))}
                    </div>
                    </div>
                    }
                  </div>

                <div className="peopleTab">   {/* SHOW STATS*/}
                  {this.state.showStats &&           
                  <div> 
                          {users.sort((a,b)=> b.score- a.score).map(user=>  ( 
                            <div>
                              <p className="leaderboard-item"><b>{i+=1}</b><a className="soc-leaderboard-name-item" href={"/u/?id="+user._id}>{user.fullname}</a> <b className="soc-leaderboard-score-item">{ user.score}</b></p><hr/>      
                            </div>
                          ))}    
                          <a href="#">See More</a>
                    </div>
                    }
                  </div>

                  <div className="peopleTab">   {/* SHOW SOCIALS*/}
                  {this.state.showSocials &&           
                  <div> 
                        <big><FaFacebook size={30}/> <a href={this.state.society.facebook} target="_blank"><TextField defaultValue={this.state.society.facebook} InputProps={{readOnly: true,}} variant="outlined"/></a></big><br/><br/>
                        <big><FaTwitter size={30}/> <a href={this.state.society.twitter} target="_blank"><TextField defaultValue={this.state.society.twitter} InputProps={{readOnly: true,}} variant="outlined"/></a></big><br/><br/>
                        <big><FaInstagram size={30}/> <a href={this.state.society.instagram} target="_blank"><TextField defaultValue={this.state.society.instagram} InputProps={{readOnly: true,}} variant="outlined"/></a></big><br/><br/>
                        <big><FaLink size={30}/></big> <a href={this.state.society.other} target="_blank"><TextField defaultValue={this.state.society.other} InputProps={{readOnly: true,}} variant="outlined"/></a><br/><br/>
                    </div>
                    }
                  </div>    

                <div className="peopleTab">     {/* SHOW QUESTIONS*/}
                  {this.state.showQuestions &&
                  <div>
                    <h3>Questions</h3>
                    <Question/>
                    <Card>
                      <Card.Body>
                        <Card.Text className="fontPost">
                          <p>Random hard coded question???? :-ppp</p>
                          {/* <Badge className="forum-badge-item"  pill variant="secondary">Question</Badge> */}
                        </Card.Text>
                        <div>
                          <div>
                            <span className="voting-btn"><button className="standard-option-btn-post"> Answer Question</button></span>
                            <span className="voting-btn"><button className="standard-option-btn-post"> Report Abuse</button></span>

                            <span className="voting-btn"><button className="standard-option-btn-post"><BiUpvote size={22} /> Upvote</button></span>
                            <span className="voting-btn"><button className="standard-option-btn-post"><BiDownvote size={22} /> Downvote</button></span>
                          </div>
                        </div>
                      </Card.Body>
                      </Card>
                      <Card>
                      <Card.Body>
                        <Card.Text className="fontPost">
                          <p>Random hard coded question???? :-ppp</p>
                          {/* <Badge className="forum-badge-item"  pill variant="secondary">Question</Badge> */}
                        </Card.Text>
                        <div>
                          <div>
                            <span className="voting-btn"><button className="standard-option-btn-post"> Answer Question</button></span>
                            <span className="voting-btn"><button className="standard-option-btn-post"> Report Abuse</button></span>

                            <span className="voting-btn"><button className="standard-option-btn-post"><BiUpvote size={22} /> Upvote</button></span>
                            <span className="voting-btn"><button className="standard-option-btn-post"><BiDownvote size={22} /> Downvote</button></span>
                          </div>
                        </div>
                      </Card.Body>
                      </Card>
                  </div>
                  }
                </div>      

             
                
                <div className="peopleTab">     {/* SHOW EVENTS*/}
                    {this.state.showEvents &&
                    <div>
                      <h3>Upcoming Events</h3>
                      <QuickEvent/>
                      <div className="EventSocietyLayout">
                        {events.reverse().map(event => (
                        <div key={event._id}>
                            <div>
                            <a href={"/e/?id=" + event._id} className="-soc-l-navigation">
                              <div className="events-card">
                                  <h4><b>{event.title}</b></h4> 
                                  <p>{event.society}</p> 
                                  {/* <p>{event.time}</p> */}
                                  <big className="text-muted"><b></b>{moment(event.time).format("H:mma - MMM Do, YYYY.")}</big>

                                  <div >
                                  </div>
                              </div>
                              </a>
                            </div>
                        </div>
                        ))}
                      </div>
                    </div>
                    }
                  </div>                
              </div>
              <br/>

            </div>

            <div className="containerFeedMiddleCommunity">
              <div className="community-users-card">
                <p className="member-count">{this.state.society.description}</p>
              </div><br/>
                <div className="community-users-card">
                  <p className="member-count">Members: {this.state.users.length}</p>
                    <div className="Connections">
                    {this.state.UserList.map(u => ( 
                      <div key={u._id} >
                        {console.log(u)}
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{u.fullname}</Tooltip>}>
                              <span className="d-inline-block">
                              <Image src={u.pic} className="user-image-mini" roundedCircle />
                              </span>
                        </OverlayTrigger> 
                        </div>                
                      ))} 
                      </div>
                    </div>
                <br/>
            </div>
        </div>
        );
    } 
}
}

//  FUNCTIONS TO OPEN EVENT MODAL
function QuickEvent() {
  const [modalShow, setModalShowEvent] = React.useState(false);

  return (
    <div>
            <button className="standard-button"  onClick={() => setModalShowEvent(true)}>Create Event <RiAddFill size={25}/></button><br/><br/>

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
            <button className="standard-button"  onClick={() => setModalShowQuestion(true)}>Ask a Question</button><br/><br/>

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
