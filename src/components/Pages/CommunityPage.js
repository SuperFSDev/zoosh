import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import {Image} from 'react-bootstrap'
import ProfilePic from '../../images/blogging.jpg'
import axios from 'axios';
import {Helmet} from 'react-helmet'

export default class CommunityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
      users:[],
      UserList:[]
    };
  }

  async componentDidMount() {
      var society_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#f0f2f5";


     await axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
        .then((response) => {
          this.setState({ society: response.data.society,
           users:response.data.society.users})
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

    render(){
     
      var user = JSON.parse(localStorage.getItem('user'));
      if(this.state.society.admin === user._id){


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
                      <button className="community-btn">Feed</button>
                      <button className="community-btn">Questions</button>
                      <button className="community-btn">People</button>
                      <button className="community-btn">Stats</button>
                  </div>               
                </div>
                <br/>
              </div>
  
              <div className="containerFeedMiddleCommunity">

              <div className="community-users-card">
                <p className="member-count">Admins: {this.state.society.admin}</p>
                <p className="member-count">Moderators:  </p>
                <p className="member-count">Meet the community:  {this.state.users.length}</p>
              </div>

              <br/>
              
              <div className="community-users-card">
                <p className="member-count">Upcoming Events</p>  
              </div>

            </div>
          </div>
          );
      }

      else{

      return (
        <div>
          
            <div className="containerFeedLeftCommunity">
              <div className="community-card">
                <Image src={ProfilePic} className="user-image" roundedCircle />
                <h3>{this.state.society.name}</h3>
                <p className="community-copy-link">z/{this.state.society._id}</p>
                <p>{this.state.society.description}</p>
                <button className="community-button-join" onClick={() => this.addUser(this.state.society.name)}>Join</button>
                <hr/>
                  <div>
                      <a href={"/s/?id=" +this.state.society._id +"/feed"}><button className="community-btn">Feed</button></a>
                      <a href={"/s/?id=" +this.state.society._id +"/questions"}><button className="community-btn">Questions</button></a>
                      <a href={"/s/?id=" +this.state.society._id +"/people"}><button className="community-btn">People</button></a>
                      <a href={"/s/?id=" +this.state.society._id +"/stats"}><button className="community-btn">Stats</button></a>
                  </div>
                
              </div>
              <br/>
              <div className="community-card">
                Community Stats
              </div><br/>
              <div className="community-card">
                Community Posts
              </div>
            </div>

            <div className="containerFeedMiddleCommunity">
              <div className="community-users-card">
                <p className="member-count">Admins: {this.state.society.admin}</p>
                <p className="member-count">Moderators:  </p>
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
}