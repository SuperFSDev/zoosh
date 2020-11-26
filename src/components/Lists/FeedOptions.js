import React from 'react';
import {Image} from 'react-bootstrap'
import Team from '../../images/group.png';
import Forum from '../../images/forum.png';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {FcBullish,FcCalendar,FcHome} from 'react-icons/fc'
import axios from 'axios';

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: '',
        user: ''
    };
}

componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: user._id });

    axios.get('http://localhost:4000/users/get-user-details', {
        params: {
            id: user._id
        }
    })
        .then((response) => {
            this.setState({ user: response.data.user })
        })
        .catch((error) => {
            console.log(error);
        });

}

render() {

    return (
        <div>
           <FeedOptions/>
        </div>
    );

}
}

function FeedOptions() {
    
    var user = JSON.parse(localStorage.getItem('user'));
    if(user) 
    {
        var fullname = user.fullname;
        var id = user._id;
        var score = user.score;
        var societies = user.societies;
    }

    return (
        <div className="feed-options-container">
                <div className="feed-options-item">
                    <a href="/me" className="feed-option-redirects-username"><div className="user-profile-container">
                        <h3>{fullname} <b className="user-score">1,200</b></h3>
                    </div></a><br/>
                    <a href="/home" className="feed-option-redirects"><div className="option-container">
                        <FcHome size={35}/> <b>Home</b>
                    </div></a>
                    <a href="/forums" className="feed-option-redirects"><div className="option-container">
                        <Image src={Forum}/> <b>Forums</b>
                    </div></a>
                    <a href="/events" className="feed-option-redirects"><div className="option-container">
                        <FcCalendar size={35}/> <b>Events</b>
                    </div></a>
                     <div>
                        <FeedAccordion/>
                    </div>
                    {/* <a href="/events" className="feed-option-redirects"><div className="option-container">
                        <RiHeadphoneFill size={30}/> Podcasts
                    </div></a> */}
                    <a href="/l" className="feed-option-redirects"><div className="option-container">
                        <FcBullish size={35}/> <b>Leaderboard</b>
                    </div></a>
                </div>
        </div>
  );
}


function FeedAccordion() {

    return (
      <div>
        <Accordion className="accordion-cs">
          <AccordionSummary
            aria-controls="panel1a-content"
          >
          <Typography className="accordion-title"><Image src={Team}/> <b>Clubs and Societies</b></Typography>
          </AccordionSummary>
          <AccordionDetails className="accordion-items">
            <Typography>
              <a href="/me">List Of Users Socs</a><br/>
              <hr/>
              <a href="/list-of-clubs-and-societies">Create</a><br/>
              <a href="/list-of-clubs-and-societies">Join</a><br/>
              <a href="/list-of-clubs-and-societies">See All</a><br/>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }