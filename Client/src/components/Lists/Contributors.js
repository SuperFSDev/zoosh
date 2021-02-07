import React from 'react';
import axios from 'axios'
import {Image} from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton';
import {BiRadar} from 'react-icons/bi'

class Contributors extends React.Component {

 componentDidMount = () => {
        axios.get('http://localhost:4000/users/get-users-radar')
        .then((response)=>{
            this.setState({users: response.data.users})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    constructor(props) {
        super(props);
        this.state = {
        users: [],
    };    
} 

  render(){

    var{users} = this.state;

    const shuffledUsers = users; //shuffleArray(users);


    return (
        <div className="contributors-container">
            <div className="column-head">
              <p className="column-title"><BiRadar  size={20}/> RADAR</p><hr/>
            </div>
            
            {this.state.isLoading ? ( 
                <div>
                  <Skeleton height={100} style={{marginBottom:10}} count={3}/><br/>
    
                </div>

              ) : (
                <div>

                {users.map(user  =>  ( 
                    <a className="-recommended-item-a" href={"/u/?id="+user._id} style={{color:'black', fontWeight:'light'}}>
                    <div class="miniprofileCommunity">
                        <figure class="headshot">
                            <Image src={user.pic} className="user-image-mini" roundedCircle />
                        </figure>
                        <section class="bio-box">
                            <span class="details"> 
                                <b className="profile-name">{user.fullname} </b>
                            </span>
                        </section>

                    </div></a>
                ))} 
                </div>
              )}
            
            <a href="/users"  className="explore-more">Find Friends</a><br/><br/>
        </div>
  );
  }
}

/*function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }*/

export default Contributors;