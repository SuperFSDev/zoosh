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
    let i = 0;
    var size = 3;
    var k =0;

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

                {shuffledUsers.slice(0,size).sort((a,b)=> b.score- a.score).map(user  =>  ( 
                    <a className="-contributor-user" href={"/u/?id="+user._id}>
                    <div class="miniprofile">
                        <figure class="headshot">
                            <Image src={user.pic} className="user-image-mini" roundedCircle />
                        </figure>
                        <section class="bio-box">
                            <dl class="details"> 
                                <b className="text-name">{user.fullname} </b>
                                <dd class="location">{user.college}</dd>
                            </dl>
                        </section>
                        {user.score >= 1 && user.score <=999 ? (
                          <span  className="-contributor-user-score"><b className="user-member">{ user.score}</b><br/></span>
                        ) : user.score >=1000 ?(
                            <span  className="-contributor-user-score"><b  className="user-mod">{ user.score}</b><br/></span>
                        ) : user.score >= 5000 ? (
                            <span  className="-contributor-user-score"><b  className="user-admin">{ user.score}</b><br/></span>
                        ) : (
                            <span className="-contributor-user-score"><b  className="user-member">{ user.score}</b><br/></span>
                        )} 
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