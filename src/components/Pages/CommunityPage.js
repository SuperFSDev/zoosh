import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import {Image} from 'react-bootstrap'
import ProfilePic from '../../images/blogging.jpg'
import axios from 'axios';
import AddUserToSoc from '../Socs/AddUserToSoc'

export default class CommunityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
      users:[],
      UserList:[]
    };
  }

  async componentDidMount() {
      var society_id = new URLSearchParams(this.props.location.search).get("id");


     await axios.get('http://localhost:4000/societies/get-societies-page', {
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
        
        for (var i = 0; i < this.state.users.length; i++) {
          this.GetFollowedUser(this.state.users[i]._id)
        } 
    }

    addUser(soc) {
      AddUserToSoc(soc);
      var user = JSON.parse(localStorage.getItem('user'));
    }


     async  GetFollowedUser(user_id){
    await axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id:user_id
        }
      })
        .then((response) => {
          this.setState({
            UserList: this.state.UserList.concat(response.data.user)
          })
  
        })
        .catch((error) => {
          console.log(error);
        });
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
              {console.log("aaaa"+this.state.UserList)}
              <p>members</p>
              {this.state.UserList.map(u => ( 
               
                
                


                 <div key={u._id} >
                   {console.log(u)}
                <p className="member-count">{ <Image src={`data:image/jpeg;base64,${u.pic}`} className="user-image" roundedCircle />} </p>
                </div>
                ))}
              </div>
            </div>

            <div className="containerFeedMiddleCommunity">
            </div>
        </div>
        );
    } 
}
}