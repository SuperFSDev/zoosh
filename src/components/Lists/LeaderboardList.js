import React from 'react';
import '../../App.css';
import axios from 'axios';

  class LeaderboardList extends React.Component {

    componentDidMount() {
      axios.get('http://localhost:4000/societies/getSocieties')
      .then((response)=>{
          this.setState({societies: response.data.societies})
      })
      .catch((error)=>{
          console.log(error);
      });
    
    
    }
    constructor(props) {
      super(props);
      this.state = {
        societies:[],
        searchValue:''
   
      
        
      };
    }
    updateSearch(event){
      this.setState({searchValue: event.target.value.substr(0,20)});
    }
  
   
  
      render(){
        let i = 0;
        let societies = this.state.societies.filter(
          (society)=>{
            return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase())!==-1;
          }
      
        );
          return (
          <>
            <div className="leaderboard">
              <h1 className="c-s-header">TOP CLUBS AND SOCIEITIES</h1>
              <table class="container">
              <thead>
                <tr>
                  <th><h1>Rank</h1></th>
                  <th><h1>Name</h1></th>
                  <th><h1>College/University</h1></th>
                  <th><h1>Score</h1></th>
                </tr>
              </thead>
              <tbody>
                {societies.sort((a,b)=> b.score - a.score).map(society=>  (
                  <tr>
                    <td>{i+=1}</td>
                    <td><a  href={"/s?id="+society._id}>{society.name}</a></td>
                    <td>{society.college}</td>
                    <td>{society.score}</td>
                  </tr>
                  ))}    
              </tbody>
            </table>
            </div>
            

                      <div>
                        <h1 className="c-s-header">TOP COMMUNITY</h1>
                        <div className="contributors-container-leaderboard">
                              <div className="contributor-item-community">
                              {societies.map(society=>  (
                                <tr>
                                  <p><b>1</b><a className="-contributor-user" href={"/s?id="+society._id}>{society.name}</a><b  className="-contributor-user-score">123</b></p><hr/>
                                  </tr>))}  
                              </div>
                        </div>
                      </div>
                     

              {/* <div className="contributors-container-leaderboard">
                            <div className="contributor-item-community">
                                <p><b>1</b><a className="-contributor-user" href="/profile">Aaron Moran</a><b  className="-contributor-user-score">123</b></p><hr/>
                                <p><b>2</b><a className="-contributor-user"  href="/profile">John Doe</a><b  className="-contributor-user-score">123</b></p><hr/>
                                <p><b>3</b><a className="-contributor-user"  href="/profile">Conor Shortt</a><b  className="-contributor-user-score">123</b></p><hr/>
                                <p><b>4</b><a className="-contributor-user"  href="/profile">Mary Jane</a><b  className="-contributor-user-score">123</b></p><hr/>
                                <p><b>5</b><a className="-contributor-user"  href="/profile">Thomas Kenny</a><b  className="-contributor-user-score">123</b></p><hr/>
                                <a href="#">See More</a>

                            </div>
              </div> */}  
      </>
        );
      }
    }

    export default LeaderboardList;