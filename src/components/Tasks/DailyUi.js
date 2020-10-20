import React from 'react';
import '../../App.css';
import DesignData from '../../data/design.json'
import { FiCopy } from 'react-icons/fi';
import { MdSend } from 'react-icons/md';

function DailyUi() {
  return (

    <>
        <div className="spacing"></div>
        <div className="daily-card">
          {DesignData.map((postDetail, index)=>{
            return <div>
                <h1>{postDetail.title}</h1>
                <div className="spacing"/>
                <p>{postDetail.content}</p>
            </div>
          })}
        <button className="btn-copy">Copy <FiCopy/></button>
        </div>
    </>
  );
}

export default DailyUi;
