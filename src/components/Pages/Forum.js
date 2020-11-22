import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import DiscussionList from '../Lists/DiscussionList'
import FeedOptions from '../Lists/FeedOptions'
import QuickOptions from '../Common/QuickOptions'

class Forum extends React.Component {

  componentDidMount() {
    document.body.style.backgroundColor = "#FCFCFC"
  }


render(){
  return (
     <div>
      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
        <QuickOptions/>
        <h1>Forums</h1>
        <button className="forum-options-btn">Following</button>
        <a href="/explore"><button className="forum-options-btn">Explore</button></a>
        <DiscussionList/>
      </div>

      <div className="containerFeedRight">
        {/* <Recommended/>  
        <Contributors/>   */}
      </div>
  </div>
  );
}
}


export default Forum;