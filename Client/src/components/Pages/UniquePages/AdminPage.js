import React, {Fragment} from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import {Image, Form, Tooltip, OverlayTrigger, Row, Col, Container} from 'react-bootstrap'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import moment from 'moment'
import { RiCake2Fill } from 'react-icons/ri'
import {FaFacebook,FaTwitter,FaInstagram,FaLink} from 'react-icons/fa'
import {BsChat,BsHouseFill} from 'react-icons/bs';
import Avatar from '@material-ui/core/Avatar';
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton';

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
      score: [],
      users:[],
      UserList:[],
      mods:[],
      posts:[],
      pic:'',
      events: [],
      isLoading:true,
      id: '',
      user: '',
      following:[],
      followers:[],
    };
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.onMakeMod = this.onMakeMod.bind(this);
  }

  async componentDidMount() {
    document.body.style.backgroundColor = "#F7F7F7";

    
      var society_id = new URLSearchParams(document.location.search).get("id");

      var user = JSON.parse(localStorage.getItem('user'));
      this.setState({ id: user._id });

      axios.get('http://localhost:4000/users/getUsers')
      .then((response)=>{
          this.setState({users: response.data.users})
      })
      .catch((error)=>{
          console.log(error);
      });

      
     await axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
        .then((response) => {
          this.setState({ society: response.data.society,
           users:response.data.society.users,
           admin:response.data.society.admin,
           mods:response.data.society.mods,
           score: response.data.society.score,  
           isLoading:false,
           society: response.data.society,
           mods:response.data.society.mods
          })
        })
        .catch((error) => {
          console.log(error);
        });
        
        for (var i = 0; i < this.state.users.length; i++) {
          this.GetFollowedUser(this.state.users[i]._id)
        } 


        axios.get('http://localhost:4000/discussions/get-society-discussions',{
          params: {
            society: this.state.society.name
          }
        })
        .then((response) => {
          this.setState({posts: this.state.posts.concat(response.data.discussion),})
        })
        .catch((error) => {
          console.log(error);
        });

    }

     async  GetFollowedUser(user_id){
    await axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id:user_id
        }
      })
        .then((response) => {
          this.setState({
            UserList: this.state.UserList.concat(response.data.user),
            score: response.data.user.score,  

          })
  
        })
        .catch((error) => {
          console.log(error);
        });
      }
      


    onDeleteUser(Soc_id,user_id,SocName) {

        const deletedUser = {
          id: Soc_id,
          _id:user_id       
      }


      const deletedSoc = {
        _id:user_id,
        socName:SocName    
    }
    alert("Removed user "+user_id)
   
        axios.post('http://localhost:4000/societies/deleteUser',deletedUser)
        .then().catch();
        axios.post('http://localhost:4000/users/deleteSoc',deletedSoc)
        .then().catch();



        window.location = '/s/?id='+Soc_id;



        }


    onMakeMod(Soc_id,user_id) {

        const Moderator = {
        id: Soc_id,
        _id:user_id       
        }
        alert("Mod added "+user_id)
          axios.post('http://localhost:4000/societies/addMod',Moderator)
          .then().catch();
          window.location = '/s/?id='+Soc_id;
          }
             
    render(){
      var title = this.state.society.name + " - Website"
      let i, k = 0;

      const discussionList = this.state.posts.reverse().map(discussion => {
        return(
    
            <div key={discussion._id}>
              <div className='discussion-post' style={{marginLeft:150}}>
                <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect">
                  <p>
                    <a href={"/me"} className="post-link-a"><span className="voting-btn">
                      <b style={{color:'#0693e3'}}>{discussion.user}</b> posted <span style={{color:'gray'}}>({moment(discussion.time).startOf('seconds').fromNow()})</span>
                    </span></a><br/>
                    <span className="forum-title">{discussion.title.slice(0,35)}</span>
                    {discussion.picture == null ? (
                      <div></div>
                    ) : (
                      <Image className="post-image" src={discussion.picture} width={150} height={125}/>
                    )}<br/>
                    <span className="post-content" style={{marginLeft:10}}>{discussion.caption}</span>

                    <small  className="text-muted">
                      <br/>
                      <button className="standard-option-btn-post"><BsChat size={22} /> {discussion.comments.length}</button>
                    
                    </small>
                  </p>
                </a>
              </div>
            </div>
          )})
      
        return (
          <Fragment>
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
        </Fragment>
        );
    } 
}