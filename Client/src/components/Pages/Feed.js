import React from 'react';
import '../../assets/App.css';
import '../../Media.css';

import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import FeedOptions from '../Lists/FeedOptions'
import QuickOptions from '../Common/QuickOptions'
import { Dropdown , Image} from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { Helmet } from 'react-helmet'
import cogoToast from 'cogo-toast'
import {BsThreeDots} from 'react-icons/bs'
import {MdInsertLink,MdReport} from 'react-icons/md'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import {FaShare} from 'react-icons/fa'
import QuickCreate from '../Common/QuickCreate'
import {AiOutlineLink} from 'react-icons/ai'
import {BsHeart,BsGem,BsChatQuote} from 'react-icons/bs'
import Avatar from '@material-ui/core/Avatar';
import {BsMic,BsPeople,BsColumnsGap,BsCalendar,BsChatSquareDots,BsBarChart,BsCardText,BsTag,BsXDiamond,BsChat,BsHouseFill} from 'react-icons/bs'
import Test from '../../images/friends.jpg'
import Skeleton from 'react-loading-skeleton';
import Clapping from '../../images/clap-hands.png'
import Clap from '../../images/clap.png'

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
      user: '',
      pic:'',
      claps:0,
      socs:[],
      time: new Date().getTime(),
    };
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    async componentDidMount() {
      document.body.style.backgroundColor = "#FDFEFE";

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
            following: response.data.user.following,
            socs:response.data.user.societies,
            claps: response.data.user.claps,
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
            user: response.data.user,
            claps: response.data.claps,
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
            <span onClick={() => {this.onDeletePost(id,post_id)}}>Delete Post</span>
          </div>)
        }
      }

      addClaps = () =>{
        const {claps} = this.state;
  
        this.setState({ 
          claps: claps + 1
          
        })
        console.log(claps);
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

  var user = JSON.parse(localStorage.getItem('user'));

  if(user) 
  {
      var fullname = user.fullname;
  }

  const postList = this.state.posts.sort((a, b) => b.time - a.time).map((post,index) => {
  return(  // sorts the posts by the time posted
      <div className='feedPost'>
        <div>
          <div className="fontPost">
            <p>
              <a href={"/me"} className="post-link-a"><span className="voting-btn">
                  <Image src={post.pic} className="user-image-mini" roundedCircle/> <b>{post.user}</b> posted in 
                  
                  {post.society == null ? (
                      <span><b> General</b></span>
                  ) : (
                    <span><b> {post.society}</b></span>
                  )}
                  
              </span></a><br/>
              <span className="forum-title">{post.title}</span><Image className="post-image" src={Test} width={150}/><br/>
              <small  className="text-muted">{moment(post.time).format("MMM Do")} ({moment(post.time).startOf('hour').fromNow()})</small>
            </p>
          </div>
          <span className="username-wrapper">
            <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addClaps}><Image src={Clap} size={20} className="feed-comment"/> {post.claps} claps</button></span>
              <a href={"/p/?id=" + post.Post_id}>
                <span className="voting-btn">
                  <button className="standard-option-btn-post" ><BsChat size={20} /> {this.state.comments.length} responses</button> 
                </span></a>
                  
                    {this.CheckPost(post.user_id,post.Post_id) ?  (
                    <Dropdown  className="standard-option-btn-post">
                      <Dropdown.Toggle  id="dropdown-basic">
                       Edit
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        
                        <Dropdown.Item href="/home">{this.CheckPost(post.user_id,post.Post_id)}</Dropdown.Item>
                        <Dropdown.Item>Copy URL</Dropdown.Item>

                      </Dropdown.Menu>
                    </Dropdown>
                    ): (
                      <Dropdown className="standard-option-btn-post">
                      <Dropdown.Toggle  id="dropdown-basic">
                        <FaShare/> Share
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Copy URL</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    )}
                    <br/><br/>
          </span>
              
        </div>
      </div>
  )})
  
  /** 
   * If statement that return the container asking the user to follow someone to display content on their feed,
   * This also does not display the SkeletonUI loading screen.
   *  */ 
  // if(this.state.following.length<=0){
  //   return(
  //     <>
  //     <div className="containerFeedLeft">
  //       <FeedOptions/>
  //     </div>

  //     <div className="containerFeedMiddle">
  //     <div className="post-option-btns">
  //       <div className="options-container">
  //         <button className="community-btn-active" href="/home">Following</button>
  //         <a href="/discussions"><button className="community-btn">Discussions</button></a>
  //         <a href="/discussions"><button className="community-btn">Questions</button></a>

  //       </div>        
  //     </div>
  //     <div className="empty-feed-container">
  //       <p>It's pretty quiet in here ...</p> 

  //       <p>Start following someone! <a href="/users" id="dropdown-basic">Find Friends</a></p>
  //     </div>
        
  //     </div>
  //     <div className="containerFeedRight"><Recommended/><Contributors/></div>
  //     </>
  //   )
  // }
  /**
   * If the following length is greater than 0, trigger the isLoading SkeletonUI as the server is 
   * sending back the feed posts.
   */
  // else if(this.state.isLoading && this.state.following.length>=1){
  //   return (
  //     <div>
  //       <SkeletonFeed/>  
  //     </div>
  //   )
  // }else{
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
        <div className="feed-options-container">
                  <div className="feed-options-item">
                      <a href="/me" className="feed-option-redirects-username"><div className="user-profile-container">
                          <Avatar src={user.pic} className="profile-btn-wrapper-left"/> <p className="uname-feed">{user.fullname}  
                              {user.score >= 1 && user.score <=999 ? (
                                  <span> <b className="user-member">{user.score}</b><br/></span>

                              ) : user.score >=1000 ?(
                                  <span> <b  className="user-mod">{user.score}</b><br/></span>
                              ) : user.score >= 5000 ? (
                                  <span> <b  className="user-admin">{user.score}</b><br/></span>
                              ) : (
                                  <span> <b>{user.score}</b><br/></span>
                              )}
                          </p>
                      </div></a>
                      <hr/><a href="/home" className="feed-option-redirects-active"><div className="option-container-active">
                          <BsHouseFill size={25} className="active-icon"/> <b className="feed-option-item">Home</b>
                      </div></a>
                      <a href="/communities" className="feed-option-redirects"><div className="option-container">
                          <BsXDiamond size={25}/> <b className="feed-option-item">Communities</b>
                      </div></a>
                      <a href="/users" className="feed-option-redirects"><div className="option-container">
                        <BsPeople size={25}/> <b className="feed-option-item">Users</b>
                      </div></a>
                      <hr/>
                      {/* <a href="/forums" className="feed-option-redirects"><div className="option-container">
                          <BsChatSquareDots size={25}/> <b className="feed-option-item">Forums</b>
                      </div></a> */}
                      <a href="/events" className="feed-option-redirects"><div className="option-container">
                          <BsCalendar size={25}/> <b className="feed-option-item">Events</b>
                      </div></a>
                      {/* <a href="/podcasts" className="feed-option-redirects"><div className="option-container">
                          <BsMic size={25}/> <b className="feed-option-item">Podcasts</b>
                      </div></a> */}
                      <a href="/listings" className="feed-option-redirects"><div className="option-container">
                          <BsCardText size={25}/> <b className="feed-option-item">Listings</b>
                      </div></a>
                      
                      <a href="/leaderboard" className="feed-option-redirects"><div className="option-container">
                        <Image src={Clap} size={25}/> <b className="feed-option-item">Contributors</b>
                      </div></a><hr/>
                      
                      <div className="option-container">
                          <b  className="-top-cont-header">Your Communities - {this.state.socs.length}</b>
                          {this.state.socs.map(soc=>
                                    <li><a href={"/s/?id="+soc._id}>{soc}</a></li>)}<br/>
                      </div>
                  </div>
            </div>
      </div>

      <div className="containerFeedMiddle">
          <Fab color="secondary" aria-label="add" className="fab">
          <QuickCreate/>
        </Fab>
        {/* <QuickOptions/> */}
        <div>
          <div className="post-option-btns">
            <div className="options-container">
                      <a href="/home"><button className="community-btn">All</button></a>
                      <a href="/following"><button className="community-btn-active">Following</button></a>
                      <a href="/home"><button className="community-btn">Questions</button></a>
                      {/* <a href="/home"><button className="community-btn-filter">Filter by</button></a> */}
                      
            </div>        
          </div>

          <div className="discussion-feed">
            {this.state.isLoading ? ( 
                  <div>
                    {!this.state.following.length ==0 ? (
                        <div><Skeleton height={200} duration={2}/>
                        <Skeleton height={200} duration={2}/>
                        <Skeleton height={200} duration={2}/>
                        <Skeleton height={200} duration={2}/></div>
                  
                      ) : (
                        <div>Empty</div>
                      )}
                  </div>
            
              ) :  (
                postList
              )}

          </div>
              </div>
      </div>

      <div className="containerFeedRight">
        {this.state.isLoading ? ( 
                <div>
                  <Skeleton height={350} width={300} duration={2}/>
                  <br/><br/><br/>
                  <Skeleton height={350} width={300} duration={2}/>
                </div>

              ) : (
                <div>
                  <Recommended/>  
                  <Contributors/> 
                </div>
              )}
         
      </div>
  </div>
  );
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