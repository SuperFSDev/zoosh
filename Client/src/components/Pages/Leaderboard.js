import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Image} from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';
import {BsMic,BsPeople,BsColumnsGap,BsCalendar,BsChatSquareDots,BsBarChart,BsCardText,BsTag,BsXDiamond} from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton';

export default class Two extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      societies:[],
      users:[],
      searchValue:'',
      isLoading:true,
      user: '',
      socs:[],
    };
  }

    componentDidMount() {
      document.body.style.backgroundColor = "#FDFEFE";

      var user_id = new URLSearchParams(this.props.location.search).get("id");
  
  
      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
        }
      })
  
        .then((response) => {
          this.setState({ user: response.data.user,
                          forums: response.data.user.forums,
                          socs:response.data.user.societies

  
          })
        })
        .catch((error) => {
          console.log(error);
        });
  
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

  var user = JSON.parse(localStorage.getItem('user'));
  if(user) 
  {
      var fullname = user.fullname;
  }

  var{users} = this.state;
    let i = 0;
    let k = 0;
    let j = 0;
    let societies = this.state.societies.filter(
    (society)=>{
        return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase())!==-1;
    }
      
    );

    const topUsersList = users.slice(0,10).sort((a,b)=> b.score- a.score).map(user=>  {
      return( 
      <a href={"/u/?id="+user._id}><div>
        <p className="leaderboard-item"><b>{i+=1}</b><span className="soc-leaderboard-name-item"><Image src={user.pic} className="user-image-mini" roundedCircle />{user.fullname}</span>
          {user.score >= 1 && user.score <=999 ? (
            <span  className="-contributor-user-score"><b className="user-member">{ user.score}</b><br/></span>
          ) : user.score >=1000 ?(
              <span  className="-contributor-user-score"><b  className="user-mod">{ user.score}</b><br/></span>
          ) : user.score >= 5000 ? (
              <span  className="-contributor-user-score"><b  className="user-admin">{ user.score}</b><br/></span>
          ) : (
              <span className="-contributor-user-score"><b  className="user-member">{ user.score}</b><br/></span>
          )} 
          {/* <b className="soc-leaderboard-score-item">{ user.score}</b> */}
        </p><hr/>      
      </div></a> 
    )})

    const topCommunities = societies.slice(0,10).sort((a,b)=> b.score - a.score).map(society=> { 
      return(
      <div>
        <p className="leaderboard-item"><b>{k+=1}</b><a className="soc-leaderboard-name-item" href={"/s?id="+society._id}>{society.name}</a> <b className="soc-leaderboard-score-item">{ society.score}</b></p><hr/>      
      </div>
    )})

    const topGrowingCommunities = societies.slice(0,10).sort((a,b)=> b.users.length - a.users.length).map(society=> { 
      return(
      <div>
        <p className="leaderboard-item"><b>{j+=1}</b><a className="soc-leaderboard-name-item" href={"/s?id="+society._id}>{society.name}</a> <b className="soc-leaderboard-score-item">{ society.users.length}</b></p><hr/>      
      </div>
    )})


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
      <div className="feed-options-container">
                  <div className="feed-options-item">
                      <a href="/me" className="feed-option-redirects-username"><div className="user-profile-container">
                          <Avatar src={user.pic} className="profile-btn-wrapper-left"/> <p className="uname-feed">{user.fullname}  
                              {user.score >= 1 && user.score <=999 ? (
                                  <span> <b className="user-member">{user.score}</b><br/></span>

                              ) : user.score >=1000 ?(
                                  <span> <b  className="user-mod">{user.score}</b><br/></span>
                              ) : user.score >= 5000 ? (
                                  <span> <b  className="user-admin">{user.score}</b><br/></span>
                              ) : (
                                  <span> <b>{user.score}</b><br/></span>
                              )}
                          </p>
                      </div></a>
                      <hr/><a href="/home" className="feed-option-redirects"><div className="option-container">
                          <BsColumnsGap size={30}/> <b className="feed-option-item">Feed</b>
                      </div></a>
                      <a href="/communities" className="feed-option-redirects"><div className="option-container">
                          <BsXDiamond size={30}/> <b className="feed-option-item">Communities</b>
                      </div></a>
                      <a href="/users" className="feed-option-redirects"><div className="option-container">
                        <BsPeople size={30}/> <b className="feed-option-item">Users</b>
                      </div></a>
                      <a href="/communities" className="feed-option-redirects"><div className="option-container">
                          <BsTag size={30}/> <b className="feed-option-item">Tags</b>
                      </div></a>
                      <hr/>
                
                      <a href="/forums" className="feed-option-redirects"><div className="option-container">
                          <BsChatSquareDots size={30}/> <b className="feed-option-item">Forums</b>
                      </div></a>
                      <a href="/events" className="feed-option-redirects"><div className="option-container">
                          <BsCalendar size={30}/> <b className="feed-option-item">Events</b>
                      </div></a>
                      <a href="/podcasts" className="feed-option-redirects"><div className="option-container">
                          <BsMic size={30}/> <b className="feed-option-item">Podcasts</b>
                      </div></a>
                      <a href="/listings" className="feed-option-redirects"><div className="option-container">
                          <BsCardText size={30}/> <b className="feed-option-item">Listings</b>
                      </div></a>
                      
                      <a href="/leaderboard" className="feed-option-redirects-active"><div className="option-container-active">
                          <BsBarChart size={30}/> <b className="feed-option-item">Leaderboard</b>
                      </div></a><hr/>
                      
                      <div className="option-container">
                          <b  className="-top-cont-header">Your Communities - {this.state.socs.length}</b>
                          {this.state.socs.map(soc=>
                                    <li><a href={"/s/?id="+soc._id}>{soc}</a></li>)}<br/>
                      </div>
                  </div>
            </div>
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
            <h1 className="c-s-header" id="users">TOP CONTRIBUTORS</h1><br/>
              {this.state.isLoading ? ( 
                    <div className="SocietyLayout">
                      <Skeleton height={50} width={900} count={5} duration={1} className="skeleton-comms"/>  
                  </div>

                  ) : (
                    topUsersList
                  )}
                <a href="#" id="dropdown-basic">See More</a>
              <div id="top-comm"></div>
          </div>

          
          <div className="container-individual">
            <h1 className="c-s-header" id="top-comm">TOP COMMUNITIES <span role="img" aria-label="trend">📈</span></h1><br/>
              <div className="">
              {this.state.isLoading ? ( 
                    <div className="SocietyLayout">
                      <Skeleton height={50} width={900} count={10} duration={1} className="skeleton-comms"/>  
                  </div>

                  ) : (
                    topCommunities
                  )}
                
                <a href="#" id="dropdown-basic">See More</a>
              </div>
              <div id="growth"></div>
          </div>

          <div className="container-individual">
            <h1 className="c-s-header">TOP GROWING COMMUNITIES <span role="img" aria-label="growth">🌱</span></h1><br/>
              <div className="">
                {this.state.isLoading ? ( 
                      <div className="SocietyLayout">
                        <Skeleton height={50} width={900} count={10} duration={1} className="skeleton-comms"/>  
                    </div>

                    ) : (
                      topGrowingCommunities
                    )}
                <a href="#" id="dropdown-basic">See More</a>
              </div>
          </div>
        
            </div>
      </div>
  </div>
  );
}
}