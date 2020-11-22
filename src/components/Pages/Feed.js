import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import PostList from '../Lists/PostList'
import FeedOptions from '../Lists/FeedOptions'
import QuickOptions from '../Common/QuickOptions'
import InfiniteScroll from '../Common/InfiniteScroll'

class Feed extends React.Component {

  componentDidMount() {
    // document.body.style.backgroundColor = "#FCFCFC"
}

render(){
  return (
     <div>
      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
        <QuickOptions/>
        <PostList/>
        <InfiniteScroll/>
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