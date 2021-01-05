import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {FcCalendar,FcHome,FcHeadset,FcAreaChart,FcCollaboration,FcComments,FcVoicePresentation} from 'react-icons/fc'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import {Badge} from 'react-bootstrap'
import {RiDashboardLine,RiCalendarLine,RiNumbersLine,RiTeamLine,RiMicLine,RiDiscussLine} from 'react-icons/ri'

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
                        <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"/> <p className="uname-feed"> {fullname} <b className="user-score">{this.state.user.score}</b></p>
                    </div></a>
                    <hr/><a href="/home" className="feed-option-redirects"><div className="option-container">
                        <RiDashboardLine size={30}/> <b className="feed-option-item">Feed</b>
                    </div></a>
                    <a href="/communities" className="feed-option-redirects"><div className="option-container">
                        <RiTeamLine size={30}/> <b className="feed-option-item">Communities</b>
                    </div></a>
              
                    <a href="/forums" className="feed-option-redirects"><div className="option-container">
                        <RiDiscussLine size={30}/> <b className="feed-option-item">Forums</b>
                    </div></a>
                    <a href="/events" className="feed-option-redirects"><div className="option-container">
                        <RiCalendarLine size={30}/> <b className="feed-option-item">Events</b>
                    </div></a>
                    <a href="/podcasts" className="feed-option-redirects"><div className="option-container">
                        <RiMicLine size={30}/> <b className="feed-option-item">Podcasts</b>
                    </div></a>
                    {/* <a href="/podcasts" className="feed-option-redirects"><div className="option-container">
                        <FcVoicePresentation size={35}/> <b>Elections</b> <Badge variant="success">New</Badge>
                    </div></a> */}
                    
                    <a href="/leaderboard" className="feed-option-redirects"><div className="option-container">
                        <RiNumbersLine size={30}/> <b className="feed-option-item">Leaderboard</b>
                    </div></a><hr/>
                    
                    <div className="option-container">
                        <b  className="-top-cont-header">Your Communities - {this.state.socs.length}</b>
                        {this.state.socs.map(soc=>
                                  <li><a href={"/s/?id="+soc._id}>{soc}</a></li>)}<br/>
                    </div>
                </div>
                
        </div>
        </div>
    );

}
}