import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import axios from 'axios';
import QuickEvent from '../Common/QuickEvent'
import {Helmet} from 'react-helmet'


class Events extends React.Component {

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
                <title>Events</title>
        </Helmet> 

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
      <div className="global-feed">
      <h1>Upcoming Events</h1>
      <QuickEvent/>
        <div>
          <div className="EventSocietyLayout">
          {events.reverse().map(event => (
          <div key={event._id}>
              <div>
                <div className="events-card">
                  <a href="/" className="-soc-l-navigation">
                    <h4><b>{event.title}</b></h4> 
                    <p>{event.society}</p> 
                    <p>{event.time}</p>
                    <div >
                    </div>
                  </a>
                </div>
                
              </div>
          </div>
          ))}
        </div>
        </div>
    </div>
      </div>

      <div className="containerFeedRight">
        {/* <Recommended/>  
        <Contributors/>   */}
      </div>
  </div>
  );
}
}
export default Events;