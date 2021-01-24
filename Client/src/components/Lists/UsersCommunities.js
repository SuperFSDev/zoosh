import React from 'react';
import axios from 'axios'
import {Image} from 'react-bootstrap'
import {BiPlanet} from 'react-icons/bi'

class UsersCommunities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            id: '',
            user: '',
            college:'',
            course:'',
            dob:'',
            time:'',
            posts:[],
            following: [],
            followers: [],
            societies:[],
            admin:[],
            badges:[],
            isYellowTag:false,
        };
      }
  
    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('user'));
        // document.body.style.backgroundColor = "#FCFCFC";
  
        this.setState({ id: user._id });
  
        axios.get('http://localhost:4000/users/get-user-details', {
            params: {
                id: user._id,
               
            }
        })
            .then((response) => {
                this.setState({ user: response.data.user,
                followers: response.data.user.followers,
                following: response.data.user.following,
                admin: response.data.user.admin,
                societies: response.data.user.societies,
                posts:response.data.user.posts,
                badges:response.data.user.badges,
                
  
              })
            })
            .catch((error) => {
                console.log(error);
            });
  
    }
  

  render(){

    var{users} = this.state;
    let i = 0;

    return (
        <div className="communities-container">
            <h5 className="-feed-item-header"><BiPlanet size={20}/> YOUR COMMUNITIES</h5>
            {/* {this.state.societies.map(society=> */}
                  <li className="community-members-item-profile">
                    <p className="community-items-feed">
                        <img src="http://dummyimage.com/90x90/000/fff.png"  className="community-item"/>
                        <img src="http://dummyimage.com/90x90/000/fff.png"  className="community-item"/>
                        <img src="http://dummyimage.com/90x90/000/fff.png"  className="community-item"/>
                        <img src="http://dummyimage.com/90x90/000/fff.png"  className="community-item"/>
                        <img src="http://dummyimage.com/90x90/000/fff.png"  className="community-item"/>
                        <img src="http://dummyimage.com/90x90/000/fff.png"  className="community-item"/>
                        <img src="http://dummyimage.com/90x90/000/fff.png"  className="community-item"/>
                      {/* <b><a href={"/s/?id="+society} className="community-item-link">{society}</a> <b className="user-admin">Admin</b></b><br/> */}
                    </p>
                   
                  </li>
                  {/* )}                */}
                <hr/>
        </div>
  );
  }
}
export default UsersCommunities;