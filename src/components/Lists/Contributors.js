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

    return (
        <div className="contributors-container">
            <h2 className="-top-cont-header">Top Contributors</h2>
                <div className="contributor-item">
                    <p><b>1</b><a className="-contributor-user" href="/profile">Aaron Moran</a><b  className="-contributor-user-score">123</b></p><hr/>
                    <p><b>2</b><a className="-contributor-user"  href="/profile">John Doe</a><b  className="-contributor-user-score">123</b></p><hr/>
                    <p><b>3</b><a className="-contributor-user"  href="/profile">Conor Shortt</a><b  className="-contributor-user-score">123</b></p><hr/>
                    <p><b>4</b><a className="-contributor-user"  href="/profile">Mary Jane</a><b  className="-contributor-user-score">123</b></p><hr/>
                    <p><b>5</b><a className="-contributor-user"  href="/profile">Thomas Kenny</a><b  className="-contributor-user-score">123</b></p><hr/>
                    <a href="#">See More</a>

                </div>
        </div>
  );
  }
}

export default Contributors;