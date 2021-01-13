import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import FeedOptions from '../Lists/FeedOptions'
import QuickOptions from '../Common/QuickOptions'
import {Badge, Dropdown, Tooltip,OverlayTrigger} from 'react-bootstrap'
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
import {BsLightning,BsHeart,BsGem,BsChatQuote,BsBookmark,BsBookmarkFill} from 'react-icons/bs'

class Discussions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      isLoading: true,
      comments:[],
      time:'',
      toggle: false,
      isSaved: false,

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

  addToSaved = () =>{
    this.setState({ 
      isSaved: true,
    })
  }

  removeSaved = () =>{
    this.setState({ 
      isSaved: false,
    })
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
                <a href="/home"><button className="community-btn">Following</button></a>
                <a href="/discussions"><button className="community-btn-active">Discussions</button></a>
              </div> 
          </div>
        <div className="discussion-feed">
          
          {/* DISCUSSION TAB */}
          {discussions.reverse().map(discussion => (
            <div key={discussion._id}>
              <div className='discussion-post'>
                
                <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect">
                <div>
                  <a href={"/me"}><span className="voting-btn">
                    <button className="standard-option-btn-post" >{discussion.user} <b className="user-score-post-tag">1,231</b> posted in <Badge variant="secondary">{discussion.society}</Badge></button>
                  </span></a><br/>
                  <span className="voting-btn"><small  className="text-muted">{moment(discussion.time).format("MMM Do")} ({moment(discussion.time).startOf('hour').fromNow()})</small></span><br/>
                  <span className="voting-btn"><p className="forum-title">{discussion.title}</p></span>

                </div></a>

                <span className="username-wrapper"> 
                  <a href={"/d/?id=" + discussion._id} ><span className="voting-btn"><button className="standard-option-btn-post-hearts"><BsHeart size={22} /> {this.state.comments.length} Hearts</button></span></a>
                  <a href={"/d/?id=" + discussion._id} ><span className="voting-btn"><button className="standard-option-btn-post" ><BsChatQuote size={20} className="feed-comment" /> {this.state.comments.length} Responses</button></span></a>
                
                  {!this.state.isSaved ? (
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Save</Tooltip>}>
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addToSaved}><BsBookmark size={22} /></button></span>
                  </OverlayTrigger> 
                  ) : (
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Unsave</Tooltip>}>
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.removeSaved}><BsBookmarkFill size={22} /></button></span>
                  </OverlayTrigger>
                  )}

                </span><br/>

              </div><br/>
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