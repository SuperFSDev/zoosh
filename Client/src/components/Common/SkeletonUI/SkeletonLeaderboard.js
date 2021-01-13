import React from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../../Lists/FeedOptions'
import Skeleton from 'react-loading-skeleton';

export default class SkeletonLeaderboard extends React.Component {

render(){
  return (
     <div>

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
          <div className="leaderboard-options">
            <a href="#users"><button className="btn-leaderboard" >Top Users</button></a>
            <a href="#top-comm"><button className="btn-leaderboard" >Top Communities</button></a>
            <a href="#growth"><button className="btn-leaderboard" >Top Growing</button></a>
            <div id="users"></div>
          </div>
          <div className="container-individual">
            <h1 className="c-s-header" id="users">ON FIRE USERS <span role="img" aria-label="fire">🔥</span></h1><br/>
              <div className="">
                  <div>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/> 
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>                 
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>
                  </div>
                <a href="#" id="dropdown-basic">See More</a>
              </div>
              <div id="top-comm"></div>
          </div>

          
          <div className="container-individual">
            <h1 className="c-s-header" id="top-comm">TOP COMMUNITIES <span role="img" aria-label="trend">📈</span></h1><br/>
              <div className="">
                  <div>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/> 
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>                 
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>                  
                </div>
                <a href="#" id="dropdown-basic">See More</a>
              </div>
              <div id="growth"></div>
          </div>

          <div className="container-individual">
            <h1 className="c-s-header">TOP GROWING COMMUNITIES <span role="img" aria-label="growth">🌱</span></h1><br/>
              <div className="">
                  <div>
                  <Skeleton count={1} duration={2} height={50}/><br /><br/> 
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>                 
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>
                    <Skeleton count={1} duration={2} height={50}/><br /><br/>                  
                </div>
                <a href="#" id="dropdown-basic">See More</a>
              </div>
          </div>
        
            </div>
      </div>
  </div>
  );
}
}