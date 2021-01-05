import React from 'react';
import '../../App.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Image,OverlayTrigger,Tooltip} from 'react-bootstrap'

  class TheSquare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          societies:[],
          users:[],
          searchValue: '',
          filterBy: '',
          user: '',
        };
      }

    componentDidMount() {
      document.body.style.backgroundColor = "#f0f2f5";

      axios.get('http://localhost:4000/users/getUsers')
      .then((response)=>{
          this.setState({users: response.data.users})
      })
      .catch((error)=>{
          console.log(error);
      });
    
    
    }
 
    updateSearch(event){
      this.setState({searchValue: event.target.value.substr(0,20)});
    }
  
   
      render(){
          
        var{users} = this.state;

        // users = this.state.users.filter(

        //     (user) => {
        //         let filter = this.state.filterBy;
        //         if (filter === "Name") {
        //           return user.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
          
        //         }  else {
          
        //           return user.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
        //         }
        //       }
        
        //   );

          return (
          <>
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
          <div className="container-square">
            <div className="search-div-square">
                <input className="searchbar-nav-square" type="text" id="mySearch" onChange={this.updateSearch.bind(this)} placeholder="Search for a user " title="Type in a category"/>
            </div>
          <div className="UsersLayout">
            {users.map(user => (
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
      </>
        );
      }
    }

    export default TheSquare;