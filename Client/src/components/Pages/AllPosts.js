import React , {Fragment} from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import { Image, Row, Col, Container} from 'react-bootstrap'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {Helmet} from 'react-helmet'
import {BsBookmark,BsBookmarkFill} from 'react-icons/bs'
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton';
import {BsBrightnessLow,BsChat, BsThreeDots} from 'react-icons/bs'
import Clapping from '../../images/clap-hands.png'
import Clap from '../../images/clap.png'
import { json } from 'body-parser';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {RiHeart2Line,RiChat1Line,RiDeleteBinLine} from 'react-icons/ri'

export default class AllPosts extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      isLoading: true,
      isLoadingUsers: true,

      comments:[],
      time:'',
      toggle: false,
      isSaved: false,
      socs:[],
      posts:[],
      likedPosts:[],
      user:'',
    };
  }

  async componentDidMount() {
    document.body.style.backgroundColor = "#F7F7F7";
  
    this.getUserDetails();
    this.getDiscussions();
    this.onDeletePost = this.onDeletePost.bind(this);

    // Fetch discussions every 1 second
    // this.timer = setInterval(() => this.getDiscussions(), 1000);
  }

  // Fetching the users Details
  async getUserDetails(){
    var user = JSON.parse(localStorage.getItem('user'));
    await axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user._id
        }
      })
  
        .then((response) => {
          this.setState({ user: response.data.user,
                          forums: response.data.user.forums,
                          socs:response.data.user.societies,
                          likedPosts:response.data.user.likedPosts
          })
        })
        .catch((error) => {
          console.log(error);
        });
  }

  // Fetching the discussions
  async getDiscussions (){
    axios.get('http://localhost:4000/discussions/getDiscussions')
    .then((response) => {
      this.setState({ 
        discussions: response.data.discussions,
        users:response.data.discussions,
        isLoading: false,
      
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  removeSaved = () =>{
    this.setState({ 
      isSaved: false,
    })
  }

 addToReadingList(discussion,user_id) {
  
    const addDiscussion = {
        user_id:user_id,
        discussion: discussion._id,
    }
    // Adds society to societies array in user model.
    axios.post('http://localhost:4000/users/addToReadingList', addDiscussion)
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function (error) {
            console.log(error);
        })
  }


   // Render hide/show comment section
   CheckPost(id,discussion_id) {
    var user = JSON.parse(localStorage.getItem('user'));
  if(id == user._id){
    return(<div>
      <button size="small" color="primary" className="reaction-button" onClick={() => {this.onDeletePost(id,discussion_id)}}>
        <RiDeleteBinLine size={20}/>Delete Post
      </button>
    </div>)
  }
  }

   isLiked(discussion_id,user_id,likes) {
      if(this.state.likedPosts.includes(discussion_id) == true){
        return(<div>
          <Button size="small" color="primary" onClick={() => {this.RemovefromLikedPosts(discussion_id,user_id,likes)}}>
                    Unlike
                  </Button>
        </div>)
      }
      else{
        return(<div>
          <Button size="small" color="primary" onClick={() => {this.addToLikedPosts(discussion_id,user_id,likes)}}>
                    like
                  </Button>
        </div>)

      }
  }


  onDeletePost(id,discussion_id) {
  axios.delete('http://localhost:4000/discussions/getDiscussions' + discussion_id) //deletes a discussion by ID
  .then()
  .catch();

  const RemovedDiscussion = {
    discussion_id:discussion_id      
}
  axios.post('http://localhost:4000/users/removeFromReadingList',RemovedDiscussion)
   .then().catch();
   window.location.reload(); //refreshes page automatically 

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
      axios.post('http://localhost:4000/discussions/UpdateLikeCount', UpdateLike)
      .then(function (resp) {
          console.log(resp);
      })
      .catch(function (error) {
          console.log(error);
      })
}


RemovefromLikedPosts(discussion,user_id,likes) {
  
  const removeDiscussion = {
      id:user_id,
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
        likeCount:likes-1
    }
      axios.post('http://localhost:4000/discussions/UpdateLikeCount', UpdateLike)
      .then(function (resp) {
          console.log(resp);
      })
      .catch(function (error) {
          console.log(error);
      })
}




render(){
  var { discussions } = this.state;
  var user = JSON.parse(localStorage.getItem('user'));
  var size = 5;

  const discussionList = discussions.reverse().slice(0, size).sort((a,b)=> b.likes - a.likes).map(discussion => {
    return(
      <Fragment  key={discussion._id}>
        <Card className='discussion-post'>
          <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><CardContent>
            <span className="voting-btn">
                <span class="showhim"><a href={"/me"} className="post-link-a"><b>{discussion.user}</b></a>
                <span class="showme"> <b>{discussion.user}</b></span></span>
                  {discussion.society == null ? (
                    <span> in <b style={{color:'green'}}>General</b></span>
                  ) : (
                    <span> in <b style={{color:'green'}}>{discussion.society}</b></span>
                  )}<br/>
                  <span style={{color:'gray', fontSize:10}}>({moment(discussion.time).startOf('seconds').fromNow()})</span>

                  {discussion.picture == null && <div></div> }  
                  {discussion.picture && <Image className="post-image" src={discussion.picture} /> } 
                </span><br/>
                <span  className="title-post">{discussion.title}</span><br/>
                <span  className="content-post">{discussion.content.slice(0,200)}</span>
          </CardContent></a>
            <CardActions>

              {this.isLiked(discussion._id,user._id,discussion.likes)}
              <a  href={"/d/?id=" + discussion._id }><button className="reaction-button" size="small" color="primary" onClick={() => {this.addToLikedPosts(discussion._id,user._id,discussion.likes)}}>
                {discussion.likes === 0 && <></>}
                {discussion.likes > 0 && <span> <RiHeart2Line size={20} /> {discussion.likes} reactions</span>}
              </button></a>

              <a  href={"/d/?id=" + discussion._id }><button className="reaction-button" size="small" color="primary">
                <RiChat1Line size={20}/> 
                {discussion.comments.length === 0 && <span> Add comment</span>}
                {discussion.comments.length === 1 && <span> {discussion.comments.length} comment</span>}
                {discussion.comments.length > 1 && <span> {discussion.comments.length} comments</span>}

              </button></a>

              {this.CheckPost(discussion.user_id,discussion._id)} 
            </CardActions>
            
          </Card> 
          
      </Fragment>
    )})

  return (
    <Container>
      <Row>
        <Col sm></Col>
        <Col sm>
          <div className="filter-options">
            <a href="/"><button className="feed-option">Following</button></a>
            <a href="/top"><button className="feed-option-active">Top</button></a>
            <a href="/new"><button className="feed-option-post">Create Post</button></a>

          </div>
          

          {this.state.isLoading &&  <div><br/><Skeleton height={200} width={700} style={{marginBottom:10}} count={5}/></div>}
          {!this.state.isLoading &&  <div>{discussionList}</div>}
        </Col>

        <Col sm><Recommended/><Contributors/></Col>
        <Col sm></Col>

      </Row>
    </Container>
  );
}
}