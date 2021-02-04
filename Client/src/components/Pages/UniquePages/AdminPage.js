import React, {Fragment} from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import {Image, Row, Col, Container} from 'react-bootstrap'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';
import { RiChat1Line } from 'react-icons/ri'
import Clap from '../../../images/clap.png'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
          this.setState({ 
           society: response.data.society,
           users:response.data.society.users,
           admin:response.data.society.admin,
           mods:response.data.society.mods,
           score: response.data.society.score,  
           isLoading:false,
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
    
      const discussionList = this.state.posts.map(discussion => {
        return (
          <Fragment key={discussion._id}>
            <Card className='discussion-post'>
              <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><CardContent>
                <span className="voting-btn">
                  <span class="showhim"><a href={"/me"} className="post-link-a"><b>{discussion.user}</b></a>
                    <span class="showme"> <b>{discussion.user}</b></span></span>
                  {discussion.society == null ? (
                    <span> in <b style={{ color: 'green' }}>General</b></span>
                  ) : (
                      <span> in <b style={{ color: 'green' }}>{discussion.society}</b></span>
                    )}<br />
                  <span style={{ color: 'gray', fontSize: 10 }}>({moment(discussion.time).startOf('seconds').fromNow()})</span>
  
  
                  {discussion.picture == null && <div></div>} 
                  {discussion.picture && <Image alt="Thumbnail" className="post-image" src={discussion.picture} height="90px" width="90px"/>} 
                </span><br />
                <span className="title-post">{discussion.title}</span><br />
                <span className="content-post">{discussion.content.slice(0, 200)}</span>
              </CardContent></a>
              <CardActions>
                <a  href={"/d/?id=" + discussion._id }><button className="reaction-button" size="small" color="primary" >
                  {discussion.likes === 0 && <></>}
                  {discussion.likes > 0 && <span> <Image alt="Clap" src={Clap} size={20} /> {discussion.likes} reactions</span>}
                </button></a>
  
                <a  href={"/d/?id=" + discussion._id }><button className="reaction-button" size="small" color="primary">
                  <RiChat1Line size={20}/> 
                  {discussion.comments.length === 0 && <span> Add comment</span>}
                  {discussion.comments.length === 1 && <span> {discussion.comments.length} comment</span>}
                  {discussion.comments.length > 1 && <span> {discussion.comments.length} comments</span>}
  
                </button></a>
  
              </CardActions>
  
            </Card>
  
          </Fragment>
        )
      })
      
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
                  <div className="community-header" style={{background:this.state.society.color}}>
                    <Col md>
                    <div className="community-profile">
                      <span>
                        <Image alt={this.state.society.name} src={this.state.society.picture} className="community-image-admin" />
                        <button className="follow-community">Community Settings</button>

                        </span>
                      <br/>
                      <h5 className="community-name">{this.state.society.name} </h5>
                      {this.state.society.description}
                      <br/>
                    </div>
                    </Col>
                  </div>
                </Row>

                <Row>
                  <Col sm></Col>
                  <Col sm>
                  <div className="community-feed">
                        <div className="top-posts">
                          {this.state.posts.length === 0 && <div className="top-posts-empty">No Posts</div>}
                          {this.state.isLoading &&  <div><br/><Skeleton height={200} width={700} style={{marginBottom:10}} count={5}/></div>}
                          {!this.state.isLoading &&  <div>{discussionList}</div>}
                        </div>
                    </div>
                  </Col>

                  <Col sm>
                    <div className="community-members-container">
                      Members

                    </div>
                  </Col>
                  <Col sm></Col>
                </Row>
            </Container>
        </Fragment>
        );
    } 
}