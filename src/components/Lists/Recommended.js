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
    
    <div>
      <h2 className="-recommended-header">Recommended Groups</h2>
        {societies.reverse().map(society => (
          <div className="recommended-item"  key={society._id}>
            <p>{society.name}</p>
             {/* <button className="soc-item-list-join-btn" onClick={() => addUser('Computer Science')}>Join</button> */}
              <a href={"/information?id=" +society._id}><button className="soc-item-list-join-btn">Info</button></a>
          </div>  ))}
    <div className="explore-more-link">

        <a href="/list-of-clubs-and-societies">Explore More</a>
    </div>
    </div>

  );
}
 
}
