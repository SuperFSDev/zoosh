import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import {Image,Button} from 'react-bootstrap'
import ProfilePic from '../../images/blogging.jpg'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import moment from 'moment'
import { RiCake2Fill } from 'react-icons/ri'

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
      score: [],
      users:[],
      UserList:[],
      mods:[],
      showPeople:false,
      showStats:false,
      showQuestions:false,
      showFeed:false
    };
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.onMakeMod = this.onMakeMod.bind(this);
  }

  async componentDidMount() {
    
      var society_id = new URLSearchParams(document.location.search).get("id");
      document.body.style.backgroundColor = "#f0f2f5";

      
     await axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
        .then((response) => {
          this.setState({ society: response.data.society,
           users:response.data.society.users,
           score: response.data.society.score,  

           mods:response.data.society.mods})
        })
        .catch((error) => {
          console.log(error);
        });
        
        for (var i = 0; i < this.state.users.length; i++) {
          this.GetFollowedUser(this.state.users[i]._id)
        } 
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


    onDeleteUser(Soc_id,user_id) {

        const deletedUser = {
          id: Soc_id,
          _id:user_id       
      }
    alert("Removed user "+user_id)
        axios.post('http://localhost:4000/societies/deleteUser',deletedUser)
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
            showQuestions: false,
            showStats: false
            
          });   
          }

          
        ShowFeed() {
          this.setState({
            showPeople: false,
            showFeed: true,
            showQuestions: false,
            showStats: false,
          });   
          }


          
        ShowStats() {
          this.setState({
            showPeople: false,
            showFeed: false,
            showQuestions: false,
            showStats: true,
          });   
          }

          
        ShowQuestions() {
          this.setState({
            showPeople: false,
            showFeed: false,
            showQuestions: true,
            showStats: false,
          });   
          }
             
    render(){
      var{users} = this.state;
      let i = 0;
        return (
          <div>
            {/* REACTJS HELMET */}
            <Helmet>
                      <meta charSet="utf-8" />
                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                      <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                      <title>Community</title>

                      {/* LINKS */}
                      
                      <link rel="canonical" href="http://mysite.com/example" />
                      <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                      <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
              </Helmet>
     
              <div className="containerFeedLeftCommunity">
                <div className="community-card">
                  <h1><b className="user-score">Welcome, Admin!</b></h1>
                  <Image src={ProfilePic} className="user-image" roundedCircle />
                  <h3>{this.state.society.name}</h3>
                  {/* <p className="community-copy-link">z/{this.state.society._id}</p> */}
                  <p>{this.state.society.description}</p>   
                  <p><RiCake2Fill /> Created on <b >{moment(this.state.society.time).format("MMM Do, YYYY.")}</b></p>

                  <hr/>
                  {/* Community Feed Display Options */}
                  <div>
                      <button  onClick={() => {this.ShowFeed()}} className="community-btn">Feed</button>
                      <button  onClick={() => {this.ShowQuestions()}} className="community-btn">Questions</button>
                      <button  onClick={() => {this.ShowStats()}}className="community-btn">Stats</button>
                      <button  onClick={() => {this.ShowUsers()}}className="community-btn">People</button>


                  <div className="peopleTab">     {/* SHOW PEOPLE*/}
                  {this.state.showPeople &&  
                  this.state.users.map(user=>(
                  <div className="community-members-item">                
                      <Image src={user.pic} className="community-member-item-pic"  /> 
                      <p>{user.fullname} <b className="user-score-post">{user.score}</b> </p>

                      <button className="standard-button-remove" onClick={() => {this.onDeleteUser(this.state.society._id,user._id)}}>Remove</button><br/>
                      <button className="standard-button" onClick={() => {this.onMakeMod(this.state.society._id,user._id)}}>Promote</button>                          
                  </div>
                   ))}
                  </div>


                <div className="peopleTab">   {/* SHOW STATS*/}
                {this.state.showStats &&           
                <div>                            
                <div className="container-individual-community">
                  {/* <h1 className="c-s-header" id="users">ON FIRE USERS <span role="img" aria-label="fire">🔥</span></h1><br/> */}
                    <div className="">
                      {users.sort((a,b)=> b.score- a.score).map(user=>  ( 
                        <div>
                          <p className="leaderboard-item"><b>{i+=1}</b><a className="soc-leaderboard-name-item" href={"/u/?id="+user._id}>{user.fullname}</a> <b className="soc-leaderboard-score-item">{ user.score}</b></p><hr/>      
                        </div>
                      ))}    
                      <a href="#">See More</a>
                    </div>
                    <div id="top-comm"></div>
                </div>                         
                </div>
                }



                    </div>            
                  </div>               
                </div>
                <br/>
              </div>
              <div className="containerFeedMiddleCommunity">
              <div className="community-users-card">
                <p className="member-count">Admins: {this.state.society.admin}</p>
                <p className="member-count">Moderators: {this.state.mods.length}  </p>
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
                  <p className="member-count">Upcoming Events {this.state.society.admin}</p>
                    
                </div>
            </div>
        </div>
        );
    } 
}
