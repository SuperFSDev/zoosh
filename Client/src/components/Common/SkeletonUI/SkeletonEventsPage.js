import React from 'react';
import '../../../assets/App.css';
import Skeleton from 'react-loading-skeleton';

export default class SkeletonEventsPage extends React.Component {



    render() {
      return (
        <>
         
          <div className="events-container">
            <div>

            </div>
          </div>

          <div className="podcast-desc">
            <Skeleton count={1} duration={2} height={50}/><br /><br/>
            <Skeleton count={1} duration={2} width={600}/><br /><br/>
            <Skeleton count={1} duration={2} width={400}/><br /><br/>
            <Skeleton count={1} duration={2} width={400}/><br /><br/>
            <Skeleton count={1} duration={2} width={500}/><br /><br/>
            <Skeleton count={1} duration={2} width={500}/><br /><br/>
            <Skeleton count={1} duration={2} width={400}/><br /><br/>
          </div>
           
     
        </>
      );
    }
  }

