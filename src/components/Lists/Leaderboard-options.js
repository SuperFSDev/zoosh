import React from 'react';
import '../../App.css';
import { Nav } from 'react-bootstrap';
import {MdShowChart} from 'react-icons/md'
import {HiOutlineFire} from 'react-icons/hi'

export default function LeaderboardOptions() {

  return (
    <div>
        <div className="socs-options-btns">
        <button className="trending-soc"><Nav.Link href="/list-of-clubs-and-societies">All</Nav.Link></button>
          <button className="trending-soc"><Nav.Link href="/trending"><MdShowChart/> Trending</Nav.Link></button>
          <button className="trending-soc"><Nav.Link href="/new"><HiOutlineFire/> New</Nav.Link></button>
        </div>
    </div>
  );
}