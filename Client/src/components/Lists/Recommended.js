import React from 'react';
import axios from 'axios';
import { StickyContainer, Sticky } from 'react-sticky';
import {BiCompass} from 'react-icons/bi'
import Skeleton from 'react-loading-skeleton';

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
  var size = 1;
  const shuffledPosts = shuffleArray(societies);

   return (
    <StickyContainer>
        <div>
            <div className="recommended-container">
            <h5 className="-feed-item-header"><BiCompass size={20}/> EXPLORE</h5><hr/>
            {this.state.isLoading ? ( 
                <div>
                  <Skeleton height={140} style={{marginBottom:10}} count={1}/><br/>
    
                </div>

              ) : (
                <div>
                  {shuffledPosts.slice(0, size).map(society =>(
                    <div class="miniprofileCommunity">
                      <figure class="headshot">
                          <img src={society.picture} />
                      </figure>
                      <a href={"/c/?id="+society._id} className="recommended-item-a" style={{color:'black', fontWeight:'light'}}><section class="bio-box">
                          <dl class="details"> 
                              <h1 class="profile-name">{society.name}</h1>
                              <dd class="location">{society.college}</dd>
                          </dl>
                      </section></a>
                      <button class="close" onClick={shuffledPosts}>x</button>
                  </div>
                  ))}
                </div>
              )}
            
          </div>
          <a href="/communities"  className="explore-more">Explore More</a><br/><br/>
        </div>
     </StickyContainer>
 
    
    // <div className="recommended-container">
    //   <h5 className="-recommended-header">Communities</h5><hr/>
    //     {shuffledPosts.slice(0, size).map(society =>(
    //       <div key={society._id}>
    //       <a href={"/c/?id="+society._id} className="recommended-item-a"><div className="recommended-item">
    //         <div className="recommended-content">
    //           <p>{society.name} <span className="recommended-btn"><button className="community-btn-active">Join</button></span></p>
    //         </div>
            
    //       </div></a>
    //       </div>  ))}
    //       <br/>
    //       <a href="/communities"  className="explore-more">Explore More</a><br/><br/>
    // </div>

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