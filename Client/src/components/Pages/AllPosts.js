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
import UsersCommunities from '../Lists/UsersCommunities';
import {BiPlanet} from 'react-icons/bi'
import SearchbarFilter from '../Common/SearchbarFilter'
import { json } from 'body-parser';

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
      user:'',
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#FDFEFE";
  
    this.getUserDetails();
    this.getDiscussions();
    this.onDeletePost = this.onDeletePost.bind(this);

    // Fetch discussions every 1 second
    // this.timer = setInterval(() => this.getDiscussions(), 1000);
  }

  // Fetching the users Details
  async getUserDetails(){
    var user_id = new URLSearchParams(this.props.location.search).get("id");

    axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
        }
      })
  
        .then((response) => {
          this.setState({ user: response.data.user,
                          forums: response.data.user.forums,
                          socs:response.data.user.societies,
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
      <button onClick={() => {this.onDeletePost(id,discussion_id)}}>Delete post</button>
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



render(){
  var { discussions } = this.state;
  var user = JSON.parse(localStorage.getItem('user'));
  var size = 5;

  const discussionList = discussions.reverse().map(discussion => {
    return(

      <Fragment key={discussion._id}>
            <div className='discussion-post'>
              <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect">
              <Fragment>
                <p>
                  <a href={"/me"} className="post-link-a"><span className="voting-btn">
                    <b>{discussion.user}</b>  

                    {discussion.society == null ? (
                        <span> posted in <b style={{color:'green'}}>General</b></span>
                    ) : (
                      <span> posted in <b style={{color:'green'}}>{discussion.society}</b></span>
                    )}
                  </span></a><br/>
                  <span className="forum-title">{discussion.title.slice(0,35)}</span>
                  {discussion.picture == null ? (
                    <Fragment></Fragment>
                  ) : (
                    <Image className="post-image" src={discussion.picture} width={125} height={125}/>
                  )}<br/>
                  <span className="post-content" style={{marginLeft:10}}>{discussion.caption}</span>
                  <small  className="text-muted">
                    <br/>
                    <span style={{marginLeft:10}}>({moment(discussion.time).startOf('seconds').fromNow()})</span>

                    <button className="standard-option-btn-post"  style={{marginLeft:10}}><BsChat size={22} /> {discussion.comments.length}</button>
                    <button className="standard-option-btn-post"  style={{marginLeft:10}}><BsThreeDots size={22} /></button>

                    {this.CheckPost(discussion.user_id,discussion._id)}
                  </small>
                </p>
              </Fragment></a>
            </div>
          </Fragment>
      )})
 
  return (
    <Container>
      <Row>
        <Col>
          <div className="filter-options">
            <a href="/home"><button>Following</button></a>
            <a href="/trending"><button>Trending</button></a>
          </div>
          {this.state.isLoading &&  <Skeleton height={200} width={700} style={{marginBottom:10}} count={5}/>}
          {!this.state.isLoading &&  <div>{discussionList}</div>}
        </Col>

        <Col><Recommended/><Contributors/></Col>
      </Row>
    </Container>
  );
}
}