import React from 'react';
import '../../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../../Lists/FeedOptions'
import Skeleton from 'react-loading-skeleton';

export default class SkeletonForumPage extends React.Component {

    render(){
      return (
         <div>
          <div className="containerFeedLeft">
            <FeedOptions/>
          </div>
    
          <div className="containerFeedMiddle">
              <div className="global-feed">
                <span  className="username-wrapper">
                    <Skeleton count={1} duration={2} width={400} height={50}/><br /><br/>
                </span>
                <br/>

                <div>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>
                    <Skeleton count={1} duration={2} width={800}/><br /><br/>
                    <Skeleton count={1} duration={2} width={700}/><br /><br/>
                    <Skeleton count={1} duration={2} width={800}/><br /><br/>
                    <Skeleton count={1} duration={2} width={500}/><br /><br/>
                </div>
              </div>

          </div>
    
          <div className="containerFeedRight">
        
          </div>
      </div>
      );
     }
}
