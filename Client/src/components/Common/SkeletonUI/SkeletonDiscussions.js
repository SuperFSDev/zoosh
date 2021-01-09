import React from 'react';
import '../../../App.css';
import '../../../Media.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../../Lists/FeedOptions'
import QuickOptions from '../QuickOptions'
import 'react-calendar/dist/Calendar.css';
import Fab from '@material-ui/core/Fab';
import QuickCreate from '../QuickCreate'
import Skeleton from 'react-loading-skeleton';

class SkeletonDiscussions extends React.Component {


render(){
  return (
     <div>
      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
        {/* Mobile Quick Create */}
        <Fab color="secondary" aria-label="add" className="fab">
          <QuickCreate/>
        </Fab>
        <QuickOptions/>
        <div>
          <div className="post-option-btns">
            <div className="options-container">
                      <button className="community-btn" href="/home">Feed</button>
                      <a href="/discussions"><button className="community-btn-active">Discussions</button></a>
                      <button className="community-btn">Media</button>
                      <button className="community-btn">Links</button>
            </div>        
          </div>
  

          <div className="discussion-feed">
            {/* POST TAB */}
                    <div>
                      <div className='feedPost'>
                        <div>
                          <div className="fontPost">
                            <Skeleton count={3} duration={2}/><br /><br/>
                            <Skeleton circle={true} height={50} width={50} />                    
                          </div>  
                        </div>
                      </div>
                      <div className='feedPost'>
                        <div>
                          <div className="fontPost">
                            <Skeleton count={3} duration={2}/><br /><br/>  
                            <Skeleton circle={true} height={50} width={50} />                     
                          </div>  
                        </div>
                      </div>
                      <div className='feedPost'>
                        <div>
                          <div className="fontPost">
                            <Skeleton count={3} duration={2}/><br /><br/>  
                            <Skeleton circle={true} height={50} width={50} />                     
                          </div>  
                        </div>
                      </div>
                    </div>
                </div>
              </div>
      </div>

      <div className="containerFeedRight">
        <div className="recommended-container">
            <h5 className="-recommended-header">Communities</h5><hr/>
            <Skeleton count={8} duration={2}/>
        </div><br/>

        <div className="contributors-container">
            <h5 className="-top-cont-header">Top Contributors</h5><hr/>
            <Skeleton count={1} duration={2}/>
            <Skeleton circle={true} height={50} width={50} />
            <Skeleton count={1} duration={2}/>
            <Skeleton circle={true} height={50} width={50} />
            <Skeleton count={1} duration={2}/>
            <Skeleton circle={true} height={50} width={50} />  
        </div><br/><br/>
      </div>
  </div>
  );
 }
}

export default SkeletonDiscussions;

