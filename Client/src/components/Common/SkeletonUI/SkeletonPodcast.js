import React from 'react';
import '../../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../../Lists/FeedOptions'
import Skeleton from 'react-loading-skeleton';

export default class SkeletonPodcast extends React.Component {

render(){

  return (
     <div>

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
          <h3>Podcasts</h3>

            <div className="spacing"></div>
            <div>
            <h3>Featured Podcasts</h3>
            <div className="EventSocietyLayout">
              <div>
                  <div>
                    <div className="events-card">
                        <Skeleton circle={true} height={100} width={100} /><br/><br/>
                        <Skeleton count={3} duration={2} width={300}/><br /><br/>
                    </div>
                  </div>
              </div>
            </div>

            <div className="spacing"></div>

            <h3>Top Podcasts</h3>
            <div className="EventSocietyLayout">
              <div>
                  <div>
                    <div className="events-card">
                        <Skeleton circle={true} height={100} width={100} /><br/><br/>
                        <Skeleton count={3} duration={2} width={300}/><br /><br/>
                    </div>
                  </div>
              </div>
            </div>

            <div className="spacing"></div>

            <h3>All Podcasts</h3>
            <div className="EventSocietyLayout">
              <div>
                  <div>
                    <div className="events-card">
                        <Skeleton circle={true} height={100} width={100} /><br/><br/>
                        <Skeleton count={3} duration={2} width={300}/><br /><br/>
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