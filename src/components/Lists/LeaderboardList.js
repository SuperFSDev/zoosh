import React from 'react';
import '../../App.css';
import axios from 'axios';

  class LeaderboardList extends React.Component {

    componentDidMount() {
      document.body.style.backgroundColor = "#f0f2f5";

      axios.get('http://localhost:4000/societies/getSocieties')
      .then((response)=>{
          this.setState({societies: response.data.societies})
      })
      .catch((error)=>{
          console.log(error);
      });

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
        societies:[],
        users:[],
        searchValue:''
      };
    }
    updateSearch(event){
      this.setState({searchValue: event.target.value.substr(0,20)});
    }
  
   
  
      render(){
        var{users} = this.state;
        let i = 0;
        let k = 0;
        let j = 0;
        let societies = this.state.societies.filter(
          (society)=>{
            return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase())!==-1;
          }
      
        );

          return (
          <>
          <div className="leaderboard-options">
            <a href="#users"><button className="btn-leaderboard" >Top Users</button></a>
            <a href="#top-comm"><button className="btn-leaderboard" >Top Communities</button></a>
            <a href="#growth"><button className="btn-leaderboard" >Top Growing</button></a>
            <div id="users"></div>
          </div>
          <div className="community-leaderboard">
            <h1 className="c-s-header" id="users">ON FIRE USERS 🔥</h1><br/>
              <div className="">
                {users.sort((a,b)=> b.score- a.score).map(user=>  ( 
                  <div className="">
                    <p><b>{i+=1}</b><a className="soc-leaderboard-name-item" href={"/u/?id="+user._id}>{user.fullname}</a> <b className="soc-leaderboard-score-item">{ user.score}</b></p><hr/>      
                  </div>
                ))}    
                <a href="#">See More</a>
              </div>
              <div id="top-comm"></div>
          </div>

          
          <div className="community-leaderboard">
            <h1 className="c-s-header" id="top-comm">TOP COMMUNITIES 📈</h1><br/>
              <div className="">
                {societies.sort((a,b)=> b.score - a.score).map(society=>  (
                  <div className="">
                    <p className="leaderboard-item"><b>{k+=1}</b><a className="soc-leaderboard-name-item" href={"/s?id="+society._id}>{society.name}</a> <b className="soc-leaderboard-score-item">{ society.score}</b></p><hr/>      
                  </div>
                ))}    
                <a href="#">See More</a>
              </div>
              <div id="growth"></div>
          </div>

          <div className="community-leaderboard">
            <h1 className="c-s-header">TOP GROWING COMMUNITIES 🌱</h1><br/>
              <div className="">
                {societies.sort((a,b)=> b.users.length - a.users.length).map(society=>  (
                  <div className="">
                    <p className="leaderboard-item"><b>{j+=1}</b><a className="soc-leaderboard-name-item" href={"/s?id="+society._id}>{society.name}</a> <b className="soc-leaderboard-score-item">{ society.users.length}</b></p><hr/>      
                  </div>
                ))}    
                <a href="#">See More</a>
              </div>
          </div>
      </>
        );
      }
    }

    export default LeaderboardList;