import React from 'react';
import Chip from '@material-ui/core/Chip'
import addUserToSoc from '../Socs/AddUserToSoc'
import axios from 'axios'

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

    return (
        <div className="contributors-container">
            <h2 className="-top-cont-header">Top Contributors</h2>
            {users.sort((a,b)=> b.score- a.score).map(user=>  ( 
                <div className="contributor-item">
               
            <p><b>{i+=1}</b><a className="-contributor-user" href={"/u/?id="+user._id}>{user.fullname}</a> <b  className="-contributor-user-score">{ user.score}</b></p><hr/>
                    
                 
        </div>
           ))}    
           <a href="#">See More</a>
           </div>
  );
  }
}

export default Contributors;