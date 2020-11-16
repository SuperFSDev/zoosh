import React from 'react';

export default function ProfileAchievements() {
    var user = JSON.parse(localStorage.getItem('user'));
    var societies = user.societies;
  return (
    <div>
            <div className="containerFeedLeftProfileCell">
                <div className="user-profile-about">
                        <h1>Communities</h1><br/>
                        </div>
                    </div>
                    <div className="SocietyLayout">
                        <div>
                            <div className="python-card">
                                <a href="/"><h4><b>{societies[0]}</b></h4> </a>
                            <div >
                        </div>
                    </div>

                    <div className="SocietyLayout">
                        <div>
                            <div className="python-card">
                                <a href="/"><h4><b>{societies[1]}</b></h4> </a>
                            </div >
                        </div>
                    </div>
                
                    
                </div>
               
            </div>

            <div className="containerFeedMiddleProfileCell">
               
               
            </div>

            <div className="containerFeedRightProfileCell">

            </div>
    </div>
  );
}