import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import {Helmet} from 'react-helmet'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import {Modal,Image} from 'react-bootstrap'
import Podcast from '../Common/CreatePodcast'
import {RiAddFill} from 'react-icons/ri'
import moment from 'moment'
import {pod} from '../../images/podcasts.jpg'
import SkeletonPodcast from '../Common/SkeletonUI/SkeletonPodcast'

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
  document.body.style.backgroundColor = "#f0f2f5";


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
  if(this.state.isLoading){
    return (
      <div>
        <SkeletonPodcast/>
      </div>
    )
  } else{
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
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
          <h3>Podcasts</h3>
          <Image src={pod} />
          <QuickEvent/>
          {/* <div className="search-div-forum">
            <BsSearch/> 
            <input className="searchbar-nav-forum" type="text" id="mySearch"  placeholder="Search for a Podcast " title="Type in a category"/><br/><br/>
          </div> */}
            <div className="spacing"></div>
            <div>
            <h3>Featured Podcasts</h3>
            <div className="EventSocietyLayout">
              {podcasts.reverse().map(podcast => (
              <div key={podcast._id}>
                  <div>
                  {/* <a href={"/e/?id=" + podcast._id} className="-soc-l-navigation"> */}
                    <a href={"/pod/?id=" + podcast._id} className="-soc-l-navigation"><div className="events-card">
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
              ))}
            </div>

            <div className="spacing"></div>

            <h3>Top Podcasts</h3>
            <div className="EventSocietyLayout">
              {podcasts.reverse().map(podcast => (
              <div key={podcast._id}>
                  <div>
                  {/* <a href={"/e/?id=" + podcast._id} className="-soc-l-navigation"> */}
                    <a href={"/pod/?id=" + podcast._id} className="-soc-l-navigation"><div className="events-card">
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
              ))}
            </div>

            <div className="spacing"></div>

            <h3>All Podcasts</h3>
            <div className="EventSocietyLayout">
              {podcasts.reverse().map(podcast => (
              <div key={podcast._id}>
                  <div>
                  {/* <a href={"/e/?id=" + podcast._id} className="-soc-l-navigation"> */}
                    <a href={"/pod/?id=" + podcast._id} className="-soc-l-navigation"><div className="events-card">
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
              ))}
            </div>
            </div>
        </div>
      </div>
  </div>
  );
}
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