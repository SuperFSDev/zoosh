import React from 'react';
import '../../App.css';
import PythonData from '../../data/python.json'
import { FiCopy } from 'react-icons/fi';


function Python() {
  return (

    <>
        <div className="spacing"></div>
        <div className="daily-card">
          {PythonData.map((postDetail, index)=>{
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

export default Python;
