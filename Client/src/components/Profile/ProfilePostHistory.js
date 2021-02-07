import React from 'react';
import '../../assets/App.css';
import { Image, Card } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { RiChat1Line, RiDeleteBinLine } from 'react-icons/ri'
import {BsTrash, BsGem} from 'react-icons/bs'
import Clap from '../../images/clap.png'

export default class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      posts: []
    };
  }

  async componentDidMount() {
    var user_id = new URLSearchParams(document.location.search).get("id");
    if(user_id == null)
    {
      var user = JSON.parse(localStorage.getItem('user'));
      user_id = user._id;
    }

    await axios.get('http://localhost:4000/discussions/get-user-discussions', {
      params: {
        id: user_id,
        fields: 'user society time thumbnail_pic title content likes comments user_id',
        sort: 'likes'
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({
          posts: this.state.posts.concat(response.data.discussions)
        })

      })
      .catch((error) => {
        console.log(error);
      });

  }

  CheckPost(id, discussion_id) {
    var user = JSON.parse(localStorage.getItem('user'));
    if (id === user._id) {
      return (<div>
        <button className="reaction-button" onClick={() => { this.onDeletePost(id, discussion_id) }}><BsTrash size={17}/></button>
      </div>)
    }
  }
  onDeletePost(id, discussion_id) {
    axios.delete('http://localhost:4000/discussions/getDiscussions' + discussion_id) //deletes a discussion by ID
      .then()
      .catch();

    const RemovedDiscussion = {
      discussion_id: discussion_id
    }
    axios.post('http://localhost:4000/users/removeFromReadingList', RemovedDiscussion)
      .then().catch();
    window.location.reload(); //refreshes page automatically 

  }

  render() {

    console.log("==============");
    console.log(this.state.posts);
    console.log("==============");
    return (
      <div className="PostLayout">

        {this.state.posts.map(post => (
          <div key={this.state.user._id}>
        <a href={"/d/?id=" + post._id} className="miniprofile-post-redirect"><div class="card">
          <Image src={post.thumbnail_pic} className="post-img"/>
          <div class="container">
            <h3><b>{post.title}</b></h3> 
            <p className="nowrap"> <Image alt="" className="profile-btn-wrapper-left" src={post.user_pic}  roundedCircle /><b> @{post.user}</b></p> 
            <span>Posted in <b style={{ color: 'green' }}>
            {post.society == null ? (
              <span> in <b style={{ color: 'green' }}>General</b></span>
               ) : (
              <span> in <b style={{ color: 'green' }}>{post.society}</b></span>
              )}<br />
              </b></span><br/>
            <span style={{ color: 'gray', fontSize: 10 }}>({moment(post.time).startOf('seconds').fromNow()})</span><br/>
            <a href={"/d/?id=" + post._id}><button className="reaction-button" size="small" color="primary">
                  {post.likes === 0 && <span> <BsGem size={20} alt="" /> Be the first</span>}
                  {post.likes === 1 && <span> <BsGem size={20} alt="" /> {post.likes}</span>}
                  {post.likes > 1 && <span> <BsGem size={20} alt="" /> {post.likes}</span>}
                </button></a>


                <a href={"/d/?id=" + post._id}><button className="reaction-button" size="small" color="primary">
                  <RiChat1Line size={20} />
                  {post.comments.length === 0 && <span> Add comment</span>}
                  {post.comments.length === 1 && <span> {post.comments.length}</span>}
                  {post.comments.length > 1 && <span> {post.comments.length}</span>}
                </button></a>
          </div>
        </div></a><br/>
            </div>
          
        ))}
      </div>
    );
  }
}