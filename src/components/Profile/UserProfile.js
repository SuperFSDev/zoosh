import React from 'react';
import '../../App.css';
import axios from 'axios';
import {Image} from 'react-bootstrap'
import ProfilePic from '../../images/blogging.jpg'
import ProfileTabs from './ProfileTabs'

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

    componentDidMount() {
      var user_id = new URLSearchParams(this.props.location.search).get("id");

      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
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
    <>
      <div className="containerFeedLeftProfile">

      </div>

      <div className="containerFeedMiddleProfile">
        <div className="profile-card">
          <div id="social">
            <Image src={ProfilePic} className="user-image" roundedCircle />
            <p className="society-header-name"> {this.state.user.fullname}</p>
          </div>
        </div>
        <ProfileTabs/>

      </div>

      <div className="containerFeedRightProfile">

      </div>
    </>
  );
  }
 
}