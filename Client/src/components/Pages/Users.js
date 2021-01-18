import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Image} from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton';
import {BsMic,BsPeople,BsColumnsGap,BsCalendar,BsChatSquareDots,BsBarChart,BsCardText,BsTag,BsXDiamond} from 'react-icons/bs'
import Avatar from '@material-ui/core/Avatar';

export default class ListSocieties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          societies:[],
          isLoading: true,
          users:[],
          user: '',
          searchValue: '',
          filterBy: '',
          socs:[],

        };
      }

    componentDidMount() {
      document.body.style.backgroundColor = "#FDFEFE";
      var user_id = new URLSearchParams(this.props.location.search).get("id");
  
  
      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
        }
      })
  
        .then((response) => {
          this.setState({ user: response.data.user,
                          forums: response.data.user.forums,
                          socs:response.data.user.societies

  
          })
        })
        .catch((error) => {
          console.log(error);
        });

      axios.get('http://localhost:4000/users/getUsers')
      .then((response)=>{
          this.setState({users: response.data.users,
            isLoading: false})
      })
      .catch((error)=>{
          console.log(error);
      });
    
    
    }

    updateSearch(user) {
      this.setState({ searchValue: user.target.value.substr(0, 20) });
    }

render(){
  var{users} = this.state;
  var size = 10;
  const shuffledUsers = shuffleArray(users);
  var user = JSON.parse(localStorage.getItem('user'));


  let filteredUsers = this.state.users.filter(

    (user) => {
        return user.fullname.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
    }

  );
  
  // Display the users from Database
  const usersList = filteredUsers.slice(0,size).map(user => {
    return(
    <div key={user.id}>
      <a href={"/u/?id=" +user._id} className="comm-link"><div className="users-list-items">
        <p>
          <Image src={user.pic} className="user-image-square" roundedCircle/> <br/>
          <span>{user.fullname} <b className="user-score">{user.score}</b></span>
          
        </p>
        <h5></h5>
          
          
      </div></a>
    </div>
  )})


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

        <div className="containerFeedLeft">
        <div className="feed-options-container">
                  <div className="feed-options-item">
                      <a href="/me" className="feed-option-redirects-username"><div className="user-profile-container">
                          <Avatar src={user.pic} className="profile-btn-wrapper-left"/> <p className="uname-feed">{user.fullname}  
                              {user.score >= 1 && user.score <=999 ? (
                                  <span> <b className="user-member">{user.score}</b><br/></span>

                              ) : user.score >=1000 ?(
                                  <span> <b  className="user-mod">{user.score}</b><br/></span>
                              ) : user.score >= 5000 ? (
                                  <span> <b  className="user-admin">{user.score}</b><br/></span>
                              ) : (
                                  <span> <b>{user.score}</b><br/></span>
                              )}
                          </p>
                      </div></a>
                      <hr/><a href="/home" className="feed-option-redirects"><div className="option-container">
                          <BsColumnsGap size={30}/> <b className="feed-option-item">Feed</b>
                      </div></a>
                      <a href="/communities" className="feed-option-redirects"><div className="option-container">
                          <BsXDiamond size={30}/> <b className="feed-option-item">Communities</b>
                      </div></a>
                      <a href="/users" className="feed-option-redirects-active"><div className="option-container-active">
                        <BsPeople size={30}/> <b className="feed-option-item">Users</b>
                      </div></a>
                      <a href="/communities" className="feed-option-redirects"><div className="option-container">
                          <BsTag size={30}/> <b className="feed-option-item">Tags</b>
                      </div></a>
                      <hr/>
                      <a href="/forums" className="feed-option-redirects"><div className="option-container">
                          <BsChatSquareDots size={30}/> <b className="feed-option-item">Forums</b>
                      </div></a>
                      <a href="/events" className="feed-option-redirects"><div className="option-container">
                          <BsCalendar size={30}/> <b className="feed-option-item">Events</b>
                      </div></a>
                      <a href="/podcasts" className="feed-option-redirects"><div className="option-container">
                          <BsMic size={30}/> <b className="feed-option-item">Podcasts</b>
                      </div></a>
                      <a href="/listings" className="feed-option-redirects"><div className="option-container">
                          <BsCardText size={30}/> <b className="feed-option-item">Listings</b>
                      </div></a>
                      
                      <a href="/leaderboard" className="feed-option-redirects"><div className="option-container">
                          <BsBarChart size={30}/> <b className="feed-option-item">Leaderboard</b>
                      </div></a><hr/>
                      
                      <div className="option-container">
                          <b  className="-top-cont-header">Your Communities - {this.state.socs.length}</b>
                          {this.state.socs.map(soc=>
                                    <li><a href={"/s/?id="+soc._id}>{soc}</a></li>)}<br/>
                      </div>
                  </div>
            </div>
        </div>

        <div className="containerFeedMiddle">
              <div className="global-feed">
                <h3>Meet the Community</h3>
                  <div className="container-square">
                    <div className="search-div-square">
                        <input className="searchbar-nav-square" type="text" id="mySearch" onChange={this.updateSearch.bind(this)} placeholder="Search for a user " title="Type in a category"/>
                    </div>
                  </div>  
              </div>

              <div className="UsersLayout">
              {this.state.isLoading ? ( 
                <div>
                  <br/>
                  <div className="UsersLayout">
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={140} width={180} duration={1} className="skeleton-comms"/>  
                  </div>
                  
                </div>

                ) : (
                  usersList
                )}
              </div>
        </div>         
  </div>
    );
   }
  }


// Return a random society from the array - Shuffles them
function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}