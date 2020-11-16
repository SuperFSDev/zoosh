import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import Post from '../Common/CreateDiscussion'
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import PostList from '../Lists/PostList'
import FeedOptions from '../Lists/FeedOptions'

class Feed extends React.Component {

render(){
  return (
     <div>
      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
        <Post/>
        <PostList/>
      </div>

      <div className="containerFeedRight">
        <Recommended/>  
        <Contributors/>  
      </div>
  </div>
  );
}
}


export default Feed;