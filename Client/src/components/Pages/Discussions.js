import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import {Tooltip,OverlayTrigger, Image} from 'react-bootstrap'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {Helmet} from 'react-helmet'
import Fab from '@material-ui/core/Fab';
import QuickCreate from '../Common/QuickCreate'
import {BsHeart,BsChatQuote,BsBookmark,BsBookmarkFill} from 'react-icons/bs'
import Test from '../../images/friends.jpg'
import Skeleton from 'react-loading-skeleton';
import {BsMic,BsPeople,BsColumnsGap,BsCalendar,BsChatSquareDots,BsBarChart,BsCardText,BsTag,BsXDiamond,BsChat} from 'react-icons/bs'
import Avatar from '@material-ui/core/Avatar';
import Clapping from '../../images/clap-hands.png'
import Clap from '../../images/clap.png'

export default class Discussions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      isLoading: true,
      comments:[],
      time:'',
      toggle: false,
      isSaved: false,
      socs:[],
      user:'',
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

    axios.get('http://localhost:4000/discussions/getDiscussions')
      .then((response) => {
        this.setState({ discussions: response.data.discussions,
          isLoading: false, })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addtoSaved = (discussion) =>{
    // this.setState({ 
    //   isSaved: true,
      addToReadingList(discussion);
    // })
  }

  removeSaved = () =>{
    this.setState({ 
      isSaved: false,
    })
  }


render(){
  var { discussions } = this.state;
  var user = JSON.parse(localStorage.getItem('user'));

  const string =  "In an age when nature and magic rule the world, there is an extraordinary legend: the story of a warrior who communicates with animals, who fights sorcery and the unnatural.";
  string.slice(0, 2)

  const discussionList = discussions.reverse().map(discussion => {
    return(
        <div key={discussion._id}>
          <div className='discussion-post'>
            <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect">
            <div>
              <p>
                <a href={"/me"} className="post-link-a"><span className="voting-btn">
                  <b>{discussion.user}</b>  

                  {discussion.society == null ? (
                      <span> posted in<b> General</b></span>
                  ) : (
                    <span> posted in <b>{discussion.society}</b></span>
                  )}
                </span></a><br/>
                <span className="forum-title">{discussion.title.slice(0,35)}</span><Image className="post-image" src={Test} width={150}/><br/>
                <small  className="text-muted">{moment(discussion.time).format("MMM Do")} ({moment(discussion.time).startOf('hour').fromNow()})</small>
              </p>
            </div></a>
            <span className="username-wrapper"> 
              <a href={"/d/?id=" + discussion._id} ><span className="voting-btn"><button className="standard-option-btn-post"><Image src={Clap} size={20} className="feed-comment"/> {this.state.comments.length} claps</button></span></a>
              {/* <a href={"/d/?id=" + discussion._id} ><span className="voting-btn"><button className="standard-option-btn-post-hearts"><BsHeart size={22} /> {this.state.comments.length} Hearts</button></span></a> */}
              <a href={"/d/?id=" + discussion._id} ><span className="voting-btn"><button className="standard-option-btn-post" ><BsChat size={20} className="feed-comment" /> {this.state.comments.length} responses</button></span></a>
              {!this.state.isSaved ? (
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Save</Tooltip>}>
                <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addtoSaved}><BsBookmark size={22} /></button></span>
              </OverlayTrigger> 
              ) : (
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Unsave</Tooltip>}>
                <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.removeSaved}><BsBookmarkFill size={22} /></button></span>
              </OverlayTrigger>
              )}
            </span><br/>
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
                <title>Discussions - Website</title>

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
                      <hr/><a href="/home" className="feed-option-redirects-active"><div className="option-container-active">
                          <BsColumnsGap size={30}/> <b className="feed-option-item">Feed</b>
                      </div></a>
                      <a href="/communities" className="feed-option-redirects"><div className="option-container">
                          <BsXDiamond size={30}/> <b className="feed-option-item">Communities</b>
                      </div></a>
                      <a href="/users" className="feed-option-redirects"><div className="option-container">
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
        {/* Mobile Quick Create */}
        <Fab color="secondary" aria-label="add" className="fab">
          <QuickCreate/>
        </Fab>
          <div>
            <div className="post-option-btns">
            <div  className="options-container">
                <a href="/home"><button className="community-btn-active">All</button></a>
                <a href="/following"><button className="community-btn">Following</button></a>
                <a href="/home"><button className="community-btn">Questions</button></a>
                <a href="/home"><button className="community-btn-filter">Filter by</button></a>
              </div> 
          </div>
          
          <div className="discussion-feed">
            {/* DISCUSSION TAB */}
            { this.state.isLoading ? ( 
                <div>
                  <Skeleton height={200}/>
                  <Skeleton height={200}/>
                  <Skeleton height={200}/>
                  <Skeleton height={200}/>
                </div>

              ) : (
                discussionList
              )}
            
          </div>
        </div>      
        </div>

      <div className="containerFeedRight">
        { this.state.isLoading ? ( 
                  <div>
                    <Skeleton height={350} width={300} duration={1}/>
                    <br/><br/><br/>
                    <Skeleton height={350} width={300} duration={1}/>
                  </div>

                ) : (
                  <div>
                    <Recommended/>  
                    <Contributors/> 
                  </div>
                )}
      </div>
  </div>
  );
}
}

 // Adding a User to a society array and adding the society to the users array
 async function addToReadingList(discussion) {
  
  const addDiscussion = {
      discussion: discussion._id,
  }

  // Adds society to societies array in user model.
  await axios.post('http://localhost:4000/users/addToReadingList', addDiscussion)
      .then(function (resp) {
          console.log(resp);
      })
      .catch(function (error) {
          console.log(error);
      })
}