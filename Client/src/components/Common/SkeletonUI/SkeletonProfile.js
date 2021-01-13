import React from 'react'
import '../../../assets/App.css';
import Skeleton from 'react-loading-skeleton';

export default class SkeletonProfile extends React.Component {
 
  render() {
    return (
      <>
        <div className="containerFeedMiddleProfile">
          <div className="profile-card">
          </div>
          <div className="user-profile-about">
            <div id="social">
              <div className="profile-card-align">
                <Skeleton circle={true} height={200} width={200} /><br/><br/>
                <Skeleton count={1} duration={2}/><br /><br/> 
              </div>
              </div>
              
              {/* {this.state.user.bio} */}
            </div>

            <div className="user-profile-about">
              <section className="badge-container">
              <Skeleton count={4} duration={2}/><br /><br/>
                {/* <div className="stats-item-1">
                  <BsGem size={30}/> <b>{this.state.user.score}</b><br/>Score
                </div>
                <div className="stats-item-1">
                  <span><BsPerson size={30}/> <b> {this.state.followers.length}</b><br/>Followers</span>
                </div>
                <div className="stats-item-1">
                  <span><BsCircle size={30}/> <b> {this.state.societies.length}</b><br/>Communties</span>
                </div>
                <br/>
                <div className="stats-item-1">
                  <span><BsChatSquareDots size={30}/> <b> {this.state.societies.length}</b><br/>Posts</span>
                </div>
                <div className="stats-item-1">
                  <BsQuestionSquare size={30}/> <b>{this.state.followers.length}</b><br/>Questions
                </div>
                <div className="stats-item-1">
                  <span><BsShieldShaded size={30}/> <b> {this.state.societies.length}</b><br/>Answers</span>
                </div> */}
              </section>
          
            </div>
{/* 
            <div className="user-profile-about">

              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Name</Tooltip>}>
                <span className="d-inline-block">
                <p><SiAboutDotMe /> </p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.fullname}</b><br/>
              
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Education</Tooltip>}>
                <span className="d-inline-block">
                  <p><MdSchool /></p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.college}</b><br/>

              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Studying</Tooltip>}>
                <span className="d-inline-block">
                <p><FaBook/></p>
                </span>
              </OverlayTrigger>
              <b className="user-details">{this.state.user.course}</b><br/>
            </div> */}


          <div className="user-profile-about">
              <h5>Badges</h5>
              {/* <section className="badge-container">
                <div className="badge-item-1">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Gold</Tooltip>}>
                            <span className="d-inline-block">
                            <span>🥇 <h2>{this.state.badges.length}</h2></span>
                          </span>
                  </OverlayTrigger>   
                </div>
                <div className="badge-item-2">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Silver</Tooltip>}>
                            <span className="d-inline-block">
                            <span>🥈 <h2>{this.state.badges.length}</h2></span>
                          </span>
                  </OverlayTrigger>  
                </div>
                <div className="badge-item-3">
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Bronze</Tooltip>}>
                            <span className="d-inline-block">
                            <span>🥉 <h2>{this.state.badges.length}</h2></span>
                          </span>
                  </OverlayTrigger>  
                </div>
              </section> */}
            </div>


          <div className="user-profile-about">
            <h5>Communities</h5>
            <Skeleton count={4} duration={2}/><br /><br/>
       
            {/* {this.state.societies.map(society=>
                  <li className="community-members-item-profile">
                    <b><a href={"/s/?id="+society}>{society}</a></b><br/>
                    <b>Admin</b>
                  </li>)} */}
          </div>
        </div>

        <div className="containerFeedRightUser">
        <div  className="top-posts-profile-container-2">
            <Skeleton count={2} duration={2}/><br /><br/>
          {/* <div className="user-profile-overview">
          <span><p>{this.state.user.bio}</p></span>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cake Day</Tooltip>}>
                <span className="d-inline-block">
                <p id="icons"><RiCake2Fill size={25}/>  </p>
                </span>
              </OverlayTrigger>
                Joined on {moment(this.state.user.time).format("MMM Do, YYYY.")}

              <OverlayTrigger  overlay={<Tooltip id="tooltip-disabled">Location</Tooltip>}>
                <span className="d-inline-block" >
                <p  id="icons" className="spacing-right"><TiLocation  size={25}/>  </p>
                </span>
              </OverlayTrigger>
                 Galway, Ireland.
          </div> */}
              
        </div><br/>
          <div  className="top-posts-profile-container-2">
            <h5>Top Posts</h5>
            <Skeleton count={10} duration={2}/><br /><br/>
          </div>
          
        </div>
      </>
    );
  }
}

