import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import {Helmet} from 'react-helmet'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import {Modal,Image} from 'react-bootstrap'
import Podcast from '../Common/CreatePodcast'
import {RiAddFill} from 'react-icons/ri'
import moment from 'moment'
import {pod} from '../../images/podcasts.jpg'
import {BsMic,BsPeople,BsColumnsGap,BsCalendar,BsChatSquareDots,BsBarChart,BsCardText,BsTag,BsXDiamond} from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton';

export default class Podcasts extends React.Component {

constructor(props) {
  super(props);
  this.state = {
      id: '',
      user: '',
      following: [],
      socs:[],
      podcasts: [],
      isLoading:true,
  };
}

componentDidMount() {
  var user = JSON.parse(localStorage.getItem('user'));
  this.setState({ id: user._id });
  document.body.style.backgroundColor = "#FDFEFE";


  axios.get('http://localhost:4000/users/get-user-details', {
      params: {
          id: user._id
      }
  })
      .then((response) => {
          this.setState({ user: response.data.user,
              following: response.data.user.following,
              socs:response.data.user.societies

          })
      })
      .catch((error) => {
          console.log(error);
      });

      axios.get('http://localhost:4000/podcasts/GetPodcasts')
      .then((response) => {
        this.setState({ 
          podcasts: response.data.podcasts,
          isLoading:false, 
        })
      })
      .catch((error) => {
        console.log(error);
      });

}

render(){

  var { podcasts } = this.state;


  var user = JSON.parse(localStorage.getItem('user'));
  if(user) 
  {
      var fullname = user.fullname;
  }

  const featuredList = podcasts.reverse().map(podcast =>{
    return(
    <div key={podcast._id}>
        <div>
        {/* <a href={"/e/?id=" + podcast._id} className="-soc-l-navigation"> */}
          <a href={"/pod/?id=" + podcast._id} className="-soc-l-navigation"><div className="podcasts-card">
              <p className="host-icon"><Avatar className="host-icon" src={this.state.user.pic}/></p>
              <h4><b>{podcast.title}</b></h4> 
              <h6><b>{podcast.name}</b></h6> 
              <big className="text-muted">{moment(podcast.time).format("H:mma - MMM Do, YYYY.")}</big>
              <div >
              </div>
          </div>
          </a>
        </div>
    </div>
    )})

    const topList = podcasts.reverse().map(podcast =>{
      return (
      <div key={podcast._id}>
          <div>
          {/* <a href={"/e/?id=" + podcast._id} className="-soc-l-navigation"> */}
            <a href={"/pod/?id=" + podcast._id} className="-soc-l-navigation"><div className="podcasts-card">
                <p className="host-icon"><Avatar className="host-icon" src={this.state.user.pic}/></p>
                <h4><b>{podcast.title}</b></h4> 
                <h6><b>{podcast.name}</b></h6> 
                <big className="text-muted">{moment(podcast.time).format("H:mma - MMM Do, YYYY.")}</big>
                <div >
                </div>
            </div>
            </a>
          </div>
      </div>
      )})
    
    const allList = podcasts.reverse().map(podcast =>{
      return (
      <div key={podcast._id}>
          <div>
          {/* <a href={"/e/?id=" + podcast._id} className="-soc-l-navigation"> */}
            <a href={"/pod/?id=" + podcast._id} className="-soc-l-navigation"><div className="podcasts-card">
                <p className="host-icon"><Avatar className="host-icon" src={this.state.user.pic}/></p>
                <h4><b>{podcast.title}</b></h4> 
                <h6><b>{podcast.name}</b></h6> 
                <big className="text-muted">{moment(podcast.time).format("H:mma - MMM Do, YYYY.")}</big>
                <div >
                </div>
            </div>
            </a>
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
                <title>Podcasts - Website</title>
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
                          <BsPeople size={30}/> <b className="feed-option-item">Communities</b>
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
                      <a href="/podcasts" className="feed-option-redirects-active"><div className="option-container-active">
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
          <h3>Podcasts</h3>
          <Image src={pod} />
          <QuickEvent/>
            
        </div>

        <div className="post-option-btns">
            <div className="options-container-listings">
                <button className="community-btn">All Podcasts</button>
                <button className="community-btn">Top Podcasts</button>
                <button className="community-btn" >Featured Podcasts</button>
            </div>        
        </div>

        <div className="global-feed-container">
            <h3>Featured Podcasts</h3>
            <div className="EventSocietyLayout">
              
              {this.state.isLoading ? ( 
                  <div className="SocietyLayout">
                    <Skeleton height={150} width={250} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={150} width={250} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={150} width={250} duration={1} className="skeleton-comms"/>
                </div>

                ) : (
                  featuredList
                )}
              </div>

            <div className="spacing"></div>

            <h3>Top Podcasts</h3>
            <div className="EventSocietyLayout">
            {this.state.isLoading ? ( 
                  <div className="SocietyLayout">
                    <Skeleton height={150} width={250} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={150} width={250} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={150} width={250} duration={1} className="skeleton-comms"/>
                </div>

                ) : (
                  topList
                )}
            </div>

            <div className="spacing"></div>

            <h3>All Podcasts</h3>
            <div className="EventSocietyLayout">
            {this.state.isLoading ? ( 
                  <div className="SocietyLayout">
                    <Skeleton height={150} width={250} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={150} width={250} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={150} width={250} duration={1} className="skeleton-comms"/>
                </div>

                ) : (
                  allList
                )}
            </div>
            </div>
      </div>
  </div>
  );
}
}

//  FUNCTIONS TO OPEN EVENT MODAL
function QuickEvent() {
  const [modalShow, setModalShowEvent] = React.useState(false);

  return (
    <div>
            <button className="standard-button"  onClick={() => setModalShowEvent(true)}>Share your Podcast <RiAddFill size={25}/></button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShowEvent(false)}
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
              <Podcast/>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }