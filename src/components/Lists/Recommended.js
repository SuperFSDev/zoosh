import React from 'react';
import '../../App.css';
import Avatar from '../Profile/Avatar'

export default function LeaderboardOptions() {

  return (
    <div>
        <h2>Recommened Groups</h2>
        <hr className="-recommended-hr-style"/>
        <div className="recommended-item">
            <h4 class="recommended-society-name">Computer Science</h4>
            <span className="Join-option"><p id="left-item-join">GMIT</p><button id="right-item-join">Join</button></span>
        </div>
        <div className="recommended-item">
            <h4>Rowing Club</h4>
            <span className="Join-option"><p id="left-item-join">NUIG</p><button id="right-item-join">Join</button></span>
            
        </div>
        <div className="recommended-item">
            <h4>Gaming Society</h4>
            <span className="Join-option"><p id="left-item-join">GMIT</p><button id="right-item-join">Join</button></span>
        </div>
        <div className="see-all-item">
            <br/>
            <a href="/list-of-clubs-and-societies">See All</a>
        </div>
        <div className="spacing"></div>

        {/* <h2>People to Follow</h2>
        <hr className="-recommended-hr-style"/>
        <div className="recommended-item">
            <h4 class="recommended-society-name">Aaron Moran</h4>
            <span className="Join-option"><p id="left-item-join">GMIT</p><button id="right-item-join">Follow</button></span>
        </div>
        <div className="recommended-item">
            <h4>Conor Shortt</h4>
            <span className="Join-option"><p id="left-item-join">GMIT</p><button id="right-item-join">Follow</button></span>
            
        </div>
        <div className="recommended-item">
            <h4>Thomas Kenny</h4>
            <span className="Join-option"><p id="left-item-join">GMIT</p><button id="right-item-join">Follow</button></span>
        </div>
        <div className="see-all-item">
            <br/>
            <a href="/list-of-clubs-and-societies">See All</a>
        </div> */}
    </div>
  );
}