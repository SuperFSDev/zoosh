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
import {FaFacebook,FaTwitter,FaInstagram,FaLink} from 'react-icons/fa';
import {BsChat} from 'react-icons/bs';
import Avatar from '@material-ui/core/Avatar';
import {Navbar, Nav} from 'react-bootstrap'
import cogoToast from 'cogo-toast'
import Test from '../../../images/friends.jpg'

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
      showPeople:false,
      showStats:false,
      showEvents:false,
      showQuestions:false,
      showFeed:true,
      isLoading:true,
    };
   
  }
 
  async componentDidMount() {
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

      axios.get('http://localhost:4000/questions/get-society-questions',{
        params: {
          society: society_id
        }
      })
      .then((response) => {
        this.setState({questions: this.state.questions.concat(response.data.question),})
      })
      .catch((error) => {
        console.log(error);
      });


      axios.get('http://localhost:4000/events/get-society-events',{
        params: {
          society: society_id
        }
      })
      .then((response) => {
        this.setState({events: this.state.events.concat(response.data.event),})
      })
      .catch((error) => {
        console.log(error);
      });
    }

    

    addUser(soc) {
      addUserToSoc(soc);
      var user = JSON.parse(localStorage.getItem('user'));
    }

      ShowUsers() {
        this.setState({
          showPeople: true,
          showFeed: false,
          showEvents: false,
          showQuestions: false,
          showStats: false
          
        });   
        }

        
      ShowFeed() {
        this.setState({
          showPeople: false,
          showFeed: true,
          showEvents: false,
          showQuestions: false,
          showStats: false,
        });   
        }

      ShowEvents() {
        this.setState({
          showPeople: false,
          showFeed: false,
          showEvents: true,
          showQuestions: false,
          showStats: false,
        });   
      }


        
      ShowStats() {
        this.setState({
          showPeople: false,
          showFeed: false,
          showEvents: false,
          showQuestions: false,
          showStats: true,
        });   
        }

        
      ShowQuestions() {
        this.setState({
          showPeople: false,
          showFeed: false,
          showEvents: false,
          showQuestions: true,
          showStats: false,
        });   
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
    
            <div key={discussion._id}>
              <div className='discussion-post' style={{marginLeft:150}}>
                <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect">
                <Fragment>
                  <p>
                    <a href={"/me"} className="post-link-a"><span className="voting-btn">
                      <b style={{color:'#0693e3'}}>{discussion.user}</b> posted <span style={{color:'gray'}}>({moment(discussion.time).startOf('seconds').fromNow()})</span>
    
                      {/* {discussion.society == null ? (
                          <span> posted in <b style={{color:'green'}}>General</b></span>
                      ) : (
                        <span> posted in <b style={{color:'green'}}>{discussion.society}</b></span>
                      )} */}
                    </span></a><br/>
                    <span className="forum-title">{discussion.title.slice(0,35)}</span>
                    {discussion.picture == null ? (
                      <Fragment></Fragment>
                    ) : (
                      <Image className="post-image" src={discussion.picture} width={150} height={125}/>
                    )}<br/>
                    {/* <Image className="post-image" src={Test} width={150}/><br/> */}
                    <span className="post-content" style={{marginLeft:10}}>{discussion.caption}</span>

                    <small  className="text-muted">
                      <br/>
                      <button className="standard-option-btn-post"><BsChat size={22} /> {discussion.comments.length}</button>
                    
                    </small>
                  </p>
                </Fragment></a>
              </div>
            </div>
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
                <div className="community-header">
                  <span><Image src={this.state.society.picture} className="user-image" roundedCircle /></span>
                  <br/>
                  <h5>{this.state.society.name} </h5>
                </div>           

                <div className="community-options">
                  <span  className="comm-nav-item" onClick={() => {this.ShowUsers()}}>{this.state.users.length} Members</span>
                  <span  className="comm-nav-item" onClick={() => {this.ShowFeed()}}> Feed</span>
                  <span  className="comm-nav-item" onClick={() => {this.ShowQuestions()}}> Questions</span>
                  <span  className="comm-nav-item" onClick={() => {this.ShowStats()}}> Stats</span>
                </div>     
            </Container>

         
          </div>
        );
    } 
}
}

//  FUNCTIONS TO OPEN EVENT MODAL
function QuickEvent() {
  const [modalShow, setModalShowEvent] = React.useState(false);

  return (
    <div>
            <button className="standard-button"  onClick={() => setModalShowEvent(true)}>Create Event <RiAddFill size={25}/></button><br/><br/>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShowEvent(false)}
            />
    </div>
  );
}

function Question() {
  const [modalShowQuestion, setModalShowQuestion] = React.useState(false);

  return (
    <div>
            <button className="standard-button"  onClick={() => setModalShowQuestion(true)}>Ask a Question</button><br/><br/>

            <QuestionModal
                show={modalShowQuestion}
                onHide={() => setModalShowQuestion(false)}
            />
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
      >
        <Modal.Header closeButton>
            <Modal.Body>
                <Event/>
            </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }

  function QuestionModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
      >
        <Modal.Header closeButton>
          <Modal.Body>
              <Event/>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
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