import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Image, Badge, Container, Row, Col} from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton';
import Avatar from '@material-ui/core/Avatar';
import Default from '../../images/defaults/default5.jpg'
import Default2 from '../../images/defaults/default1.jpg'

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

      var user = JSON.parse(localStorage.getItem('user'));
  
      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user._id,
          fields: 'fullname pic societies forums'
        }
      })
        .then((response) => {
          this.setState({ 
            user: response.data.user,             
            forums: response.data.user.forums,
            socs:response.data.user.societies
          })
        })
        .catch((error) => {
          console.log(error);
        });
  
        axios.get('http://localhost:4000/societies/get-societies', {
          params: {
            fields: 'name picture users score',
            limit: 10
          }
        })
        .then((response)=>{
            console.log(response);
            this.setState({societies: response.data.societies})
        })
        .catch((error)=>{
            console.log(error);
        });
  
        axios.get('http://localhost:4000/users/get-users', {
          params: {
            fields: 'pic fullname score'
          }
        })
        .then((response)=>{
            this.setState({
              users: response.data.users,
              isLoading:false
            })
        })
        .catch((error)=>{
            console.log(error);
        });
    
      }
      
render(){

  console.log(this.state.societies);
  console.log(this.state.users);

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
      <a href={"/u/?id="+user._id}className="nowrap"><div>
        <p className="nowrap"><span className="soc-leaderboard-name-item">
        {user.pic == null &&<Image src={user.pic} className="user-image-mini" roundedCircle />}
        {user.pic != null && <Image src={user.pic} className="user-image-mini" roundedCircle />}
        
        {user.fullname}</span>
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

    const topCommunities = societies.sort((a,b)=> b.score - a.score).map(society=> { 
      return(
      <div>
        <p className="nowrap"><a className="nowrap" href={"/c?id="+society._id}>
        {society.picture == null && <div><Image  src={Default2} className="user-image-mini" roundedCircle /></div>}
        {society.picture != null && <div><Image  src={society.picture} className="user-image-mini" roundedCircle /></div>}

        {society.name}</a> <b className="-contributor-user-score">{ society.score}</b></p><hr/>      
      </div>
    )})

    const topGrowingCommunities = societies.slice(0,10).sort((a,b)=> b.users.length - a.users.length).map(society=> { 
      return(
      <div>
        <p className="nowrap"><a className="nowrap" href={"/c?id="+society._id}><Image src={society.picture} className="user-image-mini" roundedCircle />{society.name}</a> <b className="-contributor-user-score">{ society.users.length}</b></p><hr/>      
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
          <Col>
          <div className="filter-options">

            </div>
            <div className="spacing"></div>
            {this.state.isLoading && 
            <div className="feed-skeleton-leaderboard">
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }}  />
                <Skeleton height={30} width={750} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={600} style={{ marginBottom: 10 }}  /><br/>
                <Skeleton height={30} width={800} style={{ marginBottom: 10 }}  /><br/>
            </div>}
            { !this.state.isLoading && <>

            <h1 className="leaderboard-heading">CONTRIBUTORS</h1>
            <div className="leaderboard">
              { !this.state.isLoading && <div>{topUsersList}</div>}
            </div>
            <h1 className="leaderboard-heading">COMMUNITIES</h1>
            <div className="leaderboard">
              { !this.state.isLoading && <div>{topCommunities}</div>}
            </div>
            <h1 className="leaderboard-heading">GROWING</h1>
            <div className="leaderboard">
              { !this.state.isLoading && <div>{topGrowingCommunities}</div>}
            </div>
            </>
            }
          </Col>


        </Row>
      </Container>   
  </div>
  );
}
}