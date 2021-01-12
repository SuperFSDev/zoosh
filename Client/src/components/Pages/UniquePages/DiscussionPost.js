import React, { useRef } from 'react';
import '../../../App.css';
import axios from 'axios';
import ProfileUsername from '../../Profile/ProfileUsername'
import ProfilePicture from '../../Profile/ProfilePicture'
import {Helmet} from 'react-helmet'
import {  Dropdown } from 'react-bootstrap';
import moment from 'moment'
import { Form, Badge , Image, Card, Button} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import {FaShare} from 'react-icons/fa'
import {BsHeart,BsGem} from 'react-icons/bs'
import { RiFlaskLine } from 'react-icons/ri';
import SkeletonDiscussionPost from '../../Common/SkeletonUI/SkeletonDiscussionPage'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


export default class DiscussionPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: '',
      comments:[],
      societies: [],
      isLoading:true,
    };
  }

    componentDidMount() {
      var discussion_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#f0f2f5";


      axios.get('http://localhost:4000/discussions/get-discussion-page', {
        params: {
          id: discussion_id,

        }
      })
        .then((response) => {
          this.setState({ discussion: response.data.discussion,
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

    render() {

      if(this.state.isLoading){
        return (
          <div>
            <SkeletonDiscussionPost/>
          </div>
        )
      } else{
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
              <ProfilePicture className="prof-pic-discussion"/>
              <ProfileUsername/>
          </div>
          <div className="containerPostMiddle">
            <div className="forum-container">
              <div className="containerPostMobileUser">
                <ProfilePic/>
                <Username/>
              </div>
              <h1>{this.state.discussion.title}</h1>
              <Badge variant="secondary">{this.state.discussion.society}</Badge>

              <p>{this.state.discussion.content}</p>
              <big className="text-muted">{moment(this.state.discussion.time).format("H:mma - MMM Do, YYYY.")}</big><br/><br/>

                {/* Discussion Post interaction options */}
                <a href={"/u/?id=" + this.state.discussion.user._id}><span className="voting-btn"><button className="standard-option-btn-post" >{this.state.discussion.user}</button></span></a>
                <span className="voting-btn"><button className="standard-option-btn-post-hearts"><BsHeart size={22} /> {this.state.comments.length} Hearts</button></span>
                {/* <span className="voting-btn"><button className="standard-option-btn-post"><BiDownvote  size={20} /> </button></span> */}
                <Dropdown >
                  <Dropdown.Toggle  id="dropdown-basic" className="standard-option-btn-post">
                    <FaShare/> Share
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Copy Link</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <hr/>
                
            <div className="comment-container">
              {/* <hr/>  
                <Form>
                  <input            
                    className="commentBox"
                    label="Comment"
                    style={{ margin: 1, fontSize: 20, maxLength:150, paddingBottom:10}}         
                    placeholder="Add a comment..."         
                    required
                  />
                    <button className="standard-button">Post Comment</button>
                </Form>    */}
          </div>
          <div className="comment-container">
          
          <h4>Responses ({this.state.comments.length})</h4>

          <br/><Accordion className="comment-box-acc">
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="motto">What are your thoughts?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <textarea placeholder="Write your response ..." className="Comment-input" rows = "5" cols = "60"/>
            
            </AccordionDetails>
            <button className="standard-button">Respond</button>
          </Accordion><br/>
          
          {/* <br/><Accordion defaultActiveKey="0">
            <Card className="comment-box-acc">
              <Card.Header className="comment-box-acc">
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  What are your thoughts?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <input>Comment your response!</input>
              </Accordion.Collapse>
            </Card>
          </Accordion><br/> */}

            <div className="users-comment">
              <a className="user-profile-shortlink">Test<b className="user-score-post">123</b></a>
                 <p>hello</p>  
            </div><hr/>
                                           
          </div>
        </div>   
          </div>

          {/* Comment Section of Discussion Post */}
          

       
        </>
      );
    }
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
  
