import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import FeedOptions from '../Lists/FeedOptions'
import QuickOptions from '../Common/QuickOptions'
import {Badge, Dropdown} from 'react-bootstrap'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {Helmet} from 'react-helmet'
import {BiUpvote,BiDownvote} from 'react-icons/bi'
import { CgComment } from 'react-icons/cg'
import Fab from '@material-ui/core/Fab';
import QuickCreate from '../Common/QuickCreate'
import {FaShare} from 'react-icons/fa'
import SkeletonDiscussions from '../Common/SkeletonUI/SkeletonDiscussions'
import {BsLightning,BsHeart,BsGem,BsChatQuote} from 'react-icons/bs'

class Discussions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      isLoading: true,
      comments:[],
      time:'',
      toggle: false
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#f0f2f5";

    axios.get('http://localhost:4000/discussions/getDiscussions')
      .then((response) => {
        this.setState({ discussions: response.data.discussions,
          isLoading: false, })
      })
      .catch((error) => {
        console.log(error);
      });
  }

render(){
  var { discussions } = this.state;

  if(this.state.isLoading){
    return (
      <div>
        <SkeletonDiscussions/>
      </div>
    )
  } else{
  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Discussions - Website</title>

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
            <div  className="options-container">
                <a href="/home"><button className="community-btn">Feed</button></a>
                <a href="/discussions"><button className="community-btn-active">Discussions</button></a>
                <button className="community-btn">Media</button>
                <button className="community-btn">Links</button>
              </div> 
          </div>
        <div className="discussion-feed">
          
          {/* DISCUSSION TAB */}
          {discussions.reverse().map(discussion => (
            <div key={discussion._id}>
              <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><div className='discussion-post'>
                
                <div>
                  <Badge variant="secondary">{discussion.society}</Badge>
                  <br/><br/>
                  <h2 className="forum-title">{discussion.title}</h2>
                  {/* <p>{moment(discussion.time).format("MMM Do")}</p> */}

                  <span className="username-wrapper">
                    <div class="dropdown3">
                                <div class="dropdown-content3">
                                    <a href="#">{discussion.user}</a>
                                    <a href="#"><Badge variant="primary">Admin</Badge> <Badge variant="secondary">Member</Badge></a>
                                </div>
                    </div>
                    <br/>
                  {/* <span className="voting-btn"><button className="standard-option-btn-post"><BiUpvote size={22} /> Upvote</button></span>
                  <span className="voting-btn"><button className="standard-option-btn-post"><BiDownvote size={22} /> </button></span> */}
                  <a href="/me"><span className="voting-btn"><button className="standard-option-btn-post" >{discussion.user} <b className="user-score-post-tag">1,231</b></button></span></a>
                  <span className="voting-btn"><button className="standard-option-btn-post-hearts"><BsHeart size={22} /> {this.state.comments.length} Hearts</button></span>
                  <a href={"/d/?id=" + discussion._id} ><span className="voting-btn"><button className="standard-option-btn-post" ><BsChatQuote size={20} className="feed-comment" /> {this.state.comments.length} Responses</button></span></a>
                  <Dropdown >
                    <Dropdown.Toggle  id="dropdown-basic" className="standard-option-btn-post">
                      <FaShare/> Share
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Copy Link</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  
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
}


export default Discussions;