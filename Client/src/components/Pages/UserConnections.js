import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'

export default class UserConnections extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          id: '',
          user: '',
          following: [],
          followers: [],
        };
      }

    componentDidMount() {
      document.body.style.backgroundColor = "#FDFEFE";

      var user = JSON.parse(localStorage.getItem('user'));

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
              badges:response.data.user.badges,
              

            })
          })
          .catch((error) => {
              console.log(error);
          });

    
    
    }
    
 
    updateSearch(event){
      this.setState({searchValue: event.target.value.substr(0,20)});
    }

render(){

  var{users} = this.state;
  var{following} = this.state;
  var{followers} = this.state;

  
 
  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                      <meta charSet="utf-8" />
                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                      <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                      <title>Search - Users</title>

                      {/* LINKS */}
                      <link rel="canonical" href="http://mysite.com/example" />
                      <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                      <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
            </Helmet> 

        <div className="containerFeedMiddle">
              <div className="global-feed">
              <h3>Connections ({this.state.following.length})</h3>

              <div className="spacing"></div>

              <div className="reading-list">
                  <h4>Following</h4>

                  {this.state.following.map(following=>  (
                    <div key={this.state.following._id}>  
                      <div className='userPosts'>
                        {following}
                      </div>
                    </div>
                  ))} 
                  
                  <hr/>
              </div>
              <div className="reading-list">
                  <h4>Followers</h4>

                  {this.state.followers.map(follower=>  (
                    <div key={this.state.follower._id}>  
                      <div className='userPosts'>
                        {follower}
                      </div>
                    </div>
                  ))}
                  <hr/>
              </div>

        </div>
    </div>         
  </div>
    );
   }
  }