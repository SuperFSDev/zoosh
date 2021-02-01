import React, { useRef } from 'react';
import '../../../assets/App.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {  OverlayTrigger,Tooltip, Row, Col, Container } from 'react-bootstrap';
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
      views:0,
      isSaved: false,
      comment:'',
    };
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    componentDidMount() {
      this.state.discussion_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#F7F7F7";

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

    addPageView = () =>{

      const {views} = this.state;

      this.setState({
        views: views + 1
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

    addToLikedPosts(discussion,user_id,likes) {
  
      const addDiscussion = {
          id:user_id,
          discussion: discussion,
      }
      // Adds the discussion to liked list
      axios.post('http://localhost:4000/users/addToLikedPosts', addDiscussion)
          .then(function (resp) {
              console.log(resp);
          })
          .catch(function (error) {
              console.log(error);
          })
          const UpdateLike = {
            discussion: discussion,
            likeCount:likes+1
        }
          // alert(this.state.posts.likes);
          axios.post('http://localhost:4000/discussions/UpdateLikeCount', UpdateLike)
          .then(function (resp) {
              console.log(resp);
          })
          .catch(function (error) {
              console.log(error);
          })
          // window.location.reload(); //refreshes page automatically 
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
      let string = this.state.discussions.content;
      // string.replaceAll("Hooks","she")

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

          <Container>
            <Row>
              <Col md>
                <div className="post-reactions">
                  <Avatar src={user.pic}/>
                  {this.state.discussion.user}
                  <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addToLikedPosts}><Image src={Clap} size={30} className="feed-comment"/> {this.state.discussion.likes} </button></span>
                  <br/>
                  <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addToSaved}><BsBookmark size={30} /></button></span>
                  <br/>
                  <span><button className="standard-option-btn-post" ><RiShieldStarLine size={30}/></button></span>

                </div>

              </Col>
              <Col md>
                <div className="discussion-container">

     
              <p className="post-header">
                {this.state.discussion.title}<br/>
                <p style={{fontSize:14, color:'gray'}}>
                  <a href={"/u/?id="+this.state.discussion.user_id} style={{textDecoration:'none', color:'black'}}>
                  <span class="showhim">
                    <b>{this.state.discussion.user}</b> - {moment(this.state.discussion.time).format("MMM Do")}
                    <span class="showme"> <b>{this.state.discussion.user}</b></span>
                  </span>
                  </a>
                </p>

                <Image src={this.state.discussion.picture} className="thumbnail"/>
              </p>
            
              <p className="post-content">{this.state.discussion.content}</p>


                <div className="spacing"></div>
                
                  <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addToLikedPosts}><Image src={Clap} size={20} className="feed-comment"/> {this.state.discussion.likes} </button></span>

                    {/* <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addLikes}><Image src={Clap} size={20} className="feed-comment"/> {this.state.likes} claps</button></span> */}


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
                  
                  
                </span>
                <hr/>

          <div className="comment-container" id="responses">
          
            <h4>Responses ({this.state.comments.length})</h4>
            
            <div className="comment-box-acc">
              <Avatar src={user.pic}/><br/>
              <textarea rows={2} cols={40} className="comment-input" multiple placeholder="Leave a comment"  value={this.state.comment} onChange={this.onChangeComment}/>
              <button className="standard-button" onClick={this.onSubmit}>Publish</button>
            </div>
          
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
                                <p className="post-content">{comment.comment}</p>


                            </dl>
                  </section>
                </span>                  
                </p>
              </div>
              <ShowMoreText
                lines={1}
                more='Read more'
                less='Read less'
                onClick={this.executeOnClick}
                expanded={false}
                font={20}
                width={1000}
                height={100}
              >
              {comment.comment}
              </ShowMoreText>
              <button onClick={this.addLikes}><Image src={Clap} size={20} className="feed-comment"/> {this.state.hearts} claps</button>
            <hr/>
              </div>
            ))}
         </div>  
         </div>
         </div>
              </Col>
              <Col md>
              {/* <div className="user-card-container">
                <div className="column-head">
                  {this.state.discussion.user}
                  <br/>
                  <button>Follow</button>
                </div>
              </div> */}
            </Col>

            </Row>
          </Container>

         

    </>
    );
  }
}

  
