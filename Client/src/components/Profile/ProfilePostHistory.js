import React from 'react';
import '../../assets/App.css';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'


export default class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      posts: []
    };
  }

  componentDidMount() {
    var user_id = new URLSearchParams(document.location.search).get("id");
    axios.get('http://localhost:4000/discussions/get-following-discussions', {
      params: {
        id: user_id
      }
    })
      .then((response) => {
        this.setState({
          posts: this.state.posts.concat(response.data.discussion)
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

    console.log(this.state.posts);
    return (
      <div>

        {this.state.posts.map(post => (
          <div key={this.state.user._id}>
            <Card className='discussion-post'>
              <Card.Body>
                <Card.Text className="fontPost">
                  <a href={"/d/?id=" + post._id} style={{ textDecoration: 'none' }}>
                    <p>
                      <span className="title-post" style={{ color: 'black' }}>{post.title}</span><br />
                      <small style={{ color: 'gray', fontSize: 10 }}>{moment(post.time).format(" MMM Do")} ({moment(post.time).startOf('seconds').fromNow()})</small><br />
                      {post.society == null ? (
                        <span className="post-link-a" >Posted in<b style={{ color: 'green' }}> General</b><br /></span>
                      ) : (
                          <span className="post-link-a">Posted in <b style={{ color: 'green' }}>{post.society}</b><br /></span>
                        )}
                    </p><hr />
                  </a>
                  {this.CheckPost(post.user_id, post._id)}
                </Card.Text>
              </Card.Body>
              {/* <h1></h1> */}
            </Card>
          </div>
        ))}
      </div>
    );
  }
}