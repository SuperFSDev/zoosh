import React from 'react';
import '../../../App.css';
import Skeleton from 'react-loading-skeleton';

export default class SkeletonPodcastPage extends React.Component {

    render() {
      return (
        <>
          <div className="events-container">
            <div>
              <div className="podcast-desc">
                  <div className="create-soc-div"><br/>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>
                    <Skeleton count={1} duration={2} width={600}/><br /><br/>
                    <Skeleton count={1} duration={2} width={400}/><br /><br/>
                    <Skeleton count={1} duration={2} width={400}/><br /><br/>
                    <Skeleton count={1} duration={2} width={500}/><br /><br/>
                    <Skeleton count={1} duration={2} width={500}/><br /><br/>
                    <Skeleton count={1} duration={2} width={400}/><br /><br/>
                  </div>
              </div>  
            </div>
          </div>
           
     
        </>
      );
    }
  }

