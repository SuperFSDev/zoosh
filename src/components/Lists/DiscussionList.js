import React from 'react';
import '../../App.css';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

class DiscussionList extends React.Component {

componentDidMount() {
  axios.get('http://localhost:4000/users/getUsers')
  .then((response)=>{
      this.setState({users: response.data.users})
  })
  .catch((error)=>{
      console.log(error);
  });


  axios.get('http://localhost:4000/discussions/getDiscussions')
  .then((response)=>{
      this.setState({discussions: response.data.discussions})
  })
  .catch((error)=>{
      console.log(error);
  });
}

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      discussions: [],
      toggle:false
    };

  } 

render(){
  var{discussions} = this.state;

  return (
     <div>
        {/* DISCUSSION TAB */}
          {discussions.reverse().map(discussion=>  (
            <div key={discussion._id}>    
              <a href="/forum-post" className="discussion-post-redirect"><div className='discussion-post'>
                  <div>
                      <h1>{discussion.title}</h1>
                      <span className="username-wrapper"><a href="/profile">{discussion.user} <b className="user-score-post-tag">1,231</b></a></span><hr/>
                      <big  className="text-muted-society">#{discussion._id}</big>
                      <p>{moment(discussion.time).format("H:mma - MMM Do, YYYY.")}</p>
                  </div>
              </div></a>
              
      <br></br>
      <br></br>
        </div>
      ))}
  </div>

   );
}
}


export default DiscussionList;