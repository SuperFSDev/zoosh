import React from 'react';
import InputBase from '@material-ui/core/InputBase';

// import SearchIcon from '@material-ui/icons/Search';

  
  export default function SearchAppBar() {
  
    return (
      <div >
            <div >
              <div >
              </div>
              <InputBase
              placeholder="Search a Category/User"
              className="searchbar-navbar"
              inputProps={{ 'aria-label': 'search' }}/>
            </div>
      </div>
    );
  }