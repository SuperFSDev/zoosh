import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Image, Badge, Container, Row, Col} from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'

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
      document.body.style.backgroundColor = "#F7F7F7";

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

    const topUsersList = users.slice(0,5).sort((a,b)=> b.score- a.score).map(user=>  {
      return( 
      <a href={"/u/?id="+user._id}><div>
        <p className="leaderboard-item"><b className="chart-left">{i+=1}</b><span className="soc-leaderboard-name-item"><Image src={user.pic} className="user-image-mini" roundedCircle />{user.fullname}</span>
          {user.score >= 1 && user.score <=999 ? (
            <span  className="-contributor-user-score"><b className="user-member">{ user.score}</b><br/></span>
          ) : user.score >=1000 ?(
              <span  className="-contributor-user-score"><b  className="user-mod"><Badge>{ user.score}</Badge></b><br/></span>
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
        <p className="leaderboard-item"><b  className="chart-left">{k+=1}</b><a className="soc-leaderboard-name-item" href={"/c?id="+society._id}>{society.name}</a> <b className="soc-leaderboard-score-item">{ society.score}</b></p><hr/>      
      </div>
    )})

    const topGrowingCommunities = societies.slice(0,10).sort((a,b)=> b.users.length - a.users.length).map(society=> { 
      return(
      <div>
        <p className="leaderboard-item"><b  className="chart-left">{j+=1}</b><a className="soc-leaderboard-name-item" href={"/c?id="+society._id}>{society.name}</a> <b className="soc-leaderboard-score-item">{ society.users.length}</b></p><hr/>      
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
                <title>Charts - Website</title>
        </Helmet>

        <Container>
        <Row>
          <Col sm></Col>
          <Col sm>
          <div className="filter-options">
              <a href="#top"><button className="feed-option">Top Contributors</button></a>
              <a href="#communities"><button className="feed-option">Top Communities</button></a>
              <a href="#growing"><button className="feed-option">Top Growing</button></a>

            </div>
            <br/>
            <Skeleton height={50} width={700} style={{ marginBottom: 10 }} count={15} />

           
          </Col>

          <Col sm><Recommended/><Contributors/></Col>
          <Col sm></Col>

        </Row>
      </Container>   
  </div>
  );
}
}