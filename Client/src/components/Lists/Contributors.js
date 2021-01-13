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
    var size = 5;
    var items = [];

    return (
        <div className="contributors-container">
            <h5 className="-top-cont-header">Top Contributors</h5>
            {users.sort((a,b)=> b.score- a.score).map(user  =>  ( 
                <div className="contributor-item">
                <p>
                    <b>{i+=1}</b>
                    <a className="-contributor-user" href={"/u/?id="+user._id}>
                        <Image src={user.pic} className="user-image-mini" roundedCircle />
                        {user.fullname}
                    </a> 
                    {user.score >= 1 && user.score <=999 ? (
                      <span  className="-contributor-user-score"><b className="user-member">{ user.score}</b><br/></span>
                    ) : user.score >=1000 ?(
                        <span  className="-contributor-user-score"><b  className="user-mod">{ user.score}</b><br/></span>
                    ) : user.score >= 5000 ? (
                        <span  className="-contributor-user-score"><b  className="user-admin">{ user.score}</b><br/></span>
                    ) : (
                        <span className="-contributor-user-score"><b  className="user-member">{ user.score}</b><br/></span>
                    )} 
                </p><hr/>
            </div>
           ))}    
        </div>
  );
  }
}

export default Contributors;