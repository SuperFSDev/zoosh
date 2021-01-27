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
import ShowMoreText from 'react-show-more-text';

export default class QuestionPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      questions: [],
      question_id:'',
      comments:[],
      societies: [],
      isLoading:true,
      isSaved: false,
      comment:''
    };
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    componentDidMount() {
      this.state.question_id = new URLSearchParams(this.props.location.search).get("id");
      // document.body.style.backgroundColor = "#FDFEFE";


      axios.get('http://localhost:4000/questions/get-question-page', {
        params: {
          id: this.state.question_id,
        }
      })
        .then((response) => {
          this.setState({ 
            question: response.data.question,
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


    onChangeComment(e) {
      this.setState({
        comment: e.target.value
      });
    }

    onSubmit(e) {
      var user = JSON.parse(localStorage.getItem('user'));  
      const newComment = {
        _id:this.state.question_id,
        comment:{
        user_id: user._id,
        user: user.fullname,
        comment: this.state.comment,
        time: new Date().getTime(),
        user_img: user.pic,
        user_score: user.score,
      }
      
   }
   
   axios.post('http://localhost:4000/discussions/addComment', newComment)
   .then()
   .catch();
   window.location.reload();
    }

    render() {
      var { questions } = this.state;
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
                <p>
                  <small>Written By</small><br/>
                  <span>
                    <a href={"/u/?id="+this.state.question.user_id} style={{textDecoration:'none', color:'black'}}>{this.state.question.user}</a> 
                  </span>
                  
                </p>
                <button className="community-btn-a">Follow</button>
                <div className="spacing"></div>
                <p >
                  <b>{this.state.question.society}</b>
                  <br/>Description about this community
                </p>
                <button className="community-btn-a">Join Community</button>
                <br/><hr/>
         
                <br/>
                <a href="#responses"><span><button className="standard-option-btn-post" ><BsChat size={20} className="feed-comment" /> {this.state.comments.length} responses</button></span></a>
                <br/>
                <span><button className="standard-option-btn-post" onClick={this.addtoSaved}><BsBookmark size={22} /></button></span>
            </div>
              


          </div>
          <div className="containerPostMiddle">
            <div className="forum-container">
              <p className="post-header">
                {this.state.question.question}<br/>
              </p>
              <hr/>

          <div className="comment-container" id="responses">
          
          <h4>Answers ({this.state.comments.length})</h4>
          
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
                                <a href={"/u/?id=" + comment.user_id} className="post-link-a"><b>{comment.user} </b></a>
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

      </div>
    </div>   
    </div>          
    </>
    );
  }
}
  
