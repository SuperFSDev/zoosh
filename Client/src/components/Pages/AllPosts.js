import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import {Tooltip,OverlayTrigger, Image} from 'react-bootstrap'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {Helmet} from 'react-helmet'
import Fab from '@material-ui/core/Fab';
import QuickCreate from '../Common/QuickCreate'
import {BsHeart,BsChatQuote,BsBookmark,BsBookmarkFill} from 'react-icons/bs'
import Test from '../../images/friends.jpg'
import Skeleton from 'react-loading-skeleton';
import {BsMic,BsBrightnessLow,BsPeople,BsColumnsGap,BsCalendar,BsChatSquareDots,BsBarChart,BsCardText,BsTag,BsXDiamond,BsChat,BsHouseFill} from 'react-icons/bs'
import Avatar from '@material-ui/core/Avatar';
import Clapping from '../../images/clap-hands.png'
import Clap from '../../images/clap.png'
import UsersCommunities from '../Lists/UsersCommunities';
import {BiPlanet} from 'react-icons/bi'

export default class AllPosts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      isLoading: true,
      comments:[],
      time:'',
      toggle: false,
      isSaved: false,
      socs:[],
      user:'',
    };
  }

  componentDidMount() {
    // document.body.style.backgroundColor = "#FDFEFE";

    var user_id = new URLSearchParams(this.props.location.search).get("id");
  
  
    axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
        }
      })
  
        .then((response) => {
          this.setState({ user: response.data.user,
                          forums: response.data.user.forums,
                          socs:response.data.user.societies

  
          })
        })
        .catch((error) => {
          console.log(error);
        });

    axios.get('http://localhost:4000/discussions/getDiscussions')
      .then((response) => {
        this.setState({ discussions: response.data.discussions,
          isLoading: false, })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addtoSaved = (discussion) =>{
    // this.setState({ 
    //   isSaved: true,
      addToReadingList(discussion);
    // })
  }

  removeSaved = () =>{
    this.setState({ 
      isSaved: false,
    })
  }


render(){
  var { discussions } = this.state;
  var user = JSON.parse(localStorage.getItem('user'));

  const string =  "In an age when nature and magic rule the world, there is an extraordinary legend: the story of a warrior who communicates with animals, who fights sorcery and the unnatural.";
  string.slice(0, 2)

  const discussionList = discussions.reverse().map(discussion => {
    return(

        <div key={discussion._id}>
          <div className='discussion-post'>
            <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect">
            <div>
              <p>
                <a href={"/me"} className="post-link-a"><span className="voting-btn">
                  <b>{discussion.user}</b>  

                  {discussion.society == null ? (
                      <span> posted in <b style={{color:'green'}}>General</b></span>
                  ) : (
                    <span> posted in <b style={{color:'green'}}>{discussion.society}</b></span>
                  )}
                </span></a><br/>
                <span className="forum-title">{discussion.title.slice(0,35)}</span><Image className="post-image" src={Test} width={150}/><br/>
                <span className="post-content" style={{marginLeft:10}}>{discussion.caption}</span>
                <small  className="text-muted">
                  <br/>
                  <span style={{marginLeft:10}}>({moment(discussion.time).startOf('seconds').fromNow()})</span>

                  <button className="standard-option-btn-post"  style={{marginLeft:10}}><BsChat size={22} /> {discussion.comments.length}</button>
                  {!this.state.isSaved ? (
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Save</Tooltip>}>
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.addtoSaved}><BsBookmark size={22} /></button></span>
                  </OverlayTrigger> 
                  ) : (
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Unsave</Tooltip>}>
                    <span className="voting-btn"><button className="standard-option-btn-post" onClick={this.removeSaved}><BsBookmarkFill size={22} /></button></span>
                  </OverlayTrigger>
                  )}
                </small>
              </p>
            </div></a>
          </div>
        </div>
      )})

  return (
    <div class="row">
    <div className="column" style={{background:'white'}}>
        <div style={{marginTop:100, marginLeft:330 }}>
            <div className="options-container">
                <a href="/home"><button className="community-btn-active">All</button></a>
                <a href="/following"><button className="community-btn">Following</button></a>
                <a href="/home"><button className="community-btn">Questions</button></a>
                <a href="/events"><button className="community-btn">Events</button></a>
                <a href="/listings"><button className="community-btn">Listings</button></a>

            </div>

            {this.state.isLoading ? ( 
                <div><br/>
                  <h5 className="-feed-item-header"><BiPlanet size={20}/> YOUR COMMUNITIES</h5>
                  <Skeleton circle={true} height={100} width={100} style={{marginLeft:10}} count={7}/><br/><br/><br/>
                </div>

              ) : (
                <div>
                  <UsersCommunities/>
                </div>
              )}
            
            <h5 className="-feed-item-header"><BsBrightnessLow size={20}/> DAILY DIGEST</h5>

            {this.state.isLoading ? ( 
                <div>
                  <Skeleton height={200} style={{marginBottom:10}} count={5}/><br/>
    
                </div>

              ) : (
                <p>{discussionList}</p>
              )}
        </div>
    </div>

    <div className="column2" style={{background:'white'}}>
        <div  style={{marginTop:100, width:430, marginLeft:10}}>
            <div>
            {this.state.isLoading ? ( 
                <div>
                  <Skeleton height={300} style={{marginBottom:10}} count={1}/><br/>
                </div>

              ) : (
                <Recommended/>
              )}

            {this.state.isLoading ? ( 
                <div>
                  <Skeleton height={300} style={{marginTop:50}} count={1}/><br/>
                </div>

              ) : (
                <Contributors/> 
              )}
            </div>
        </div>
        
    </div>

</div>
  );
}
}

 // Adding a User to a society array and adding the society to the users array
 async function addToReadingList(discussion) {
  
  const addDiscussion = {
      discussion: discussion._id,
  }

  // Adds society to societies array in user model.
  await axios.post('http://localhost:4000/users/addToReadingList', addDiscussion)
      .then(function (resp) {
          console.log(resp);
      })
      .catch(function (error) {
          console.log(error);
      })
}