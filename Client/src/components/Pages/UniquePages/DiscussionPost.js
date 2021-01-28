import React, { useRef } from 'react';
import '../../../assets/App.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {  OverlayTrigger,Tooltip } from 'react-bootstrap';
import moment from 'moment'
import { Image, Card, Button} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import {BsChat,BsBookmark,BsBookmarkFill,BsThreeDots} from 'react-icons/bs'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Clapping from '../../../images/clap-hands.png'
import Clap from '../../../images/clap.png'
import {RiShieldStarLine} from 'react-icons/ri'
import ShowMoreText from 'react-show-more-text';
import ReadMore from '../../Common/ReadMore'
export default class DiscussionPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: '',
      discussions: [],
      discussion_id:'',
      comments:[],
      societies: [],
      isLoading:true,
      hearts: 0,
      isSaved: false,
      comment:''
    };
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    componentDidMount() {
      this.state.discussion_id = new URLSearchParams(this.props.location.search).get("id");
      // document.body.style.backgroundColor = "#FDFEFE";


      axios.get('http://localhost:4000/discussions/get-discussion-page', {
        params: {
          id: this.state.discussion_id,

        }
      })
        .then((response) => {
          this.setState({ 
            discussion: response.data.discussion,
            comments:response.data.discussion.comments,
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
      
      axios.get('http://localhost:4000/discussions/getDiscussions')
      .then((response) => {
        this.setState({ 
          discussions: response.data.discussions,
          users:response.data.discussions,
          isLoading: false, })
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


    onChangeComment(e) {
      this.setState({
        comment: e.target.value
      });
    }

    onSubmit(e) {
      var user = JSON.parse(localStorage.getItem('user'));  
      const newComment = {
        _id:this.state.discussion_id,
        comment:{
        user_id: user._id,
        user_name: user.fullname,
        comment: this.state.comment,
        time: new Date().getTime(),
        user_img: user.pic
      }
      
   }
   
   axios.post('http://localhost:4000/discussions/addComment', newComment)
   .then()
   .catch();
   window.location.reload();
    }

    render() {
      var { discussions } = this.state;
      var user = JSON.parse(localStorage.getItem('user'));
      console.log(this.state.comments);

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
                  <span>
                    <Avatar src={this.state.discussion.user_img}/>
                    <a href={"/u/?id="+this.state.discussion.user_id} style={{textDecoration:'none', color:'black'}}>{this.state.discussion.user}</a> 
                    <span className="user-score-post-tag">{this.state.discussion.user_score}</span>
                  </span>
                  
                </p>
                <button className="community-btn-a">Follow</button>
                <div className="spacing"></div>
                <p >
                  <a href={"/c/?id="+this.state.discussion.society}><b>{this.state.discussion.society}</b></a>
                  <br/>
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
              {/* <Badge variant="secondary">{this.state.discussion.society}</Badge> */}
              <p className="post-header">
                {this.state.discussion.title}<br/>
                <p style={{fontSize:14, color:'gray'}}>
                  <a href={"/u/?id="+this.state.discussion.user_id} style={{textDecoration:'none', color:'black'}}>
                  <b style={{color:'gray'}}>{this.state.discussion.user}</b> - {moment(this.state.discussion.time).format("MMM Do")}
                  </a>
                </p>

                <Image src={this.state.discussion.picture} className="thumbnail"/>
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

                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Community Guidelines</Tooltip>}>
                    <span><button className="standard-option-btn-post" ><RiShieldStarLine size={20}/></button></span>
                  </OverlayTrigger>
                  <span><button className="standard-option-btn-post" >Report</button></span>
                  
                  
                </span>
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
            <textarea value={this.state.comment} onChange={this.onChangeComment} className="Comment-input" rows = "5" cols = "60"/>
            </AccordionDetails>
            <button className="standard-button" onClick={this.onSubmit}>Publish</button>
          </Accordion><br/>
          
          <div className="users-comment">
            {this.state.comments.sort((a, b) => b.time - a.time).map(comment=>(
              <div>
              <div  class="miniprofile2">
                <p>
                  <span className="voting-btn">
                  <a href={"/u/?id=" + comment.user_id} className="post-link-a"><figure class="headshot">
                        <Avatar src={comment.user_img}/>
                  </figure></a>
                  <section class="bio-box">
                            <dl class="details"> 
                                <a href={"/u/?id=" + comment.user_id} className="post-link-a"><b>{comment.user_name} </b></a>
                                <dd class="location" style={{color:'gray'}}>{moment(comment.time).startOf('seconds').fromNow()}</dd>
                                
                                
                            </dl>
                  </section>
                </span>                  
                </p>
                <br/>
                <p>
                  
                </p>
                
              </div>
              <ShowMoreText
                /* Default options */
                lines={1}
                more='Read more'
                less='Read less'
                onClick={this.executeOnClick}
                expanded={false}
                font={20}
                width={1000}
                height={100}
              >
              <p className="post-content">{comment.comment}</p>
              </ShowMoreText>
              <button className="standard-option-btn-post" onClick={this.addLikes}><Image src={Clap} size={20} className="feed-comment"/> {this.state.hearts} claps</button>
            <hr/>
              </div>
            ))}
         </div>  
         <div>
          {/* <ReadMore/> */}
         </div>
      </div>
    </div>   
    </div>          
    </>
    );
  }
}

  
