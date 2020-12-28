import React from 'react';
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
      <h4 className="-recommended-header">Communities</h4><hr/>
        {societies.reverse().map(society => (
          <div key={society._id}>
          <a href={"/s/?id="+society._id} className="recommended-item-a"><div className="recommended-item">
            <p><b>{society.name}</b></p>
            <p className="description">{society.description}</p>
              {/* <a href={"/s/?id=" +society._id}><button className="soc-item-list-join-btn">Info</button></a> */}
          </div></a><hr/>
          </div>  ))}
    <div className="explore-more-link">

        <a href="/communities" id="dropdown-basic">Explore More</a>
    </div>
    </div>

  );
}
 
}


  // Adding a User to a society array and adding the society to the users array
  async function addUserToSoc(soc) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    const addUser = {
        society: soc,
        user: getUser,
        user_id: getUser._id,
    }

    // Adds user to users array in society model.
    await axios.post('http://localhost:4000/societies/update', addUser)
        .then(function (resp) {
            console.log(resp);
            alert("Successfully joined " + soc);
        })
        .catch(function (error) {
            console.log(error);
        })


    // Adds society to societies array in user model.
    await axios.post('http://localhost:4000/users/addToSocList', addUser)
        .then(function (resp) {
            console.log(resp);

            // Update societies array in localStorage
            if(!getUser.societies.includes(soc)) {
                getUser.societies.push(soc);
            }
            console.log(getUser);
            localStorage.setItem('user', JSON.stringify(getUser))
        })
        .catch(function (error) {
            console.log(error);
        })
}
