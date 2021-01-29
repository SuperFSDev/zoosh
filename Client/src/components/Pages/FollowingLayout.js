import React , {Fragment} from 'react';
import '../../assets/Layout.css';
import '../../assets/App.css';
import '../../Media.css';

import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import {  Image, Row, Col, Container} from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { Helmet } from 'react-helmet'
import cogoToast from 'cogo-toast'
import {BsBrightnessLow,BsChat} from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton';
import UsersCommunities from '../Lists/UsersCommunities';
import SearchbarFilter from '../Common/SearchbarFilter'
import {BiPlanet} from 'react-icons/bi'

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
          socs:[],
          posts:[],
          time: new Date().getTime(),
        };
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
  console.log(this.state.posts);
  const discussionList = this.state.posts.reverse().map(discussion => {
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
              {this.state.isLoading &&  <Skeleton height={200} width={700} style={{marginBottom:10}} count={5}/>}
              {!this.state.isLoading &&  <div>{discussionList}</div>}
          </Col>

          <Col><Recommended/><Contributors/></Col>
        </Row>
      </Container>
  );
  }
 }
