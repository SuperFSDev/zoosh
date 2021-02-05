import React from 'react';
import '../../assets/App.css';
import { Image, Card } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { RiChat1Line, RiDeleteBinLine } from 'react-icons/ri'
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
        <button className="standard-button-cancel" onClick={() => { this.onDeletePost(id, discussion_id) }}>Delete post</button>
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
      <div>

        {this.state.posts.map(post => (
          <div key={this.state.user._id}>
            <a href={"/d/?id=" + post._id} className="miniprofile-post-redirect"> 
            <div  className='discussion-post'>
              <div class="one">
                <div class="two">
                  <h2>{post.title}</h2>
                  <p>{post.content.slice(0,100)}</p>
                  <span style={{ color: 'gray', fontSize: 10 }}>({moment(post.time).startOf('seconds').fromNow()})</span><br/>
                  <a href={"/d/?id=" + post._id}><button className="reaction-button" size="small" color="primary">
                    {post.likes === 0 && <span> <Image src={Clap} size={20} alt="" /> Be the first</span>}
                    {post.likes === 1 && <span> <Image src={Clap} size={20} alt="" /> {post.likes} reaction</span>}
                    {post.likes > 1 && <span> <Image src={Clap} size={20} alt="" /> {post.likes} reactions</span>}
                  </button></a>


                  <a href={"/d/?id=" + post._id}><button className="reaction-button" size="small" color="primary">
                    <RiChat1Line size={20} />
                    {post.comments.length === 0 && <span> Add comment</span>}
                    {post.comments.length === 1 && <span> {post.comments.length} comment</span>}
                    {post.comments.length > 1 && <span> {post.comments.length} comments</span>}

                  </button></a>
                </div>
                <div class="two">
                    {post.thumbnail_pic == null && <div></div>}
                    {post.thumbnail_pic && <Image alt="" className="post-image" src={post.thumbnail_pic} width={200} height={125} />}
                </div>
              </div>
            </div></a>
          </div>
          
        ))}
      </div>
    );
  }
}