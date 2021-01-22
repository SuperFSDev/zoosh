import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Modal, Image} from 'react-bootstrap'
import Event from '../Common/StartEvent'
import {RiAddFill} from 'react-icons/ri'
import moment from 'moment'
import background from "../../images/friends.jpg";
import Avatar from '@material-ui/core/Avatar';
import {BsMic,BsPeople,BsColumnsGap,BsCalendarFill,BsChatSquareDots,BsBarChart,BsCardText,BsTag,BsXDiamond,BsHouse} from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton';
import Clap from '../../images/clap.png'

export default class Events extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading:true,
      searchValue: '',
      filterBy: '',
      event: '',
      user: '',
      socs:[],
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
          this.setState({
            FollowingID: response.data.user.following,
            score: response.data.user.score,  
            pic: response.data.user.pic,  
            following: response.data.user.following,
            socs:response.data.user.societies


          })
  
        })
        .catch((error) => {
          console.log(error);
        });

    axios.get('http://localhost:4000/events/getEvents')
      .then((response) => {
        this.setState({ 
          events: response.data.events,
          isLoading:false, 
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateSearch(event) {
    this.setState({ searchValue: event.target.value.substr(0, 20) });
  }


render(){

  var user = JSON.parse(localStorage.getItem('user'));
  if(user) 
  {
      var fullname = user.fullname;
  }

  var { events } = this.state;

  let filteredEvents = this.state.events.filter(
    (event) => {
        return event.title.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
    }
  );

  const eventList = filteredEvents.reverse().map(event => {
    return(
    <div key={event._id}>
        <div>
        <a href={"/e/?id=" + event._id} className="-soc-l-navigation">
          <div className="events-card">
              <Image src={background} className="soc-item-image"/>
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
    )})

  
  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Events - Website</title>
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
                          <BsHouse size={25}/> <b className="feed-option-item">Home</b>
                      </div></a>
                      <a href="/communities" className="feed-option-redirects"><div className="option-container">
                          <BsXDiamond size={25}/> <b className="feed-option-item">Communities</b>
                      </div></a>
                      <a href="/users" className="feed-option-redirects"><div className="option-container">
                        <BsPeople size={25}/> <b className="feed-option-item">Users</b>
                      </div></a>
                      <hr/>
                
                      {/* <a href="/forums" className="feed-option-redirects"><div className="option-container">
                          <BsChatSquareDots size={25}/> <b className="feed-option-item">Forums</b>
                      </div></a> */}
                      <a href="/events" className="feed-option-redirects-active"><div className="option-container-active">
                          <BsCalendarFill size={25} className="active-icon"/> <b className="feed-option-item">Events</b>
                      </div></a>
                      {/* <a href="/podcasts" className="feed-option-redirects"><div className="option-container">
                          <BsMic size={25}/> <b className="feed-option-item">Podcasts</b>
                      </div></a> */}
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
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
            <h3>Upcoming Events</h3>

            <div className="search-div-forum">
              <input className="searchbar-nav-forum" type="text" id="mySearch" onChange={this.updateSearch.bind(this)}  placeholder="Search for an Event " title="Type in a category" autofocus/><br/><br/>
            </div>
              <QuickEvent/>
          </div><br/>

          <div className="EventSocietyLayout">
          
          {this.state.isLoading ? ( 
                <div className="SocietyLayout">
                  <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>  
                  <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                  <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                  <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                  <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>  
                  <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                  <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                  <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
              </div>

              ) : (
                  eventList
              )}

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
            <button className="standard-button"  onClick={() => setModalShowEvent(true)}>Create an Event <RiAddFill size={25}/></button>

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
              <Event/>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }
