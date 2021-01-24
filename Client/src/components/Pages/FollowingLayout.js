import React from 'react';
import '../../assets/Layout.css';
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
import UsersCommunities from '../Lists/UsersCommunities';

var comment;

export default class Feed extends React.Component {

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
          // document.body.style.backgroundColor = "#FDFEFE";
    
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
                        <span style={{color:'green'}}><b> General</b></span>
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
            </span>
                
          </div><hr/>
        </div>
    )})
  return (
        <div class="row">
            <div className="column" style={{background:'white'}}>
                <div style={{marginTop:100, marginLeft:330}}>
                    <div className="options-container">
                        <a href="/posts"><button className="community-btn">All</button></a>
                        <a href="/following"><button className="community-btn-active">Following</button></a>
                        <a href="/home"><button className="community-btn">Questions</button></a>
                        <a href="/events"><button className="community-btn">Events</button></a>
                        <a href="/listings"><button className="community-btn">Listings</button></a>


                    </div>
                    <UsersCommunities/>
                    <p>{postList}</p>
                </div>
            </div>

            <div className="column2" style={{background:'white'}}>
                <div  style={{marginTop:100, width:430, marginLeft:10}}>
                    <div>
                        <Recommended/>  
                        <Contributors/>
                  </div>
                </div>
            </div>
        </div>
  );
  }
 }
