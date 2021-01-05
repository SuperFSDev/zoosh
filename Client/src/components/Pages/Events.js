import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Modal} from 'react-bootstrap'
import Event from '../Common/StartEvent'
import {RiAddFill} from 'react-icons/ri'
import moment from 'moment'

export default class Events extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

componentDidMount() {
  document.body.style.backgroundColor = "#f0f2f5";

    axios.get('http://localhost:4000/events/getEvents')
      .then((response) => {
        this.setState({ events: response.data.events })
      })
      .catch((error) => {
        console.log(error);
      });
  }


render(){
  var { events } = this.state;

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
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
          <h1>Upcoming Events</h1>

          <div className="search-div-forum">
            {/* <BsSearch/>  */}
            <input className="searchbar-nav-forum" type="text" id="mySearch"  placeholder="Search for an Event " title="Type in a category"/><br/><br/>
          </div>

          <QuickEvent/>
            <div>
              <div className="EventSocietyLayout">
              {events.reverse().map(event => (
              <div key={event._id}>
                  <div>
                  <a href={"/e/?id=" + event._id} className="-soc-l-navigation">
                    <div className="events-card">
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
              ))}
            </div>
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
            <button className="standard-button"  onClick={() => setModalShowEvent(true)}>Create Event <RiAddFill size={25}/></button>

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
