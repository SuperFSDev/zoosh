import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
// import AddUserToForum from '../Profile/AddUserToForum'
import { Helmet } from 'react-helmet'
import Avatar from '@material-ui/core/Avatar';
import {BsMic,BsPeople,BsColumnsGap,BsCalendar,BsChatSquareDotsFill,BsBarChart,BsCardText,BsTag,BsXDiamond,BsHouse} from 'react-icons/bs'
import Clap from '../../images/clap.png'
import {Image} from 'react-bootstrap'

export default class Forum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forums: [],
      users:[],
      searchValue: '',
      filterBy: '',
      user: '',
      isLoading: true,
      user: '',
      socs:[],
    };
  }

    componentDidMount() {
      // document.body.style.backgroundColor = "#FDFEFE";
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
  


        axios.get('http://localhost:4000/forums/getForums')
          .then((response) => {
            this.setState({ 
              forums: response.data.forums,
              isLoading:false,

             })
          })
          .catch((error) => {
            console.log(error);
          });

        axios.get('http://localhost:4000/forums/get-forum-page', {
         
          })
            .then((response) => {
              this.setState({ forum: response.data.forum,
                users: response.data.forum.users, 
              })
            })
            .catch((error) => {
              console.log(error);
            });
      }

      updateSearch(event) {
        this.setState({ searchValue: event.target.value.substr(0, 20) });
      }

      addForum(frm) {
        addUserToForum(frm);
      }

render(){

  var user = JSON.parse(localStorage.getItem('user'));
  if(user) 
  {
      var fullname = user.fullname;
  }

  let filteredForumsByName = this.state.forums.filter(

    (forum) => {
      let filter = this.state.filterBy;
      if (filter === "Name") {
        return forum.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;

      }  else {

        return forum.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
      }
    }

  );

  const forumList = filteredForumsByName.map(forum => {
    return(
    <div key={forum.id}>
      <a href={"/f/?id="+forum._id}><br/><div className="forum-option">
        <div className="forum-item-title">
            <h5 className="forum-btn-wrapper-left">{forum.name}</h5>
        </div>
    </div></a>
          <div >
      </div>
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
                <title>Forums - Website</title>

                {/* LINKS */}
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet> 
      {/* <div className="containerFeedLeft">
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
                          <BsHouse size={25}/> <b className="feed-option-item">Home</b>
                      </div></a>
                      <a href="/communities" className="feed-option-redirects"><div className="option-container">
                          <BsXDiamond size={25}/> <b className="feed-option-item">Communities</b>
                      </div></a>
                      <a href="/users" className="feed-option-redirects"><div className="option-container">
                        <BsPeople size={25}/> <b className="feed-option-item">Users</b>
                      </div></a>
                      <hr/>
                      <a href="/events" className="feed-option-redirects"><div className="option-container">
                          <BsCalendar size={25}/> <b className="feed-option-item">Events</b>
                      </div></a>
                      <a href="/listings" className="feed-option-redirects"><div className="option-container">
                          <BsCardText size={25}/> <b className="feed-option-item">Listings</b>
                      </div></a>
                      
                      <a href="/leaderboard" className="feed-option-redirects"><div className="option-container">
                        <Image src={Clap} size={25}/> <b className="feed-option-item">Contributors</b>
                      </div></a><hr/>
                      
                      <div className="option-container">
                          <b  className="-top-cont-header">Your Communities - {this.state.socs.length}</b>
                          {this.state.socs.map(soc=>
                                    <li><a href={"/s/?id="+soc._id}>{soc}</a></li>)}<br/>
                      </div>
                  </div>
            </div>
      </div> */}

      <div className="containerMiddleForum">
        <div className="global-forum">
        <div className="spacing"></div>
        <h3>All Forums</h3>
        <div className="search-div-forum">
          <input className="searchbar-nav-forum" type="text" id="mySearch" onChange={this.updateSearch.bind(this)} placeholder="Search for a forum " title="Type in a category"/>
        </div>
      </div>

        <div className="global-forum">
          {/* <div className="featured-forums">
              <h3>Following</h3>
              {this.state.forums.map(forum=>
                  <li key={forum.id}>{forum.forum}</li>)}<br/>
              <a href="#"><div className="forum-option">
                  <h6>{user.forums}</h6>
              </div></a>
          </div> */}



          <div className="featured-forums">
              <h3>Featured</h3>
              {forumList}
          </div>
        </div>
      </div>

      <div className="containerFeedRight">
        
      </div>
  </div>
  );
  }
 }

// Adding a User to forum to follow
async function addUserToForum(frm) {

  var getUser = JSON.parse(localStorage.getItem('user'))

  const addForum = {
      forum: frm,
      user: getUser,
      user_id: getUser._id,
  }

   // Adds users to forums followers array in user model.
   await axios.post('http://localhost:4000/forums/update', addForum)
      .then(function (resp) {
          console.log(resp);
          alert("Successfully followed forum " + frm);
      })
      .catch(function (error) {
          console.log(error);
      })

  // Adds forum to following array in user model.
  await axios.post('http://localhost:4000/users/addToForumFollowingList',addForum)
      //add to following array
      .then(function (resp) {
          console.log(resp);
      })
      .catch(function (error) {
          console.log(error);
      })

}