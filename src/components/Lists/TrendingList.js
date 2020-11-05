import React from 'react';
import '../../App.css';
import {Breadcrumb, Nav} from 'react-bootstrap'
import axios from 'axios';
import LeaderboardOptions from './Leaderboard-options'

  class TrendingList extends React.Component {

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
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/list-of-clubs-and-societies">All Clubs and Societies</Breadcrumb.Item>
                    <Breadcrumb.Item active>Trending</Breadcrumb.Item>            
          </Breadcrumb>

          <LeaderboardOptions/>

          <table className="-l-board-t-setup">
            <thead>
                <tr>
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
          </table>   
      </>
        );
      }
    }

    export default TrendingList;