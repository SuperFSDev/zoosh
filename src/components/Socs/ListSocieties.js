import React from 'react';
import '../../App.css';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import LeaderboardOptions from '../Lists/Leaderboard-options'

class Daily extends React.Component {


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
  var{societies} = this.state;
  let filteredSocietiesByName = this.state.societies.filter(
    (society)=>{
      return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase())!==-1;
    }

  );
  return (
    
    <>
      <div>
          <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>All Clubs and Societies</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <div className="search-div">
            <input className="searchbar-nav" type="text" id="mySearch" value={this.state.searchValue} onChange={this.updateSearch.bind(this)} placeholder="Search a Club/Society" title="Type in a category"/>
        </div>
        <LeaderboardOptions/>
      <div>  




      
      <div className="SocietyLayout">
           
        {filteredSocietiesByName.map(society=>  (
<div key={society.id}>
        <Nav.Link href="/"><div className="python-card">
          <h1>{society.name}</h1> 
          <h4>{society.category}</h4>         
        </div></Nav.Link>
        </div>
        
        ))}    
          </div>  
        </div> 

        
      
        

      

     

    </>
 );
}
}
export default Daily;
