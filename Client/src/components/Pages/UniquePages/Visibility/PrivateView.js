import React from 'react';
import '../../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import {Image, Card, OverlayTrigger,Tooltip,Modal, Form} from 'react-bootstrap'
import ProfilePic from '../../../../images/blogging.jpg'
import axios from 'axios';
import {Helmet} from 'react-helmet';
import moment from 'moment'
import { RiCake2Fill } from 'react-icons/ri'
import {RiAddFill} from 'react-icons/ri'
import {FaFacebook,FaTwitter,FaInstagram,FaLink,FaRegImage,FaRegCommentAlt} from 'react-icons/fa'
import { TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {Navbar, Nav} from 'react-bootstrap'
import {BsGear,BsBell,BsBookmarks,BsPeople,BsReplyAll} from 'react-icons/bs'

export default class PrivateView extends React.Component {

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
      isLoading:true,
    };
   
  }
 
  async componentDidMount() {
    var society_id = new URLSearchParams(document.location.search).get("id");

     await axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
        .then((response) => {
          this.setState({ society: response.data.society,
           users:response.data.society.users,
           mods:response.data.society.mods,
           admin:response.data.society.admin,
           isLoading:false})
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
          showStats: false
          
        });   
        }

        
      ShowFeed() {
        this.setState({
          showPeople: false,
          showFeed: true,
          showEvents: false,
          showQuestions: false,
          showStats: false,
        });   
        }

      ShowEvents() {
        this.setState({
          showPeople: false,
          showFeed: false,
          showEvents: true,
          showQuestions: false,
          showStats: false,
        });   
      }


        
      ShowStats() {
        this.setState({
          showPeople: false,
          showFeed: false,
          showEvents: false,
          showQuestions: false,
          showStats: true,
        });   
        }

        
      ShowQuestions() {
        this.setState({
          showPeople: false,
          showFeed: false,
          showEvents: false,
          showQuestions: true,
          showStats: false,
        });   
        }     
      
    render(){
      var title = this.state.society.name + " - Website"
      var{users} = this.state;
      var { events } = this.state;

      let i, k = 0;
     
      var user = JSON.parse(localStorage.getItem('user'));

    return(
        <div>
          <Navbar  className="navbar-comm" >
              <Nav className="mr-auto">
                  <Navbar.Brand className="header-landing">
                    <span><Image src={ProfilePic} className="user-image" roundedCircle /></span>
                    <span  className="navbar-title">{this.state.society.name}<br/>
                    <p className="content-muted">z/{this.state.society.name}</p></span>
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
                    <a href="/me"><Avatar src={user.pic} className="profile-btn-wrapper-left"  onClick={this.showProfile} roundedCircle/></a>
                  </div>
                </div>               
              </Navbar.Collapse>
          </Navbar>

            <div className="community-nav">
                <span><button className="join-comm-button" onClick={() => this.addUser(this.state.society.name)}>Join <small></small></button></span>
                <span className="comm-nav-item" onClick={() => {this.ShowUsers()}}>About Us</span>

                <span className="comm-nav-item" onClick={() => {this.ShowUsers()}}>{this.state.users.length} Members</span>
                <span className="comm-nav-item" onClick={() => {this.ShowStats()}}>Stats</span>
              </div>

              <div className="containerPostLeft">
                  <div className="community-sticky">
                    <span className="text-muted">ABOUT US</span>
                    <p  className="community-title">{this.state.society.name}</p>
                    <p className="text-muted">{this.state.society.description}</p>
                    <p className="text-muted"><RiCake2Fill /> Created on <b >{moment(this.state.society.time).format("MMM Do, YYYY.")}</b></p>
                    <div className="social-icons">
                      <big><a href={this.state.society.facebook} target="_blank"><FaFacebook size={20}/> </a></big>
                      <big><a href={this.state.society.twitter} target="_blank"><FaTwitter size={20}/> </a></big>
                      <big><a href={this.state.society.instagram} target="_blank"><FaInstagram size={20}/> </a></big>
                      <big><a href={this.state.society.facebook} target="_blank"><FaLink size={20}/> </a></big>
                    </div>
                    

                  </div>
                </div>

              <div className="containerPostMiddleCommunity">

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
                                {/* <a href={"/u/?id="+mod._id}><Image src={mod.pic} className="community-member-item-pic" roundedCircle /></a>  */}
                              </OverlayTrigger>
                            </div>
                          ))}
                        </div><br/>

                        <div>
                          {this.state.users.map(user=>(
                            <div>
                              <p>
                                <span>
                                  {/* <Avatar src={user.pic} roundedCircle /><h3>{user.fullname}</h3> */}
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
        </div>



        )
      }
}

