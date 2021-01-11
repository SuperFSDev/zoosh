import React from 'react';
import '../../App.css';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

export default class QuickOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        id: '',
        user: '',
        following: [],
        socs:[],

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
            this.setState({ user: response.data.user,
                following: response.data.user.following,
                socs:response.data.user.societies

            })
        })
        .catch((error) => {
            console.log(error);
        });

}

render(){

  return (
    <div>
      <div className="quick-options-container">
      <a href="/new" className="quick-options-a"><div className="quick-options">
          <p><b>Post Something</b></p>
          <hr/>
            <Avatar src={this.state.user.pic} className="profile-btn-wrapper-left"/>
            <input
             className="quick-options-input"
             placeholder="What's on your mind?"
            />
        </div> </a>
      </div>
    </div>
    
  );
}


  
}