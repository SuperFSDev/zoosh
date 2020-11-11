import React from 'react';

export default function ProfileUsername() {
  var user = JSON.parse(localStorage.getItem('user'));
  var fullname = user.fullname;

  return (
    <div id="social">
      <h1>{fullname}</h1>
    </div>
  );
}