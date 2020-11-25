import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import {Image} from 'react-bootstrap'
import ProfilePic from '../../images/blogging.jpg'
import axios from 'axios';
import AddUserToSoc from '../Socs/AddUserToSoc'
import CommunityTabs from '../Community/CommunityTabs'

export default class CommunityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
      users:[],
    };
  }

    componentDidMount() {
      var society_id = new URLSearchParams(this.props.location.search).get("id");


      axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
        .then((response) => {
          this.setState({ society: response.data.society,
           users:response.data.society.users})
        })
        .catch((error) => {
          console.log(error);
        });
    }

    addUser(soc) {
      AddUserToSoc(soc);
      var user = JSON.parse(localStorage.getItem('user'));
    }


    render(){

      var user = JSON.parse(localStorage.getItem('user'));
      if(this.state.society.admin == user._id){


        return (
          <div>
     
              <div className="containerFeedLeftCommunity">
                <div className="community-card">
                  <h1>Welcome admin</h1>
                  <Image src={ProfilePic} className="user-image" roundedCircle />
                  <h3>{this.state.society.name}</h3>
                  <p className="community-copy-link">z/{this.state.society._id}</p>
                  <p>{this.state.society.description}</p>
                </div>
                <br/>
                <div className="community-card">
                <p className="member-count">Admins: {this.state.society.admin}</p>
                  <p className="member-count">Members:  {this.state.users.length}</p>
                </div>
              </div>
  
              <div className="containerFeedMiddleCommunity">
                <CommunityTabs/>
              </div>
          </div>
          );
      }

      else{

      return (
        <div>
          
            <div className="containerFeedLeftCommunity">
              <div className="community-card">
                <Image src={ProfilePic} className="user-image" roundedCircle />
                <h3>{this.state.society.name}</h3>
                <p className="community-copy-link">z/{this.state.society._id}</p>
                <p>{this.state.society.description}</p>
                <button className="community-button-join" onClick={() => this.addUser(this.state.society.name)}>Join</button>
              </div>
              <br/>
              <div className="community-card">
              <p className="member-count">Admins: {this.state.society.admin}</p>
                <p className="member-count">Members:  {this.state.users.length}</p>
              </div>
            </div>

            <div className="containerFeedMiddleCommunity">
              <CommunityTabs/>
            </div>
        </div>
        );
    } 
}
}