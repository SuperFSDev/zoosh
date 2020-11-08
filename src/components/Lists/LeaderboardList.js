import React from 'react';
import '../../App.css';
import {Table, Breadcrumb, Nav} from 'react-bootstrap'
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
        let societies = this.state.societies.filter(
          (society)=>{
            return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase())!==-1;
          }
      
        );
          return (
          <>
          <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Leaderboard</Breadcrumb.Item>
            </Breadcrumb>
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
                  {societies.map(society=>  (
                          <tr>
                            <td>{society.id}</td>
                            <td><a href="/profile">{society.name}</a></td>
                            <td>{society.college}</td>
                            <td>{society.score}</td>

                          </tr>
                ))}    
              </tbody>
            </table>
          
          {/* <table className="-l-board-t-setup">
            <thead>
                <tr>
                  <th>Rank</th><th>Group</th><th>Category</th><th>Growth</th>
                </tr>
            </thead>
            {societies.map(society=>  (
              <div key={society.id}>
                    <tbody className="-leaderboard-i-list">
                      <tr>
                        <td><Nav.Link href="#">{society.name}</Nav.Link></td>
                        <td>{society.category}</td>
                      </tr>
                    </tbody>
              </div>
            ))}    
          </table>  */}
      </>
        );
      }
    }

    export default LeaderboardList;