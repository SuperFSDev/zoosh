import React from 'react';

export default function ProfileUsername() {
  var user = JSON.parse(localStorage.getItem('user'));
  var fullname = user.fullname;

  return (
    <div id="social">
      <h3>{fullname} <b className="user-score">123</b></h3>
    </div>
  );
}