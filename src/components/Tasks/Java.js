import React from 'react';
import '../../App.css';
import Copy from '../Copy';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function Java() {
  return (
    <div>
        <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="\daily">
                All Problems
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Java</Breadcrumb.Item>
        </Breadcrumb>
        <Copy/>    
    </div>
  );
}