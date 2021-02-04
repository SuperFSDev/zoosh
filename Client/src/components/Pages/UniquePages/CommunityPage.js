import React, {Fragment} from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import {Image, Container, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import {Helmet} from 'react-helmet';
import AdminPage from './AdminPage';
import moment from 'moment'
import cogoToast from 'cogo-toast'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from 'react-loading-skeleton';
import { RiChat1Line } from 'react-icons/ri'
import Clap from '../../../images/clap.png'

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
    document.body.style.backgroundColor = "#F7F7F7";
      var society_id  = new URLSearchParams(this.props.location.search).get("id");
      await axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
      .then((response) => {
        this.setState({ 
          society: response.data.society,
          users:response.data.society.users,
          mods:response.data.society.mods,
          admin:response.data.society.admin,
          isLoading:false,
        })
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
    } 
      
    render(){
      var title = this.state.society.name + " - Website"
      // var{users} = this.state;
     
      var user = JSON.parse(localStorage.getItem('user'));

          const discussionList = this.state.posts.reverse().sort((a, b) => b.likes - a.likes).map(discussion => {
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
                      {discussion.picture && <Image className="post-image" src={discussion.picture} height="90px" width="90px"/>} 
                    </span><br />
                    <span className="title-post">{discussion.title}</span><br />
                    <span className="content-post">{discussion.content.slice(0, 200)}</span>
                  </CardContent></a>
                  <CardActions>
                    {this.isLiked(discussion._id, user._id, discussion.likes)}
                    <a  href={"/d/?id=" + discussion._id }><button className="reaction-button" size="small" color="primary" onClick={() => {this.addToLikedPosts(discussion._id,user._id,discussion.likes)}}>
                      {discussion.likes === 0 && <></>}
                      {discussion.likes > 0 && <span> <Image src={Clap} size={20} /> {discussion.likes} reactions</span>}
                    </button></a>
      
                    <a  href={"/d/?id=" + discussion._id }><button className="reaction-button" size="small" color="primary">
                      <RiChat1Line size={20}/> 
                      {discussion.comments.length === 0 && <span> Add comment</span>}
                      {discussion.comments.length === 1 && <span> {discussion.comments.length} comment</span>}
                      {discussion.comments.length > 1 && <span> {discussion.comments.length} comments</span>}
      
                    </button></a>
      
                    {this.CheckPost(discussion.user_id, discussion._id)}
                  </CardActions>
      
                </Card>
      
              </Fragment>
            )
          })
      

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
                  
                  <div className="community-header" style={{background:this.state.society.color}}>
                    <Col md>
                      
                    <div className="community-profile">

                      <span>
                        <Image alt={this.state.society.name} src={this.state.society.picture} className="community-image" />                      
                        <button className="follow-community" onClick={() => {this.addUser(this.state.society.society_id)}}>Follow</button>
                      </span>
                      
                      <br/>
                      <h5 className="community-name">{this.state.society.name} </h5>
                      {this.state.society.description}
                      <br/>
                      {this.state.users.length === 0 && <b>{this.state.users.length} members</b>}
                      {this.state.users.length > 1 && <b>{this.state.users.length} members</b>}
                      {this.state.users.length === 1 && <b>{this.state.users.length} member</b>}                      <br/>
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