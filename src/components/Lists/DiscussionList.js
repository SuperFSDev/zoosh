import React from 'react';
import '../../App.css';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

class DiscussionList extends React.Component {

  componentDidMount() {
    axios.get('http://localhost:4000/discussions/getDiscussions')
      .then((response) => {
        this.setState({ discussions: response.data.discussions })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      toggle: false
    };
  }

  render() {
    var { discussions } = this.state;

    return (
      <div className="global-feed">
        <h1>Forums</h1>
        {/* DISCUSSION TAB */}
        {discussions.reverse().map(discussion => (
          <div key={discussion._id}>
            <a href={"/f/?id=" + discussion._id} className="discussion-post-redirect"><div className='discussion-post'>
              <div>
                <h1 className="forum-title">{discussion.title}</h1>
                <span className="username-wrapper"><a href="/me">{discussion.user} <b className="user-score-post-tag">1,231</b></a></span><hr />
                <big className="text-muted-society">#{discussion._id}</big>
                <p>{moment(discussion.time).format("H:mma - MMM Do, YYYY.")}</p>
              </div>
            </div></a><br/>
          </div>
        ))}
      </div>
    );
  }
}


export default DiscussionList;