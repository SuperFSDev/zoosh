import React, {Fragment} from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import {Image, OverlayTrigger,Tooltip,Modal, Form, Container, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import {Helmet} from 'react-helmet';
import AdminPage from './AdminPage';
import moment from 'moment'
import { RiCake2Fill } from 'react-icons/ri'
import Event from '../../Common/StartEvent'
import {RiAddFill} from 'react-icons/ri'
import {BsChat} from 'react-icons/bs';
import cogoToast from 'cogo-toast'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton';

export default class CommunityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
      users:[],
      time:'',
      score:'',
      UserList:[],
      posts:[],
      events:[],
      questions:[],
      isLoading:true,
    };
   
  }
 
  async componentDidMount() {
      document.body.style.backgroundColor = "#FDFEFE";
      var society_id  = new URLSearchParams(this.props.location.search).get("id");
      await axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
      .then((response) => {
        this.setState({ society: response.data.society,
          users:response.data.society.users,
          mods:response.data.society.mods,
          admin:response.data.society.admin,
          isLoading:false,
          society: response.data.society})
          console.log(this.state.society.picture);
      })
      .catch((error) => {
        console.log(error);
      });


      axios.get('http://localhost:4000/discussions/get-society-discussions',{
        params: {
          society: society_id
        }
      })
      .then((response) => {
        this.setState({posts: this.state.posts.concat(response.data.discussion),})
      })
      .catch((error) => {
        console.log(error);
      });

    }

    

    addUser(soc) {
      addUserToSoc(soc);
      var user = JSON.parse(localStorage.getItem('user'));
    } 
      
    render(){
      var title = this.state.society.name + " - Website"
      var{users} = this.state;
      var { events } = this.state;
      var { questions } = this.state;

      let i, k = 0;
     
      var user = JSON.parse(localStorage.getItem('user'));
       
      const discussionList = this.state.posts.reverse().map(discussion => {
        return(
          <Fragment  key={discussion._id}>
          <Card className='discussion-post'>
            <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><CardContent>
              <span className="voting-btn">
                  <span class="showhim"><a href={"/me"} className="post-link-a"><b>{discussion.user}</b></a>
                  <span class="showme"> <b>{discussion.user}</b></span></span>
                    {discussion.society == null ? (
                      <span> in <b style={{color:'green'}}>General</b></span>
                    ) : (
                      <span> in <b style={{color:'green'}}>{discussion.society}</b></span>
                    )}<br/>
                    <span style={{color:'gray', fontSize:12}}>({moment(discussion.time).startOf('seconds').fromNow()})</span>
  
                      
                    {discussion.picture == null && <div></div> }  
                    {discussion.picture && <Image className="post-image" src={discussion.picture} /> } 
                  </span><br/>
                  <span  className="title-post">{discussion.title}</span><br/>
                  <span  className="content-post">{discussion.content.slice(0,200)}</span>
            </CardContent></a>
              <CardActions>
                <Button size="small" color="primary" onClick={() => {this.addToLikedPosts(discussion._id,user._id,discussion.likes)}}>
                  Like Post
                </Button>
  
                <Button size="small" color="primary" href={"/d/?id=" + discussion._id }>
                  <BsChat size={15} style={{marginRight:5}}/> Add Comment 
                </Button>
              </CardActions>
            </Card> 
        </Fragment>
          )})

      if(this.state.society.admin === user._id){
        return (
          <div>
              <AdminPage/>
          </div>
         
          );
      }

      else{
        return (
          <div>
            {/* REACTJS HELMET */}
            <Helmet>
                    <meta charSet="utf-8" />
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>{title}</title>

                    {/* LINKS */}
                    <link rel="canonical" href="http://mysite.com/example" />
                    <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
            </Helmet> 

            <Container fluid>
              <Row>
                <div className="community-header">
                  <span><Image src={this.state.society.picture} className="community-image" /></span>
                  <br/>
                  <h5 className="community-name">{this.state.society.name} </h5>
                  {this.state.society.description}
                  <br/>
                  <button className="follow-community" onClick={() => {this.addUser(this.state.society.society_id)}}>Follow</button>
                </div>  
              </Row>
    
                         
        <Row>
          <Col sm></Col>
          <Col sm>
            {this.state.isLoading &&  <div><br/><Skeleton height={200} width={700} style={{marginBottom:10}} count={5}/></div>}
            {!this.state.isLoading &&  <div>{discussionList}</div>}
          </Col>

          <Col sm>
            <div className="contributors-container">
              {/* {this.state.users.map(user=>(
                          <div className="community-members-item">
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{this.state.user.name}</Tooltip>}>
                              <a href={"/u/?id="+user._id}><Image src={user.pic} className="community-member-item-pic" roundedCircle /></a> 
                            </OverlayTrigger>
                          </div>
                        ))} */}
            </div>
          </Col>
          <Col sm></Col>

        </Row>

                
            </Container>

         
          </div>
        );
    } 
}
}


// Adding a User to a society array and adding the society to the users array
async function addUserToSoc(soc) {
  
  var getUser = JSON.parse(localStorage.getItem('user'))

  console.log(soc);
  console.log(getUser._id);

  const addUser = {
      society: soc,
      user: getUser._id,
  }

  // Adds user to users array in society model.
  await axios.post('http://localhost:4000/societies/update', addUser)
      .then(function (resp) {
          console.log(resp);
          cogoToast.success(
            <div>
              <h4>Welcome!</h4>
              <div>You successfully joined this society!</div>
            </div>
          );
      })
      .catch(function (error) {
          console.log(error);
      })


  // Adds society to societies array in user model.
  await axios.post('http://localhost:4000/users/addToSocList', addUser)
      .then(function (resp) {
          console.log(resp);

          // Update societies array in localStorage
          if(!getUser.societies.includes(soc)) {
              getUser.societies.push(soc);
          }
          console.log(getUser);
          localStorage.setItem('user', JSON.stringify(getUser))
      })
      .catch(function (error) {
          console.log(error);
      })
}