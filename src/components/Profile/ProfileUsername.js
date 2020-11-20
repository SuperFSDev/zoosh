import { render } from '@testing-library/react';
import React from 'react';
import axios from 'axios';

export default class ProfileUsername extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
      id: '',
      user: ''
  };
}

componentDidMount() {
  var user = JSON.parse(localStorage.getItem('user'));
  this.setState({ id: user._id });

  axios.get('http://localhost:4000/users/get-user-details', {
      params: {
          id: user._id
      }
  })
      .then((response) => {
          this.setState({ user: response.data.user })
      })
      .catch((error) => {
          console.log(error);
      });

}
render(){
    return (
    <div id="social">
      <Username/>
      <p><b className="user-details-views">{this.state.user.score}</b></p>
    </div>
  );
}

}


function Username(){
  var user = JSON.parse(localStorage.getItem('user'));
  if(user)
    var fullname = user.fullname;
    var id = user._id;
    var societies = user.societies;
  

  return (
    <div id="social">
      <h3>{fullname}</h3>
      {/* {id} */}
    </div>
  );

}
