import React from 'react';
import '../App.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

function Leaderboard() {
  return (
    <>
    <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Leaderboard</Breadcrumb.Item>
      </Breadcrumb>
    <h2>Leaderboard</h2>
    </>
  );
}

export default Leaderboard;
