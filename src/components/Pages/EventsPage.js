import React from 'react';
import '../../App.css';
import axios from 'axios';
import {Image} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import Hackathon from '../../images/hackathon.png'

export default class EventsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      event: '',
    };
  }

    componentDidMount() {
      var event_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#f0f2f5";


      axios.get('http://localhost:4000/events/get-events-page', {
        params: {
          id: event_id
        }
      })
        .then((response) => {
          this.setState({ event: response.data.event })
        })
        .catch((error) => {
          console.log(error);
        });
    }

    render() {
      return (
        <>
          {/* REACTJS HELMET */}
        <Helmet>
                  <meta charSet="utf-8" />
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>Event</title>

                  {/* LINKS */}
                  <link rel="canonical" href="http://mysite.com/example" />
                  <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                  <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
          </Helmet> 
          <div className="events-container">
            <div>
              <h1 className="event-header">{this.state.event.title}</h1>
                {/* <Image src={Hackathon} className="events-header-image"/>               */}
            </div>
          </div>
           
     
        </>
      );
    }
  }

