import React from 'react';
import axios from 'axios';
import { StickyContainer } from 'react-sticky';
import Skeleton from 'react-loading-skeleton';
import {Image} from 'react-bootstrap'
import {IoMdPlanet} from 'react-icons/io'

export default class Recommended extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      societies: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/societies/get-explore-societies')
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
  var size = 2;
  const shuffledPosts = societies; //shuffleArray(societies);

   return (
    <StickyContainer>
        <div>
            <div className="recommended-container">
              <div className="column-head">
                <p className="column-title"><IoMdPlanet size={20}/> EXPLORE</p><hr/>
              </div>
            
            {this.state.isLoading ? ( 
                <div>
                  <Skeleton height={140} style={{marginBottom:10}} count={1}/><br/>
                </div>

              ) : (
                <div>
                  {shuffledPosts.slice(0, size).map(society =>(
                    <a  href={"/c/?id="+society._id} aria-label="Community" rel="noopener" className="recommended-item-a" style={{color:'black', fontWeight:'light'}}><div class="miniprofileCommunity">
                      <figure class="headshot">
                          <Image src={society.picture} className="user-image-mini"  alt=""/>
                      </figure>
                      <a href={"/c/?id="+society._id} aria-label="Community" rel="noopener" className="recommended-item-a" style={{color:'black', fontWeight:'light'}}><section class="bio-box">
                          <dl class="details"> 
                              <h1 class="profile-name">{society.name}</h1>
                          </dl>
                      </section></a>
                  </div></a>
                  ))}
                </div>
              )}
          <a href="/explore"  className="explore-more">Explore More</a><br/><br/>

          </div>
        </div>
     </StickyContainer>
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
            //alert("Successfully joined " + soc);
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


/*// Return a random society from the array - Shuffles them
function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}*/