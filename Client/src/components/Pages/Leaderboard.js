import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Image} from 'react-bootstrap'
import SkeletonLeaderboard from '../Common/SkeletonUI/SkeletonLeaderboard';

export default class Two extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      societies:[],
      users:[],
      searchValue:'',
      isLoading:true,
    };
  }

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
            this.setState({users: response.data.users,isLoading:false,})
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
        let i = 0;
        let k = 0;
        let j = 0;
        let societies = this.state.societies.filter(
          (society)=>{
            return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase())!==-1;
          }
      
        );

  if(this.state.isLoading){
    return (
      <div>
        <SkeletonLeaderboard/>
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
                <title>Events - Website</title>
        </Helmet> 

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
          <div className="leaderboard-options">
            <a href="#users"><button className="btn-leaderboard" >Top Users</button></a>
            <a href="#top-comm"><button className="btn-leaderboard" >Top Communities</button></a>
            <a href="#growth"><button className="btn-leaderboard" >Top Growing</button></a>
            <div id="users"></div>
          </div>
          <div className="container-individual">
            <h1 className="c-s-header" id="users">ON FIRE USERS <span role="img" aria-label="fire">🔥</span></h1><br/>
              <div className="">
                {users.sort((a,b)=> b.score- a.score).map(user=>  ( 
                  <div>
                    <p className="leaderboard-item"><b>{i+=1}</b><a className="soc-leaderboard-name-item" href={"/u/?id="+user._id}><Image src={user.pic} className="user-image-mini" roundedCircle />{user.fullname}</a> <b className="soc-leaderboard-score-item">{ user.score}</b></p><hr/>      
                  </div>
                ))}    
                <a href="#" id="dropdown-basic">See More</a>
              </div>
              <div id="top-comm"></div>
          </div>

          
          <div className="container-individual">
            <h1 className="c-s-header" id="top-comm">TOP COMMUNITIES <span role="img" aria-label="trend">📈</span></h1><br/>
              <div className="">
                {societies.sort((a,b)=> b.score - a.score).map(society=>  (
                  <div>
                    <p className="leaderboard-item"><b>{k+=1}</b><a className="soc-leaderboard-name-item" href={"/s?id="+society._id}>{society.name}</a> <b className="soc-leaderboard-score-item">{ society.score}</b></p><hr/>      
                  </div>
                ))}    
                <a href="#" id="dropdown-basic">See More</a>
              </div>
              <div id="growth"></div>
          </div>

          <div className="container-individual">
            <h1 className="c-s-header">TOP GROWING COMMUNITIES <span role="img" aria-label="growth">🌱</span></h1><br/>
              <div className="">
                {societies.sort((a,b)=> b.users.length - a.users.length).map(society=>  (
                  <div>
                    <p className="leaderboard-item"><b>{j+=1}</b><a className="soc-leaderboard-name-item" href={"/s?id="+society._id}>{society.name}</a> <b className="soc-leaderboard-score-item">{ society.users.length}</b></p><hr/>      
                  </div>
                ))}    
                <a href="#" id="dropdown-basic">See More</a>
              </div>
          </div>
        
            </div>
      </div>
  </div>
  );
}
}
}