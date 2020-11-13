import React from 'react';

export default function ProfileUsername() {
  var user = JSON.parse(localStorage.getItem('user'));
  var fullname = user.fullname;
  var id = user._id;

  return (
    <div id="social">
      <h3>{fullname} <b className="user-score">1,231</b></h3>
      {id}
    </div>
  );
}