import React from 'react';
import axios from 'axios'
import {Image} from 'react-bootstrap'
import {BiPlanet} from 'react-icons/bi'
import Skeleton from 'react-loading-skeleton';
import background from "../../images/group.jpg";

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

            {this.state.isLoading ? ( 
                <div>
                  <Skeleton circle={true} height={100} width={100} style={{marginLeft:10}} count={7}/><br/>
    
                </div>

              ) : (
                <li className="community-members-item-profile">
                <p className="community-items-feed">
                  {this.state.societies.map(society => (
                    <div key={society.id}>
                        <a href={"/c/?id=" +society._id} className="miniprofile-post-redirect"><div className="community-items-feed">
                          {society.picture == null ? (
                            <Image src={background} className="community-item" height="90px" width="90px"/>
                          ) : (
                            <Image src={society.picture} className="community-item"/>
                          )}
                          <p>{society._id}</p>
                        </div></a>
                    </div>
                  ))}
                  {/* <b><a href={"/s/?id="+society} className="community-item-link">{society}</a> <b className="user-admin">Admin</b></b><br/> */}
                </p>
              </li>
              )}
            {/* {this.state.societies.map(society=> */}
                 
                  {/* )}                */}
                <hr/>
        </div>
  );
  }
}
export default UsersCommunities;