import React from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../../Lists/FeedOptions'
import Skeleton from 'react-loading-skeleton';

export default class SkeletonForum extends React.Component {

render(){

  return (
     <div>
      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
        <div className="global-feed">
        <h3>All Forums</h3>
        <div className="search-div-forum">
            <Skeleton count={1} duration={2} width={400} height={50}/><br /><br/>
        </div>

        <div className="featured-forums">
            <h3>Following</h3>
            <div >
              <div className="forum-option">
                <div className="forum-item-title">
                    <Skeleton count={3} duration={2}/><br /><br/>
                </div>
            </div>
                  <div >
              </div>
            </div>
        </div>



        <div className="featured-forums">
            <h3>Featured</h3>
            <div >
              <div className="forum-option">
                <div className="forum-item-title">
                    <Skeleton count={3} duration={2}/><br /><br/>
                </div>
            </div>
                  <div >
              </div>
            </div>

        </div>
        </div>
      </div>

      <div className="containerFeedRight">
        
      </div>
  </div>
  );
}
}