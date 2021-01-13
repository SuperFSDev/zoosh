import React from 'react';
import '../../assets/App.css';
import '../../Media.css';

import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import FeedOptions from '../Lists/FeedOptions'
import QuickOptions from '../Common/QuickOptions'
import { Card, Form, Dropdown , Image} from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { CgComment } from 'react-icons/cg'
import { Helmet } from 'react-helmet'
import {BiSend,BiUpvote,BiDownvote} from 'react-icons/bi'
import cogoToast from 'cogo-toast'
import {BsThreeDots} from 'react-icons/bs'
import {MdInsertLink,MdReport} from 'react-icons/md'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import {FaShare} from 'react-icons/fa'
import QuickCreate from '../Common/QuickCreate'
import {AiOutlineLink} from 'react-icons/ai'
import {BsLightning,BsHeart,BsGem,BsChatQuote} from 'react-icons/bs'
import SkeletonFeed from '../Common/SkeletonUI/SkeletonFeed'

var comment;

class Feed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      isLoading: true,
      posts: [],
      score: [],
      comments:[],
      following:[],
      FollowingID:'',
      comment:'',
      comments:[],
      time: new Date().getTime(),
    };
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    async componentDidMount() {
      document.body.style.backgroundColor = "#f0f2f5";

      var user = JSON.parse(localStorage.getItem('user'));
      this.setState({ id: user._id });
  
      await axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user._id,
        }
      })
        .then((response) => {
          this.setState({
            FollowingID: response.data.user.following,
            score: response.data.user.score,  
            pic: response.data.user.pic,  
            following: response.data.user.following,

          })
  
        })
        .catch((error) => {
          console.log(error);
        });

        axios.get('http://localhost:4000/comments/getComments')
        .then((response) => {
          this.setState({ comments: response.data.comments })
        })
        .catch((error) => {
          console.log(error);
        });
    
  
  
        for (var i = 0; i < this.state.FollowingID.length; i++) {
          this.GetFollowedUser(this.state.FollowingID[i])
        } 
       
      }
  
      async GetFollowedUser(FollowingID){
      await axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id:FollowingID,
        }
      })
        .then((response) => {
          this.setState({
            posts: this.state.posts.concat(response.data.user.posts),
            isLoading: false,
          })
  
        })
        .catch((error) => {
          console.log(error);
        });
    }

    onChangeComment=(e)=> {

      comment = [this.state.comment]
      comment = e.target.value
    
      this.setState({
          comment: e.target.comment
          
      });
      console.log(comment)
     
  }
   

  onSubmit(id) {
 
  var user = JSON.parse(localStorage.getItem('user'));  
    const newComment = {
      user_id: user._id,
      post_id:id,
      user: user.fullname,
      comment: comment,
      time: new Date().getTime(),
  }
 axios.post('http://localhost:4000/comments/addComment', newComment)
    .then(response =>{
      this.setState({
      user: '',
      post: '',
      comment:'',
      post_id:'',
      time: new Date().getTime(),
      category: '',
      tags:[]
    });
    cogoToast.success("Reply was sent!");
    // alert(JSON.stringify(newComment));
    })
    .catch(err => cogoToast.error("Reply failed.")); 

    }


    // Render hide/show comment section
    hideShow() {
      var x = document.getElementById("post-interactions");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }

      // Render hide/show comment section
      CheckPost(id,post_id) {
        var user = JSON.parse(localStorage.getItem('user'));
      if(id == user._id){
        return(<div>
          <button onClick={() => {this.onDeletePost(id,post_id)}}>Delete comment</button>
        </div>)
      }
      }


      onDeletePost(id,post_id) {

        const deletedPost = {
          id: id,
          Post_id:post_id      
      }
        alert(post_id);
        axios.post('http://localhost:4000/users/deletePost',deletedPost)
         .then().catch();
       }


render(){
  
  /** 
   * If statement that return the container asking the user to follow someone to display content on their feed,
   * This also does not display the SkeletonUI loading screen.
   *  */ 
  if(this.state.following.length<=0){
    return(
      <>
      <div className="containerFeedLeft"><FeedOptions/></div>

      <div className="containerFeedMiddle">
      <QuickOptions/>
      <div className="post-option-btns">
        <div className="options-container">
          <button className="community-btn-active" href="/home">Following</button>
          <a href="/discussions"><button className="community-btn">Discussions</button></a>
        </div>        
      </div>
      <div className="empty-feed-container">
        <p>It's pretty quiet in here ...</p> 

        <p>Start following someone! <a href="/users" id="dropdown-basic">Find Friends</a></p>
      </div>
        
      </div>
      <div className="containerFeedRight"><Recommended/><Contributors/></div>
      </>
    )
  }
  /**
   * If the following length is greater than 0, trigger the isLoading SkeletonUI as the server is 
   * sending back the feed posts.
   */
  else if(this.state.isLoading && this.state.following.length>=1){
    return (
      <div>
        <SkeletonFeed/>  
      </div>
    )
  }else{
  return (
     <div>
         {/* REACTJS HELMET */}
         <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Home - Website</title>

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
            <div className="options-container">
                      <button className="community-btn-active" href="/home">Following</button>
                      <a href="/discussions"><button className="community-btn">Discussions</button></a>
                      {/* <button className="community-btn">Media</button> */}
                      {/* <button className="community-btn">Links</button> */}
            </div>        
          </div>

          <div className="discussion-feed">
            {/* POST TAB */}
              {this.state.posts.sort((a, b) => b.time - a.time).map((post,index) => (  // sorts the posts by the time posted
                    <div>
                   
                      <div className='feedPost'>

                        <div>
                          <div className="fontPost">
                            {post.post} <br /><br/>
                            
                            <span className="username-wrapper">
                              <span className="voting-btn"><small className="text-muted">{moment(post.time).format("MMM Do")} ({moment(post.time).startOf('hour').fromNow()})</small></span><br/>
                            </span><br />

                            {/* <div className="-user-tag">
                              {post.tags.map(tag => (
                                <div key={tag.value} className="-user-tag">
                                  <a href="/profile"><Image className="tag-img" src={Tag} />{tag.label}</a>
                                </div>
                              ))}
                            </div> */}
                          </div>
                          <div>
                            <div>

                              <a href={"/u/?id=" + post.user_id}><span className="voting-btn"><button className="standard-option-btn-post" ><Image src={post.user.pic} className="user-image-mini" roundedCircle />{post.user} <b className="user-score-post-tag">1,231</b></button></span></a>
                              <span className="voting-btn"><button className="standard-option-btn-post-hearts"><BsHeart size={22} /> {this.state.comments.length} Hearts</button></span>
                              {/* <span className="voting-btn"><button className="standard-option-btn-post"><BiDownvote size={22} /> </button></span> */}
                              <a href={"/p/?id=" + post.Post_id} >
                                <span className="voting-btn">
                                  <button className="standard-option-btn-post" ><BsChatQuote size={20} /> {this.state.comments.length} Responses</button> 
                                </span></a>
                                  <Dropdown >
                                    <Dropdown.Toggle  id="dropdown-basic" className="standard-option-btn-post">
                                      <FaShare/> Share
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#/action-1"><AiOutlineLink/> Copy URL</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown><br/><br/>
                                
                              {/* <PostLinks /> */}
                              {/* <div className='post-interactions'>
                                  {this.state.comments.filter(comment => comment.post_id === post.Post_id).map(comment => (                                
                                <div>      
                                    <a href={"/u/?id=" + comment.user_id} className="user-profile-shortlink">{comment.user} <big className="text-muted"> {moment(comment.time).format("H:mma - MMM Do, YYYY.")}</big></a>
                                    <p>{comment.comment}</p>                               
                                </div>       
                                  ))}
                             </div> */}
                              {/* <Form>
                                <input            
                                  className="commentBox"
                                  label="Comment"
                                  style={{ margin: 1, fontSize: 20, maxLength:150, paddingBottom:10}}         
                                  placeholder="Add a comment..."         
                                  required
                                  value={this.state.comment}
                                  onChange={this.onChangeComment}
                                  />
                                  <button className="standard-option-btn" onClick={() => {this.onSubmit(post.Post_id)}} ><BiSend size={25}/></button>
                              </Form>                           */}
                            </div>
                          </div>
                         
                        </div>
                        {this.CheckPost(post.user_id,post.Post_id)}
                      </div>
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

export default Feed;


// Post link dropdowns for copy and report functions
function PostLinks() {

  const [open, setOpen] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);


  const handleClickCopy = () => {
    setOpen(true);
  };

  const handleCloseCopy = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClickReport = () => {
      setOpenReport(true);
    };
  
    const handleCloseReport = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenReport(false);
    };



return (
  <>
  {/* Dropdown URL links */}
   {/* <div class="dropdown2">
      <a className="dropdown2" href="#"><BsThreeDots  size={20}/></a>
      <div class="dropdown-content2">
          <a href="#" onClick={handleClickCopy}><MdInsertLink size={20} /> Copy Post</a>
          <a href="#" onClick={handleClickReport}><MdReport className="report-icon" size={20}/> Report Post</a>
      </div>
  </div>  */}

  <Dropdown className="dropdown2">
    <Dropdown.Toggle variant="secondary">
      <BsThreeDots  size={20}/>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1" onClick={handleClickCopy}><MdInsertLink size={20} /> Copy Post</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={handleClickReport}><MdReport className="report-icon" size={20}/> Report Post</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleCloseCopy}
      message="Copied Post to clipboard!"
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseCopy}>
          </IconButton>
        </React.Fragment>
      }
    />

  <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={openReport}
      autoHideDuration={6000}
      onClose={handleCloseReport}
      message="Post has been Reported"
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseReport}>
          </IconButton>
        </React.Fragment>
      }
    />
      
  </>
);
}