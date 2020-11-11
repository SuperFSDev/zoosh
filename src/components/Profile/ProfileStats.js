import React from 'react';
import ProfileViews from './ProfileViews'
import ProfileHearts from './ProfileHearts'
import ProfileURL from './ProfileURL'

export default function ProfileStats() {
  return (
    <div className="-u-prof-stats" id="social">
        <span className="stats-wrapper-left"><ProfileHearts className="prof-hearts"/></span>
        <span className="stats-wrapper"><ProfileViews/></span>
        <ProfileURL/>
    </div>
  );
}