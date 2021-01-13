import React from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../../Lists/FeedOptions'
import Skeleton from 'react-loading-skeleton';

export default class SkeletonUsers extends React.Component {

render(){

  return (
     <div>
        <div className="containerFeedLeft">
            <FeedOptions/>
        </div>

        <div className="containerFeedMiddle">
              <div className="global-feed">
              <h3>Meet the Community</h3>
              <div className="container-square">
            <div className="search-div-square">
                <Skeleton count={1} duration={2}/><br /><br/>
            </div>
          <div className="UsersLayout">
              <div>
                <div className="users-list-items">
                    <Skeleton count={1} duration={2} width={125}/><br /><br/>
                    <Skeleton circle={true} height={100} width={100} /><br/><br/>
                    <Skeleton count={1} duration={2} width={50}/><br /><br/>
                </div>
              </div>
                </div>
                </div>
            </div>
        </div>         
</div>
  );
}
}