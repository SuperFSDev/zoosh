import React from 'react';
import '../../../App.css';
import Skeleton from 'react-loading-skeleton';

export default class SkeletonDiscussionPost extends React.Component {

    render() {
      return (
        <>

        <div className="containerPostLeft">
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton count={1} duration={2} height={50}/><br /><br/>
          </div>
          <div className="containerPostMiddle">
            <div className="forum-container">
                <Skeleton count={1} duration={2} height={50}/><br /><br/>
                <Skeleton count={1} duration={2} width={800}/><br /><br/>
                <Skeleton count={1} duration={2} width={700}/><br /><br/>
                <Skeleton count={1} duration={2} width={800}/><br /><br/>
                <Skeleton count={1} duration={2} width={500}/><br /><br/>

            <div className="comment-container">
            <Skeleton count={1} duration={2}/><br /><br/>
            <Skeleton count={1} duration={2}/><br /><br/>
            <Skeleton count={1} duration={2}/><br /><br/>

            </div>
        </div>   
        </div>
        </>
      );
    }
  }