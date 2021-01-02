import React from 'react';
import axios from 'axios'
import {Image} from 'react-bootstrap'

class Contributors extends React.Component {

 componentDidMount = () => {
        axios.get('http://localhost:4000/users/getUsers')
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
    var indents = [];

    for (var k = 0; k < 4; k++) {
        indents.push(users[1]);
      }

    return (
        <div className="contributors-container">
            <h4 className="-top-cont-header">Top Contributors</h4>
            {users.sort((a,b)=> b.score- a.score).map(user  =>  ( 
                <div key={k} className="contributor-item">
                <p><b>{i+=1}</b><a className="-contributor-user" href={"/u/?id="+user._id}><Image src={user.pic} className="user-image-mini" roundedCircle />{user.fullname}</a> <b  className="-contributor-user-score">{ user.score}</b></p><hr/>
            </div>
           ))}    
                                  {/* {indents.name}   */}


           <a href="/users/" id="dropdown-basic">See More</a>
           </div>
  );
  }
}

export default Contributors;