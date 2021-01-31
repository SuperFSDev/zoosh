import React , {Fragment} from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import {  Image, Row, Col, Container} from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { Helmet } from 'react-helmet'
import cogoToast from 'cogo-toast'
import {BsHeart,BsChat} from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {RiHeart2Line,RiChat1Line} from 'react-icons/ri'

export default class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          toggle: false,
          isLoading: true,
          discussions:[],
          score: [],
          comments:[],
          following:[],
          FollowingID:'',
          comment:'',
          comments:[],
          user: '',
          pic:'',
          claps:0,
          likes:0,
          socs:[],
          posts:[],
          likedPosts:[],
          time: new Date().getTime(),
        };
      }
    
    async componentDidMount() {
      document.body.style.backgroundColor = "#F7F7F7";

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
                likedPosts:response.data.user.likedPosts
              })
      
            })
            .catch((error) => {
              console.log(error);
            });
    
      
      
            for (var i = 0; i < this.state.FollowingID.length; i++) {
              this.GetFollowedUser(this.state.FollowingID[i])
            } 
           
          }
      
          async GetFollowedUser(FollowingID){
          await axios.get('http://localhost:4000/discussions/get-following-discussions', {
            params: {
              id:FollowingID,
            }
          })
            .then((response) => {
              this.setState({
                posts: this.state.posts.concat(response.data.discussion),
                isLoading: false,
              })
      
            })
            .catch((error) => {
              console.log(error);
            });
        }
        
    
  
    
          // Render hide/show comment section
          CheckPost(id,post_id) {
            var user = JSON.parse(localStorage.getItem('user'));
            if(id == user._id){
              return(
              <div>
                <Button size="small" color="primary" onClick={() => {this.onDeletePost(id,post_id)}}>
                  Delete Post
                </Button>
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
  let user = JSON.parse(localStorage.getItem('user'));
  let size = 5;
  const discussionList = this.state.posts.reverse().slice(0,size).map(discussion => {
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
              {/* {this.isLiked(discussion._id,user._id,discussion.likes)} */}
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
            <a href="/"><button className="feed-option-active">Following</button></a>
            <a href="/top"><button className="feed-option">Top</button></a>
            <a href="/new"><button className="feed-option-post">Create Post</button></a>

          </div>

          {this.state.isLoading &&  <Skeleton height={200} width={700} style={{marginBottom:10}} count={5}/>}
          {!this.state.isLoading &&  <div>{discussionList}</div>}
        </Col>

        <Col sm>
          <Recommended/><Contributors/>
        </Col>
        <Col sm></Col>

      </Row>
    </Container>
  );
  }
 }
