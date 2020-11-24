import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import DiscussionList from '../Lists/DiscussionList'
import FeedOptions from '../Lists/FeedOptions'
import QuickOptions from '../Common/QuickOptions'

class Discussions extends React.Component {

  componentDidMount() {
    document.body.style.backgroundColor = "#F7F7F7"
  }


render(){
  return (
     <div>
      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
        <QuickOptions/>
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


export default Discussions;