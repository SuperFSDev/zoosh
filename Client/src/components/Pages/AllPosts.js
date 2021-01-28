import React , {Fragment} from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import {Tooltip,OverlayTrigger, Image} from 'react-bootstrap'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {Helmet} from 'react-helmet'
import {BsBookmark,BsBookmarkFill} from 'react-icons/bs'
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton';
import {BsBrightnessLow,BsChat} from 'react-icons/bs'
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

        <div key={discussion._id}>
          <div className='discussion-post'>
            <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect">
              <p>
                <a href={"u/?id=" + user._id} className="post-link-a"><span className="voting-btn">
                  <b>{discussion.user}</b>  

                  {discussion.society == null ? (
                      <span> posted in <b style={{color:'green'}}>General</b></span>
                  ) : (
                    <span> posted in <b style={{color:'green'}}>{discussion.society}</b></span>
                  )}
                </span></a><br/>
                <span className="forum-title">{discussion.title.slice(0,35)}</span>
                {discussion.picture == null ? (
                  <div></div>
                ) : (
                  <img className="post-image" src={discussion.picture} width={125} height={125}/>
                )}
                <br/>
                <span className="post-content" style={{marginLeft:10}}>{discussion.caption}</span>
                <small  className="text-muted">
                  <br/>
                  <span style={{marginLeft:10}}>({moment(discussion.time).startOf('seconds').fromNow()})</span>

                  <button className="standard-option-btn-post"  style={{marginLeft:10}}><BsChat size={22} /> {discussion.comments.length}</button>
                  {!this.state.isSaved ? (
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Save</Tooltip>}>
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={() =>this.addToReadingList(discussion,user._id)}><BsBookmark size={22} /></button></span>
                  </OverlayTrigger> 
                  ) : (
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Unsave</Tooltip>}>
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.removeSaved(discussion)}><BsBookmarkFill size={22} /></button></span>
                  </OverlayTrigger>
                  )}
                </small>
              </p>
              {this.CheckPost(discussion.user_id,discussion._id)}
            </a>
          </div>
          
        </div>
      )})

  return (
    <Fragment class="row">
    <div className="column" style={{background:'white'}}>
        <div className="feed-container">
            <div className="options-container">
                <a href="/home"><button className="community-btn">Best</button></a>
                <a href="/trending"><button className="community-btn-active">Trending</button></a>
                <a href="/questions"><button className="community-btn">Questions</button></a>
                <a href="/events"><button className="community-btn">Events</button></a>
                <a href="/listings"><button className="community-btn">Listings</button></a>

            </div>
            <br/>
            

            {this.state.isLoading ? ( 
                <div><br/>
                  <h3 className="-feed-item-header"><BiPlanet size={20}/> YOUR COMMUNITIES </h3>
                  <SkeletonTheme color="gray" highlightColor="#444">
                    <Skeleton circle={true} height={100} width={100} style={{marginLeft:10}} count={5}/>
                  </SkeletonTheme><br/><br/><br/>
                </div>

              ) : (
                <div>
                  <UsersCommunities/>
                </div>
              )}
            
            <h3 className="-feed-item-header"><BsBrightnessLow size={20}/> DAILY DIGEST</h3>

            {this.state.isLoading ? ( 
                <div>
                  <Skeleton height={200} width={800} style={{marginBottom:10}} count={5}/><br/>
    
                </div>

              ) : (
                <p>{discussionList}</p>
              )}
        </div>
    </div>

    <div className="column2" style={{background:'white'}}>
        <div >
            <div>

            <SearchbarFilter/>
              <Fragment>
                <Recommended/>
              </Fragment>

              <Fragment>
                <Contributors/>
              </Fragment>
            
            
            </div>
        </div>
        
    </div>

</Fragment>
  );
}
}

 // Adding a User to a society array and adding the society to the users array
