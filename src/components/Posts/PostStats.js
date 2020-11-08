import React from 'react';
import ProfileViews from '../Profile/ProfileViews'
import ProfileHearts from '../Profile/ProfileHearts'

export default function PostStats() {
  return (
    <div className="-u-prof-stats" id="social">
        <span className="stats-wrapper-left"><ProfileHearts className="prof-hearts"/></span>
        <span className="stats-wrapper"><ProfileViews/></span>
    </div>
  );
}