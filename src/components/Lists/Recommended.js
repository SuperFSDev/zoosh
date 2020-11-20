import React from 'react';
import addUserToSoc from '../Socs/AddUserToSoc';
import axios from 'axios';

export default class Recommended extends React.Component {

  componentDidMount() {
    axios.get('http://localhost:4000/societies/getSocieties')
      .then((response) => {
        this.setState({ societies: response.data.societies })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      societies: [],
    };
  }

  handleDelete(){
    console.info('You clicked the delete icon.');
    
  };

  addUser(soc){
    addUserToSoc(soc);
    console.info("Added to society")
    }

 handleClick(){
    console.info('You clicked the Chip.');
  };

render(){
  var { societies } = this.state;

   return (
    
    <div className="recommended-container">
      <h4 className="-recommended-header">Communities to join</h4><hr/>
        {societies.reverse().map(society => (
          <div key={society._id}>
          <a href={"/s/?id="+society._id} className="recommended-item-a"><div className="recommended-item">
            <p><b>{society.name}</b></p>
            <p>{society.college}</p>
            <p className="description">{society.description}</p>
             <button className="soc-item-list-join-btn" onClick={() => this.addUser('Computer Science')}>Join</button>
              {/* <a href={"/s/?id=" +society._id}><button className="soc-item-list-join-btn">Info</button></a> */}
          </div></a><hr/>
          </div>  ))}
    <div className="explore-more-link">

        <a href="/list-of-clubs-and-societies">Explore More</a>
    </div>
    </div>

  );
}
 
}
