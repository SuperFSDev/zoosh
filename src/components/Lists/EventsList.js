import React from 'react';
import '../../App.css';
import axios from 'axios';
import QuickEvent from '../Common/QuickEvent'

export default class EventsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

componentDidMount() {
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
  );
  }
}