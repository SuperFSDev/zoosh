import React from 'react';
import axios from 'axios';

export default class Recommended extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      societies: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/societies/getSocieties')
      .then((response) => {
        this.setState({ societies: response.data.societies })
      })
      .catch((error) => {
        console.log(error);
      });
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
  var size = 3;
  const shuffledPosts = shuffleArray(societies);

   return (
    
    <div className="recommended-container">
      <h5 className="-recommended-header">Communities</h5><hr/>
        {shuffledPosts.slice(0, size).map(society =>(
          <div key={society._id}>
          <a href={"/c/?id="+society._id} className="recommended-item-a"><div className="recommended-item">
            <div className="recommended-content">
              <p>{society.name} <span className="recommended-btn"><button className="community-btn-active">Join</button></span></p>
              {/* <p className="description">{society.description}</p> */}
            </div>
            
              {/* <a href={"/s/?id=" +society._id}><button className="soc-item-list-join-btn">Info</button></a> */}
          </div></a>
          </div>  ))}
          <br/>
          <a href="/communities"  className="explore-more">Explore More</a><br/>
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


// Return a random society from the array - Shuffles them
function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}