import React from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import {BsMic,BsPeople,BsColumnsGap,BsCalendar,BsChatSquareDots,BsBarChart,BsCardText} from 'react-icons/bs'

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
                        <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"/> <p className="uname-feed">{fullname}  
                            {this.state.user.score >= 1 && this.state.user.score <=999 ? (
                                <span> <b className="user-member">{this.state.user.score}</b><br/></span>

                            ) : this.state.user.score >=1000 ?(
                                <span> <b  className="user-mod">{this.state.user.score}</b><br/></span>
                            ) : this.state.user.score >= 5000 ? (
                                <span> <b  className="user-admin">{this.state.user.score}</b><br/></span>
                            ) : (
                                <span> <b>{this.state.user.score}</b><br/></span>
                            )}
                        </p>
                    </div></a>
                    <hr/><a href="/home" className="feed-option-redirects"><div className="option-container">
                        <BsColumnsGap size={30}/> <b className="feed-option-item">Feed</b>
                    </div></a>
                    <a href="/communities" className="feed-option-redirects"><div className="option-container">
                        <BsPeople size={30}/> <b className="feed-option-item">Communities</b>
                    </div></a>
                    
                    <a href="/forums" className="feed-option-redirects"><div className="option-container">
                        <BsChatSquareDots size={30}/> <b className="feed-option-item">Forums</b>
                    </div></a>
                    <a href="/events" className="feed-option-redirects"><div className="option-container">
                        <BsCalendar size={30}/> <b className="feed-option-item">Events</b>
                    </div></a>
                    <a href="/podcasts" className="feed-option-redirects"><div className="option-container">
                        <BsMic size={30}/> <b className="feed-option-item">Podcasts</b>
                    </div></a>
                    <a href="/listings" className="feed-option-redirects"><div className="option-container">
                        <BsCardText size={30}/> <b className="feed-option-item">Listings</b>
                    </div></a>
                    
                    <a href="/leaderboard" className="feed-option-redirects"><div className="option-container">
                        <BsBarChart size={30}/> <b className="feed-option-item">Leaderboard</b>
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