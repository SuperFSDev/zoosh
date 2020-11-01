import React from 'react';
import '../../App.css';
import {Table, Breadcrumb} from 'react-bootstrap'

function LeaderboardList() {
  return (
    <>
    <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Leaderboard</Breadcrumb.Item>
      </Breadcrumb>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>College</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1</td>
              <td>Conor Shortt</td>
              <td>GMIT</td>
              <td>999</td>
            </tr>
            <tr>
              <td>#2</td>
              <td>Thomas Kenny</td>
              <td>GMIT</td>
              <td>555</td>
            </tr>
            <tr>
              <td>#3</td>
              <td>Aaron Moran</td>
              <td>GMIT</td>
              <td>333</td>
            </tr>
          </tbody>
        </Table>    
</>
  );
}

export default LeaderboardList;
