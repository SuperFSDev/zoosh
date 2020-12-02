import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import {Image,Button} from 'react-bootstrap'
import ProfilePic from '../../images/blogging.jpg'
import axios from 'axios';
import {Helmet} from 'react-helmet'

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
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
            UserList: this.state.UserList.concat(response.data.user)
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
                  <div>                
                 <Image src={user.pic} roundedCircle /> 
                  <h3>{user.fullname}  </h3>
                  <Button onClick={() => {this.onDeleteUser(this.state.society._id,user._id)}}>Delete User</Button><br></br>
                  <Button onClick={() => {this.onMakeMod(this.state.society._id,user._id)}}>Make a Moderator</Button>                          
                  </div>
                   ))}
                  </div>


                <div className="peopleTab">   {/* SHOW STATS*/}
                {this.state.showStats &&           
                <div>                            
                <h3>Score:{this.state.society.score}</h3>
                <h3>Users:{this.state.users.length}</h3>
                <h3>Mods:{this.state.mods.length}</h3>                           
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
