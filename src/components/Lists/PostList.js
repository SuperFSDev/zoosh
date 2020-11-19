import React from 'react';
import '../../App.css';
import { Card, Badge, Tabs,Nav,Image } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {FaRegCommentDots} from 'react-icons/fa'
import CommentReply from '../Posts/CommentReply'
import PostAvatar from '../Posts/PostAvatar'
import PostLinks from '../Posts/PostLinks'
import {FiThumbsUp,FiThumbsDown} from 'react-icons/fi'
import Tag from '../../images/mailid.png'; // gives image path

class PostList extends React.Component {

componentDidMount() {
  axios.get('http://localhost:4000/users/getUsers')
  .then((response)=>{
      this.setState({users: response.data.users
                                                })
  })
  .catch((error)=>{
      console.log(error);
  });
}

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      toggle:false
    };

  } 

  openComments(e){
      var x = document.getElementById("myDIV");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
  }

   myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


render(){
  var{users} = this.state;
  var{posts} = this.state;
  console.log(posts)
  return (
     <div className="global-feed">
       <h1>Global</h1>
        {/* POST TAB */}
          {users.map(user=>  (
            <div key={user._id}>   
              {user.posts.map(post=>  (              
<div hidden="true">
               {posts.push(post)}
             =    {/*  loop through users and add each post to an array */}
               </div>
    ))}    
        </div>
      ))}


{posts.sort((a,b)=> b.time- a.time).map(post=>  (  // sorts the posts by the time posted
  
            <div>  
              <Card className='feedPost'>
               
               <Card.Body>          
                 <div className="-u-prof-stats" id="social-user">
                     {/* <span className="avatar-wrapper-left"><a href="/profile" className="post-user-profile" target="_blank"><PostAvatar/></a></span> */}
                     <span className="username-wrapper"><a href={"/u/?id="+post.user_id}>{post.user} <b className="user-score-post-tag">1,231</b> {/*{post._id}*/}</a></span><br/>
                     <big  className="text-muted">{moment(post.time).format("H:mma - MMM Do, YYYY.")}</big>

                     {/* <ProfileURL/> */}
                 </div>
   
                 <Card.Text className="fontPost">
                  {post.post} <br/>
                  
                  <div className="-user-tag">
                  {post.tags.map(tag=>  (
                   <div key={tag.value} className="-user-tag">   
                     <a href="/profile"><Image className="tag-img" src={Tag}/>{tag.label}</a> 
                   </div>
                         ))}
                  </div>
                 </Card.Text>
                 <big  className="text-muted-society">#{post.category}</big> <Badge variant="primary">Admin</Badge> <Badge variant="secondary">Member</Badge><br></br>
                 <div className="post-interactions">
                 <div><hr/>
                     <span className="voting-btn"><FiThumbsUp id="thumb-up" size={20}/></span><span className="voting-btn"><FiThumbsDown id="thumb-down" size={20}/></span>
                     <span className="voting-btn"><FaRegCommentDots size={20} onClick={()=>{this.setState({toggle:!this.state.toggle})}} className="feed-comment"/></span><PostLinks/>

                     {
                       this.state.toggle ? <div  className="-post-reply-comment-div"><CommentReply/></div> : null
                     }
                 </div>
                 </div>
               </Card.Body>  
             </Card>
             </div>
      ))}
  </div>

   );
}
}


export default PostList;