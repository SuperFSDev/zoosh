import React from 'react';
import '../../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../../Lists/FeedOptions'
import Skeleton from 'react-loading-skeleton';
export default class SkeletonEvent extends React.Component {

render(){
  return (
     <div>

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
          <h3>Upcoming Events</h3>

          <div className="search-div-forum">
            {/* <BsSearch/>  */}
            <Skeleton count={1} duration={2} width={400} height={50}/><br /><br/>
          </div>

            <div>
              <div className="EventSocietyLayout">
                <div>
                    <div>
                        <div className="events-card">
                            <Skeleton count={3} duration={2}/><br /><br/>
                        </div>
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