import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import FeedOptions from '../Lists/FeedOptions'
import QuickOptions from '../Common/QuickOptions'
import {Badge} from 'react-bootstrap'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {Helmet} from 'react-helmet'
import {BiUpvote,BiDownvote} from 'react-icons/bi'
import { CgComment } from 'react-icons/cg'
import Fab from '@material-ui/core/Fab';
import QuickCreate from '../Common/QuickCreate'

class Discussions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      toggle: false
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#f0f2f5";

    axios.get('http://localhost:4000/discussions/getDiscussions')
      .then((response) => {
        this.setState({ discussions: response.data.discussions })
      })
      .catch((error) => {
        console.log(error);
      });
  }

render(){
  var { discussions } = this.state;

  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Discussions</title>

                {/* LINKS */}
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet> 

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
        {/* Mobile Quick Create */}
        <Fab color="secondary" aria-label="add" className="fab">
          <QuickCreate/>
        </Fab>
        <QuickOptions/>
          <div>
            <div className="post-option-btns">
              <a href="/home"><button className="post-option-btn-item">Global</button></a>
              <a href="/discussions"><button className="post-option-btn-item-discussion">Community</button></a>
              <button className="post-option-btn-item">Media</button>
              <button className="post-option-btn-item">Links</button>
          </div>
        <div className="global-feed">
          
          {/* DISCUSSION TAB */}
          {discussions.reverse().map(discussion => (
            <div key={discussion._id}>
              <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><div className='discussion-post'>
                
                <div>
                  <h1 className="forum-title">{discussion.title}</h1>
                  <span className="username-wrapper">
                    <div class="dropdown3">
                                <a href="/me">{discussion.user} <b className="user-score-post-tag">1,231</b></a>
                                <div class="dropdown-content3">
                                    <a href="#">{discussion.user}</a>
                                    <a href="#"><Badge variant="primary">Admin</Badge> <Badge variant="secondary">Member</Badge></a>
                                </div>
                    </div>
                    <br/>
                  <span className="voting-btn"><button className="standard-option-btn-post"><BiUpvote size={22} /></button></span>
                  <span className="voting-btn"><button className="standard-option-btn-post"><BiDownvote size={22} /></button></span>
                  <a href={"/d/?id=" + discussion._id} ><span className="voting-btn"><button className="standard-option-btn-post" ><CgComment size={20} className="feed-comment" /> Comments</button></span></a>
                  
                  </span><br/>
                  {/* <big className="text-muted-society">#{discussion._id}</big> */}
                  {/* <p>{moment(discussion.time).format("H:mma - MMM Do, YYYY.")}</p> */}
                </div>
              </div></a><br/>
            </div>
          ))}
        </div>
        </div>      
        </div>

      <div className="containerFeedRight">
        <Recommended/>
        <Contributors/> 
      </div>
  </div>
  );
}
}


export default Discussions;