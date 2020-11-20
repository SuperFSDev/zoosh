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
    };
  }

    componentDidMount() {
      var society_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#FCFCFC"


      axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
        .then((response) => {
          this.setState({ society: response.data.society })
        })
        .catch((error) => {
          console.log(error);
        });
    }

    addUser(soc) {
      AddUserToSoc(soc);
    }


    render(){
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
                <p className="member-count">Admins: 1</p>
                <p className="member-count">Members: 1</p>
              </div>
            </div>

            <div className="containerFeedMiddleCommunity">
              <CommunityTabs/>
            </div>
        </div>
        );
    } 
}
