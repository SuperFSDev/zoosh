import React from 'react';
import '../../App.css';
import axios from 'axios';
import {Dropdown} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar';
import {CgLoadbarSound} from 'react-icons/cg'
import {FaShare} from 'react-icons/fa'
import {BiUpvote,BiDownvote} from 'react-icons/bi'
import {AiOutlineLink} from 'react-icons/ai'

export default class PodcastPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      user: '',
      podcast: '',
    };
  }

    componentDidMount() {
      var podcast_id = new URLSearchParams(this.props.location.search).get("id");
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

      axios.get('http://localhost:4000/podcasts/get-podcast-page', {
        params: {
          id: podcast_id
        }
      })
        .then((response) => {
          this.setState({ podcast: response.data.podcast })
        })
        .catch((error) => {
          console.log(error);
        });
    }

    render() {
        var pod = "Pod / "
      return (
        <>
          {/* REACTJS HELMET */}
        <Helmet>
                  <meta charSet="utf-8" />
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>{this.state.podcast.name}</title>

                  {/* LINKS */}
                  <link rel="canonical" href="http://mysite.com/example" />
                  <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                  <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
          </Helmet> 
          <div className="events-container">
            <div>
              <h1 className="event-header">{this.state.podcast.title}</h1>
              <h3>{this.state.podcast.name}</h3>
              <big className="text-muted">{moment(this.state.podcast.time).format("H:mma - MMM Do, YYYY.")}</big>

              <div className="podcast-desc">
                  <p className="host-icon"><Avatar className="host-icon" src={this.state.user.pic}/></p>
                  <p>{this.state.podcast.description}</p>
                  <div>
                      <span className="voting-btn"><button className="standard-option-btn-post"><BiUpvote size={22} /> Upvote</button></span>
                      <span className="voting-btn"><button className="standard-option-btn-post"><BiDownvote size={22} /></button></span>
                      <Dropdown >
                        <Dropdown.Toggle  id="dropdown-basic" className="standard-option-btn-post">
                          <FaShare/> Share
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1"><AiOutlineLink/> Copy URL</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                  </div>
                  <div className="create-soc-div"><br/>
                    <a href={this.state.podcast.link} target="_blank"><button className="btn-leaderboard"><CgLoadbarSound size={30}/> Listen to Podcast</button></a>

                  </div>
              </div>
              

            </div>
          </div>
           
     
        </>
      );
    }
  }

