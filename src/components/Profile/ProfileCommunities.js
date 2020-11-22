import React from 'react';

export default function ProfileAchievements() {
    var user = JSON.parse(localStorage.getItem('user'));
    var societies = user.societies;
  return (
    <div>
            <div className="containerFeedLeftProfileCell">
                    </div>
                    <div className="UsersSocietyLayout">
                        <div>
                            <div className="users-communities-card">
                                <a href="/"><h4><b>{societies[0]}</b></h4> </a>
                            <div >
                        </div>
                    </div>         
                </div>
            </div>
    </div>
  );
}