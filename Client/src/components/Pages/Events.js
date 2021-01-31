import React, {Fragment} from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Modal, Image} from 'react-bootstrap'
import Event from '../Common/StartEvent'
import {RiAddFill} from 'react-icons/ri'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';
import Clap from '../../images/clap.png'
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import SearchbarFilter from '../Common/SearchbarFilter'

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
  document.body.style.backgroundColor = "#F7F7F7";

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
    <Fragment key={event._id}>
        <Fragment>
        <a href={"/e/?id=" + event._id} className="-soc-l-navigation">
          <div className="events-card">
              {/* <Image src={background} className="soc-item-image"/> */}
              <h4><b>{event.title}</b></h4> 
              <p>{event.society}</p> 
              {/* <p>{event.time}</p> */}
              <big className="text-muted"><b></b>{moment(event.time).format("H:mma - MMM Do, YYYY.")}</big>

              <Fragment >
              </Fragment>
          </div>
          </a>
        </Fragment>
    </Fragment>
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

        <Fragment class="row">
            <div className="column" style={{background:'white'}}>
                <div style={{marginTop:100, marginLeft:330}}>
                    <div className="options-container">
                        <a href="/home"><button className="community-btn">Best</button></a>
                        <a href="/trending"><button className="community-btn">Trending</button></a>
                        <a href="/questions"><button className="community-btn">Questions</button></a>
                        <a href="/events"><button className="community-btn-active">Events</button></a>
                        <a href="/listings"><button className="community-btn">Listings</button></a>
                    </div>

                  
                  <h3 className="-feed-item-header" style={{marginTop:50}}>Upcoming Events</h3>
                  <br/>
                  <QuickEvent/>

                  <div className="search-div-forum">
                    <input className="searchbar-nav-forum" type="text" id="mySearch" onChange={this.updateSearch.bind(this)}  placeholder="Search for an Event " title="Type in a category" autofocus/><br/><br/>
                  </div>

                  {this.state.isLoading ? ( 
                      <div>
                        <Skeleton height={200} width={800} style={{marginBottom:10}} count={5}/><br/>
          
                      </div>

                    ) : (
                      <div className="ListingLayout">
                        {eventList}
                      </div>
                    )}
                    
                </div>
            </div>

            <div className="column2" style={{background:'white'}}>
                <div  style={{marginTop:100, width:430, marginLeft:10}}>
                <SearchbarFilter/>
                    <Fragment>
                      <Recommended/> 
                    </Fragment>
                    
                    <Fragment>
                      <Contributors/>
                    </Fragment>
                       
                </div>
            </div>
        </Fragment>
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
