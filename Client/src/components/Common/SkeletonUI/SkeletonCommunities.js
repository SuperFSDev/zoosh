import React from 'react';
import '../../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../../Lists/FeedOptions'
import Skeleton from 'react-loading-skeleton';

export default class SkeletonCommunities extends React.Component {
render(){
  return (
     <div>
        <div className="containerFeedLeft">
            <FeedOptions/>
        </div>

        <div className="containerFeedMiddle">
              <div className="global-feed">
              <h3>Communities</h3>
              <div className="container-square">
            <div className="search-div-square">
                <Skeleton count={1} duration={2}/><br /><br/>
            </div>

            <div className="SocietyLayout">
                <div>
                   <div className="socs-list-items">
                    <Skeleton count={1} duration={2} width={125}/><br /><br/>
                    <Skeleton circle={true} height={50} width={50} /> <br/><br/>
                    <Skeleton count={1} duration={2} width={100}/><br /><br/>
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