import React, { useRef } from 'react';
import '../../../assets/App.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {  OverlayTrigger,Tooltip, Row, Col, Container } from 'react-bootstrap';
import moment from 'moment'
import { Image, Card, Button} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import {BsChat,BsBookmark,BsBookmarkFill,BsThreeDots} from 'react-icons/bs'
import Clapping from '../../../images/clap-hands.png'
import Clap from '../../../images/clap.png'
import {RiShieldStarLine} from 'react-icons/ri'
import ShowMoreText from 'react-show-more-text';
import ReadMore from '../../Common/ReadMore'
import cogoToast from 'cogo-toast'

export default class DiscussionPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: '',
      discussions: [],
      likedPosts:[],
      discussion_id:'',
      comments:[],
      societies: [],
      isLoading:true,
      hearts: 0,
      views:0,
      isSaved: false,
      comment:'',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
  }

    componentDidMount() {
      this.state.discussion_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#F7F7F7";
      this.getUserDetails();
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
    
    }
    async getUserDetails() {
      var user = JSON.parse(localStorage.getItem('user'));
      await axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user._id
        }
      })
  
        .then((response) => {
          this.setState({
            likedPosts: response.data.user.likedPosts
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }

    addPageView = () =>{

      const {views} = this.state;

      this.setState({
        views: views + 1
      })
    }

    onChangeComment(e) {
      this.setState({
        comment: e.target.value
      });
    }

    addToReadingList(discussion, user_id) {

      const addDiscussion = {
        user_id: user_id,
        discussion: discussion,
      }
      // Adds society to societies array in user model.
      axios.post('http://localhost:4000/users/addToReadingList', addDiscussion)
        .then(function (resp) {
          console.log(resp);
        })
        .catch(function (error) {
          console.log(error);
        })
        // alert("Discussion added to your reading list!")
        cogoToast.success(
          <div>
            <div>Added to your reading list!</div>
          </div>
        );
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
          window.location.reload();
    }

    RemovefromLikedPosts(discussion, user_id, likes) {

      const removeDiscussion = {
        id: user_id,
        discussion: discussion,
      }
      // Adds the discussion to liked list
      axios.post('http://localhost:4000/users/removeFromLikedPosts', removeDiscussion)
        .then(function (resp) {
          console.log(resp);
        })
        .catch(function (error) {
          console.log(error);
        })
      const UpdateLike = {
        discussion: discussion,
        likeCount: likes - 1
      }
      axios.post('http://localhost:4000/discussions/UpdateLikeCount', UpdateLike)
        .then(function (resp) {
          console.log(resp);
        })
        .catch(function (error) {
          console.log(error);
        })
        window.location.reload();
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
    


    isLiked(discussion_id, user_id, likes) {
      if (this.state.likedPosts.includes(discussion_id) == true) {
        return ( <span className="voting-btn"><button className="standard-option-btn-post" onClick={() => { this.RemovefromLikedPosts(discussion_id, user_id, likes) }}>
          <Image src={Clapping} size={30}/> {this.state.discussion.likes}</button><br/></span>
        
        )
        
      }
      else {
        return ( <span className="voting-btn"><button className="standard-option-btn-post" onClick={() => { this.addToLikedPosts(discussion_id, user_id, likes) }}>
          <Image src={Clap} size={30}/> {this.state.discussion.likes} </button></span>
        )
        
      }
    
    }

    render() {
      var user = JSON.parse(localStorage.getItem('user'));
      console.log(this.state.likedPosts);

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
                  <span>
                    <Image src={user.pic} className="user-image"/>
                    <b>{this.state.discussion.user}</b><br/>
                    <a href={"/u/?id="+this.state.discussion.user_id}><button className="standard-button">View Profile</button></a>
                  </span>
                 
                  {this.isLiked(this.state.discussion._id, user._id, this.state.discussion.likes)}
                  <br/>
                  <span className="voting-btn"><button className="standard-option-btn-post" onClick={() =>{this.addToReadingList(this.state.discussion._id,user._id)}}><BsBookmark size={30} /></button></span>
                  <br/>
                  <span className="voting-btn"><button className="standard-option-btn-post" ><RiShieldStarLine size={30}/></button></span>

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

                {/* <Image src={this.state.discussion.full_pic} className="thumbnail"/> */}
                <img src={this.state.discussion.full_pic} className="thumbnail"/>
              </p>
            
              <p className="post-content">{this.state.discussion.content}</p>


                <div className="spacing"></div>
                <span className="d-inline-block">
                
                  {/* {!this.state.isSaved ? (
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Save</Tooltip>}>
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addToSaved}><BsBookmark size={22} /></button></span>
                  </OverlayTrigger> 
                  ) : (
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Unsave</Tooltip>}>
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.removeSaved}><BsBookmarkFill size={22} /></button></span>
                  </OverlayTrigger>
                  )} */}
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
              <div className="comment-box">
                <span >
                  <Avatar src={comment.user_img}/><a href={"/u/?id=" + comment.user_id} className="post-link-a"><b>{comment.user_name} </b></a>
                  {moment(comment.time).startOf('seconds').fromNow()}
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
                  <p className="post-content">{comment.comment}</p>
                  </ShowMoreText>           
                  <span><button className="standard-option-btn-comment">
                  <Image src={Clap} size={30}/></button></span>     
                </span>
                <hr/>
              </div>
            ))}
         </div>  
         </div>
         </div>
              </Col>
              <Col md></Col>

            </Row>
          </Container>

         

    </>
    );
  }
}

  
