import React from 'react';
import '../../../App.css';
import 'react-calendar/dist/Calendar.css';
import Skeleton from 'react-loading-skeleton';

export default class SkeletonCommunity extends React.Component {

    render(){
      return (
        <div>
          
            <div className="containerFeedLeftCommunity">
                <div className="community-card">
                    <Skeleton circle={true} height={200} width={200} /><br/><br/>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>
                    <Skeleton count={1} duration={2} width={800}/><br /><br/>
                    <Skeleton count={1} duration={2} width={700}/><br /><br/>
                    <Skeleton count={1} duration={2} width={800}/><br /><br/>
                    <Skeleton count={1} duration={2} width={500}/><br /><br/>     
                    <Skeleton count={1} duration={2} width={700}/><br /><br/> 
                    <Skeleton count={1} duration={2} width={500}/><br /><br/>            
                </div>
            </div>

            <div className="containerFeedMiddleCommunity">
              <div className="community-users-card">
                <Skeleton circle={true} height={50} width={50} /><br/><br/>
                <Skeleton count={1} duration={2} height={50}/><br /><br/>
                <Skeleton count={1} duration={2} width={200}/><br /><br/>
                <Skeleton count={1} duration={2} width={200}/><br /><br/>
              </div>
            </div>
        </div>
        );
    } 
}