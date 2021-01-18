import React, { useRef } from 'react';
import '../../../assets/App.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {  Dropdown,OverlayTrigger,Tooltip } from 'react-bootstrap';
import moment from 'moment'
import { Form, Badge , Image, Card, Button} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import {FaShare} from 'react-icons/fa'
import {BsHeart,BsChat,BsHeartFill,BsBookmark,BsBookmarkFill,BsThreeDots} from 'react-icons/bs'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Clapping from '../../../images/clap-hands.png'
import Clap from '../../../images/clap.png'

export default class DiscussionPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: '',
      comments:[],
      societies: [],
      isLoading:true,
      hearts: 0,
      isSaved: false,
    };
  }

    componentDidMount() {
      var discussion_id = new URLSearchParams(this.props.location.search).get("id");
      // document.body.style.backgroundColor = "#FDFEFE";


      axios.get('http://localhost:4000/discussions/get-discussion-page', {
        params: {
          id: discussion_id,

        }
      })
        .then((response) => {
          this.setState({ 
            discussion: response.data.discussion,
            isLoading:false, })
        })
        .catch((error) => {
          console.log(error);
        });

      axios.get('http://localhost:4000/societies/getSocieties')
        .then((response) => {
          this.setState({ societies: response.data.societies })
      })
      .catch((error) => {
          console.log(error);
      });
    }

    addLikes = () =>{
      const {hearts} = this.state;

      this.setState({ 
        hearts: hearts + 1
      })
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

    render() {

      return (
        <>
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

          <div className="containerPostLeft">

            <div className="discussion-div-sticky">
              <span>{this.state.discussion.pic}</span>
                <p>
                  <small>Written By</small><br/>
                  <span>{this.state.discussion.user} <span className="user-score-post-tag">1,231</span></span>
                  
                </p>
                <button className="community-btn-a">Follow</button>
                <div className="spacing"></div>
                <p >
                  <b>{this.state.discussion.society}</b>
                  <br/>Description about this community
                </p>
                <button className="community-btn-a">Join Community</button>
                <br/><hr/>
                {this.state.hearts > 0 ? ( 
                      <span><button className="standard-option-btn-post" onClick={this.addLikes}><Image src={Clapping} size={20} className="feed-comment"/> {this.state.hearts} claps</button></span>

                    // <span className="voting-btn"><button className="standard-option-btn-post-hearts-liked" onClick={this.addLikes}><BsHeartFill size={22} /> {this.state.hearts} Hearts</button></span>
                    ) : ( 
                      <span><button className="standard-option-btn-post" onClick={this.addLikes}><Image src={Clap} size={20} className="feed-comment"/> {this.state.hearts} claps</button></span>

                    // <span className="voting-btn"><button className="standard-option-btn-post-hearts" onClick={this.addLikes}><BsHeart size={22} /> {this.state.hearts} Hearts</button></span>
                    )} 
                <br/>
                <a href="#responses"><span><button className="standard-option-btn-post" ><BsChat size={20} className="feed-comment" /> {this.state.comments.length} responses</button></span></a>
                <br/>
                <span><button className="standard-option-btn-post" onClick={this.addtoSaved}><BsBookmark size={22} /></button></span>
            </div>
              


          </div>
          <div className="containerPostMiddle">
            <div className="forum-container">
              <div className="containerPostMobileUser">
                <ProfilePic/>
                <Username/>
              </div>
              {/* <Badge variant="secondary">{this.state.discussion.society}</Badge> */}
              <p className="post-header">
                {this.state.discussion.title}<br/>
                <p className="text-muted"><b>{this.state.discussion.user}</b> - {moment(this.state.discussion.time).format("MMM Do")}</p>
              </p>
              
                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Written by</Tooltip>}>
                  <span className="d-inline-block">
                  </span>
                </OverlayTrigger> */}

              <p className="post-content">{this.state.discussion.content}</p>

                {/* Discussion Post interaction options */}
                <div className="spacing"></div>
                
                {this.state.hearts > 0 ? ( 
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addLikes}><Image src={Clapping} size={20} className="feed-comment"/> {this.state.hearts} claps</button></span>

                  // <span className="voting-btn"><button className="standard-option-btn-post-hearts-liked" onClick={this.addLikes}><BsHeartFill size={22} /> {this.state.hearts} Hearts</button></span>
                  ) : ( 
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addLikes}><Image src={Clap} size={20} className="feed-comment"/> {this.state.hearts} claps</button></span>

                  // <span className="voting-btn"><button className="standard-option-btn-post-hearts" onClick={this.addLikes}><BsHeart size={22} /> {this.state.hearts} Hearts</button></span>
                  )} 

                <span className="d-inline-block">
                
                  {!this.state.isSaved ? (
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Save</Tooltip>}>
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addToSaved}><BsBookmark size={22} /></button></span>
                  </OverlayTrigger> 
                  ) : (
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Unsave</Tooltip>}>
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.removeSaved}><BsBookmarkFill size={22} /></button></span>
                  </OverlayTrigger>
                  )}
                
                </span>
                <Dropdown >
                  <Dropdown.Toggle  id="dropdown-basic" className="standard-option-btn-post">
                    <BsThreeDots/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Copy Link</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <hr/>

          <div className="comment-container" id="responses">
          
          <h4>Responses ({this.state.comments.length})</h4>

          <br/><Accordion className="comment-box-acc">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="motto">What are your thoughts?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <textarea className="Comment-input" rows = "5" cols = "60"/>
            
            </AccordionDetails>
            <button className="standard-button">Respond</button>
          </Accordion><br/>
          

            <div className="users-comment">
              <a className="user-profile-shortlink">Test<b className="user-score-post">123</b></a>
                 <p>hello</p>  
            </div><hr/>
                                           
          </div>
        </div>   
          </div>          

       
        </>
      );
    }
  }


  function ProfilePic() {
    var user = JSON.parse(localStorage.getItem('user'));
    var pp = user.pic;
  
    return (
      <div>
        <Avatar src={pp} className="profile-btn-wrapper-left"/>
      </div>
    );
  }


  function Username(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(user)
      var fullname = user.fullname; 
  
    return (
      <div>
        <p>{fullname}</p>
      </div>
    );
  
  }
  
