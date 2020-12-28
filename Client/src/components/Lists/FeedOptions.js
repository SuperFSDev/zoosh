import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {FcCalendar,FcHome,FcHeadset,FcAreaChart,FcCollaboration,FcComments} from 'react-icons/fc'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: '',
        user: '',
        following: [],
        socs:[],

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
            this.setState({ user: response.data.user,
                following: response.data.user.following,
                socs:response.data.user.societies

            })
        })
        .catch((error) => {
            console.log(error);
        });

}

render() {

    var user = JSON.parse(localStorage.getItem('user'));
    if(user) 
    {
        var fullname = user.fullname;
    }

    return (
        <div>
             <div className="feed-options-container">
                <div className="feed-options-item">
                    <a href="/me" className="feed-option-redirects-username"><div className="user-profile-container">
                        <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"/> <h5> {fullname} <b className="user-score">{this.state.user.score}</b></h5>
                    </div></a>
                    <hr/><a href="/home" className="feed-option-redirects"><div className="option-container">
                        <FcHome size={35}/> <b>Home</b>
                    </div></a>
                    <a href="/forums" className="feed-option-redirects"><div className="option-container">
                        <FcComments size={35}/> <b>Forums</b>
                    </div></a>
                    <a href="/events" className="feed-option-redirects"><div className="option-container">
                        <FcCalendar size={35}/> <b>Events</b>
                    </div></a>
                    <a href="/podcasts" className="feed-option-redirects"><div className="option-container">
                        <FcHeadset size={35}/> <b>Podcasts</b>
                    </div></a>
                     <div>
                        {/* <FeedAccordion/> */}
                        <Accordion className="accordion-cs">
                            <AccordionSummary
                                aria-controls="panel1a-content"
                            >
                            <Typography className="accordion-title"><FcCollaboration size={35}/> <b>Communities</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails className="accordion-items">
                                <Typography>
                                {this.state.socs.map(soc=>
                                  <li><a href={"/s/?id="+soc._id}>{soc}</a></li>)}<br/>
                                <hr/>
                                <a href="/communities"  className="community-btn" id="dropdown-basic">See All Communities</a><br/>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <a href="/leaderboard" className="feed-option-redirects"><div className="option-container">
                        <FcAreaChart size={35}/> <b>Leaderboard</b>
                    </div></a>
                </div>
        </div>
        </div>
    );

}
}