import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Image} from 'react-bootstrap'
import SkeletonUsers from '../Common/SkeletonUI/SkeletonUsers';

export default class ListSocieties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          societies:[],
          isLoading: true,
          users:[],
          user: '',
          searchValue: '',
          filterBy: '',
        };
      }

    componentDidMount() {
      document.body.style.backgroundColor = "#f0f2f5";

      axios.get('http://localhost:4000/users/getUsers')
      .then((response)=>{
          this.setState({users: response.data.users,
            isLoading: false})
      })
      .catch((error)=>{
          console.log(error);
      });
    
    
    }

    updateSearch(user) {
      this.setState({ searchValue: user.target.value.substr(0, 20) });
    }

render(){
  var{users} = this.state;
  var size = 10;
  const shuffledUsers = shuffleArray(users);


  let filteredUsers = this.state.users.filter(

    (user) => {
        return user.fullname.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
    }

  );

  if(this.state.isLoading){
      return (
        <div>
          <SkeletonUsers/>
        </div>
      )
  } else{
  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                      <meta charSet="utf-8" />
                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                      <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                      <title>Search - Users</title>

                      {/* LINKS */}
                      <link rel="canonical" href="http://mysite.com/example" />
                      <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                      <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
            </Helmet> 

        <div className="containerFeedLeft">
            <FeedOptions/>
        </div>

        <div className="containerFeedMiddle">
              <div className="global-feed">
                <h3>Meet the Community</h3>
                  <div className="container-square">
                    <div className="search-div-square">
                        <input className="searchbar-nav-square" type="text" id="mySearch" onChange={this.updateSearch.bind(this)} placeholder="Search for a user " title="Type in a category"/>
                    </div>
                  </div>  
              </div>

              <div className="UsersLayout">
              {filteredUsers.slice(0,size).map(user => (
                <div key={user.id}>
                  <a href={"/u/?id=" +user._id} className="comm-link"><div className="users-list-items">
                    <h5>{user.fullname}</h5>
                      <Image src={user.pic} className="user-image-square" roundedCircle/><br/><br/>
                      <b className="user-score">{user.score}</b>
                  </div></a>
                </div>
              ))}
              </div>
        </div>         
  </div>
    );
   }
  }
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