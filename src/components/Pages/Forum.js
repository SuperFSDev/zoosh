import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import Discussion from '../Common/StartDiscussion'
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import DiscussionList from '../Lists/DiscussionList'
import FeedOptions from '../Lists/FeedOptions'

class Forum extends React.Component {

render(){
  return (
     <div>
      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
        <Discussion/>
        <DiscussionList/>
      </div>

      <div className="containerFeedRight">
        <Recommended/>  
        <Contributors/>  
      </div>
  </div>
  );
}
}


export default Forum;