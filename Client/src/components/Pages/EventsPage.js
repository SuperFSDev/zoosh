import React from 'react';
import '../../App.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import moment from 'moment'
import {FcCheckmark} from 'react-icons/fc'
import {Dropdown} from 'react-bootstrap'
import {FaShare} from 'react-icons/fa'
import {AiOutlineLink} from 'react-icons/ai'

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
              <big className="text-muted"><b>Hosted By: </b> Computer Science GMIT</big><br/>
              <big className="text-muted"><b>Event Starts: </b>{moment(this.state.event.time).format("H:mma - MMM Do, YYYY.")}</big><br/>

              <button className="trending-soc"> <FcCheckmark size={25}/></button><button className="trending-soc"> <FcCheckmark size={25}/></button>
            </div>
          </div>

          <div className="podcast-desc">
              <p>{this.state.event.description}</p><br/>
              <Dropdown >
                <Dropdown.Toggle  id="dropdown-basic" className="standard-option-btn-post">
                  <FaShare/> Share
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1"><AiOutlineLink/> Copy URL</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown><br/><br/>
              <h5>See whos Attending:</h5>
          </div>
           
     
        </>
      );
    }
  }

