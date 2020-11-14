import React from 'react';
import Chip from '@material-ui/core/Chip';
import addUserToSoc from '../Socs/AddUserToSoc';

export default function Chips() {

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
    
  };

  const addUser = (soc) =>{
    addUserToSoc(soc);
    console.info("Added to society")
    }

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div>
        <h2 className="-recommended-header">Recommended Groups</h2>
        
        <div className="recommended-item">
          <p>GMIT Computer Science</p>
          <button className="soc-item-list-join-btn" onClick={() => addUser('Computer Science')}>Join</button>
          <button className="soc-item-list-join-btn">Info</button>
        </div>

    <div className="recommended-chip">
      <Chip
        className="recommended-chip-item"
        label="GMIT Computer Science"
        clickable
        id="chip"
        color="primary"
        onClick={() => addUser('Computer Science')}
        onDelete={handleDelete} 
        />
        <Chip
        className="recommended-chip-item"
        label="NUIG Rowing Club"
        clickable
        color="secondary"
        onClick={() => addUser('Rowing Club')}
        onDelete={handleDelete}
        />
       <Chip
        className="recommended-chip-item"
        label="GMIT Debating"
        clickable
        color="secondary"
        onClick={() => addUser('Rowing Club')}
        onDelete={handleDelete}
        />
        <Chip
        className="recommended-chip-item"
        label="NUIG Mountain Climbing"
        clickable
        color="primary"
        onClick={() => addUser('Rowing Club')}
        onDelete={handleDelete}
        />
    </div>
    <div className="explore-more-link">
        <a href="/list-of-clubs-and-societies">Explore More</a>
    </div>
    </div>

  );
}