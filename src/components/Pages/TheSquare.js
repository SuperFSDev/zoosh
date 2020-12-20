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
                      <title>The Square</title>

                      {/* LINKS */}
                      <link rel="canonical" href="http://mysite.com/example" />
                      <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                      <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
            </Helmet> 

          <div className="container-square">
            <h1 className="c-s-header" id="users">The Square</h1><br/>

            <div className="search-div-square">
                <input className="searchbar-nav-square" type="text" id="mySearch" onChange={this.updateSearch.bind(this)} placeholder="Search for a user " title="Type in a category"/>
            </div>
              <div className="">
                {users.map(user=>  ( 
                  <div key={user.id}>
                    <a className="soc-leaderboard-name-item" href={"/u/?id="+user._id}><p className="leaderboard-item">
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{user.fullname}</Tooltip>}>
                        <span className="d-inline-block">
                            <Image src={user.pic} className="user-image-square"/>
                        </span>
                        </OverlayTrigger>
                        <a className="soc-leaderboard-name-item" href={"/u/?id="+user._id}>{user.fullname}</a> 
                        <b className="user-score">{ user.score}</b>
                    </p></a><hr/>      
                  </div>
                ))}    
              </div>
          </div>
      </>
        );
      }
    }

    export default TheSquare;