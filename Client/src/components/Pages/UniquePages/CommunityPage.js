import React, { Fragment } from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import { Image, Container, Row, Col , Badge} from 'react-bootstrap'
import axios from 'axios';
import { Helmet } from 'react-helmet';
import AdminPage from './AdminPage';
import moment from 'moment'
import cogoToast from 'cogo-toast'
import Skeleton from 'react-loading-skeleton';
import Clap from '../../../images/clap.png'
import {BsSquareFill, BsHeart, BsChat} from 'react-icons/bs'
import Default from '../../../images/defaults/default1.jpg'

export default class CommunityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
      users: [],
      time: '',
      score: '',
      UserList: [],
      posts: [],
      events: [],
      questions: [],
      isLoading: true,
    };

  }

  async componentDidMount() {
    var society_id = new URLSearchParams(this.props.location.search).get("id");
    await axios.get('http://localhost:4000/societies/get-societies-page', {
      params: {
        id: society_id
      }
    })
      .then((response) => {
        this.setState({
          society: response.data.society,
          users: response.data.society.users,
          mods: response.data.society.mods,
          admin: response.data.society.admin,
          isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error);
      });


    axios.get('http://localhost:4000/discussions/get-society-discussions', {
      params: {
        society: society_id
      }
    })
      .then((response) => {
        this.setState({ posts: this.state.posts.concat(response.data.discussion) })
      })
      .catch((error) => {
        console.log(error);
      });

  }

  // Adding a User to a society array and adding the society to the users array
  async addUserToSoc(soc) {

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
        if (!getUser.societies.includes(soc)) {
          getUser.societies.push(soc);
        }
        console.log(getUser);
        localStorage.setItem('user', JSON.stringify(getUser))
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    var title = this.state.society.name + " - Website"
    // var{users} = this.state;

    var user = JSON.parse(localStorage.getItem('user'));

    const discussionList = this.state.posts.reverse().sort((a, b) => b.likes - a.likes).map(discussion => {
      return (
        <Fragment key={discussion._id}>

        <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><div class="card">
          <Image src={discussion.thumbnail_pic} className="post-img"/>
          <div class="container">
            <h3><b>{discussion.title}</b></h3> 
            <p className="nowrap"> <Image alt="" className="profile-btn-wrapper-left" src={discussion.user_pic}  roundedCircle /><b> @{discussion.user}</b></p> 
            <span>Posted in <b style={{ color: 'green' }}>
            {discussion.society == null ? (
              <span> in <b style={{ color: 'green' }}>General</b></span>
               ) : (
              <span> in <b style={{ color: 'green' }}>{discussion.society}</b></span>
              )}<br />
              </b></span><br/>
            <span style={{ color: 'gray', fontSize: 10 }}>({moment(discussion.time).startOf('seconds').fromNow()})</span><br/>
            <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                  {discussion.likes === 0 && <span> <BsHeart size={20} alt="" /> Be the first</span>}
                  {discussion.likes === 1 && <span> <BsHeart size={20} alt="" /> {discussion.likes}</span>}
                  {discussion.likes > 1 && <span> <BsHeart size={20} alt="" /> {discussion.likes}</span>}
                </button></a>


                <a href={"/d/?id=" + discussion._id}><button className="reaction-button" size="small" color="primary">
                  {discussion.comments.length === 0 && <span><BsChat size={20} /> Add comment</span>}
                  {discussion.comments.length === 1 && <span><BsChat size={20} /> {discussion.comments.length}</span>}
                  {discussion.comments.length > 1 && <span><BsChat size={20} /> {discussion.comments.length}</span>}
                </button></a>
          </div>
        </div></a><br/>
        </Fragment>
      )
    })


    if (this.state.society.admin === user._id) {
      return (
        <div>
          <AdminPage />
        </div>

      );
    }

    else {
      return (
        <div>
          {/* REACTJS HELMET */}
          <Helmet>
            <meta charSet="utf-8" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>

            {/* LINKS */}
            <link rel="canonical" href="http://mysite.com/example" />
            <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
          </Helmet>

          <Container fluid>
            <Row>
              <Col>
              <div className="community-column-one">
                {this.state.society.picture == null && <Image className="community-image" alt="" src={Default} width={130} height={130} s />}
                {this.state.society.picture != null && <Image className="community-image" alt="" src={this.state.society.picture}   width={130} height={130} />}
                    <dl class="details"> 
                      <b className="community-name">{this.state.society.name}</b>
                      <br/>
                      <span className="community-badge"><BsSquareFill/> Community</span>
                      <br/>
                      <button className="follow-community" onClick={() => { this.addUserToSoc(this.state.society._id) }}>Follow</button>
                        <br/>
                        {this.state.users.length === 0 && <Badge variant={this.state.society.color}><b>{this.state.users.length} members</b></Badge>}
                        {this.state.users.length > 1 && <b>{this.state.users.length} members</b>}
                        {this.state.users.length === 1 && <b>{this.state.users.length} member</b>}    
                      <br/><br/>
                      <hr/>
                      <br/>
                      <p>{this.state.society.description}</p>
                    </dl>
              </div>
              </Col>
              <Col sm={8}>
                <div className="top-posts">
                      {this.state.posts.length === 0 && <div className="card-empty">No posts yet, follow this community and start posting!</div>}
                      {this.state.isLoading && <div><br /><Skeleton height={200} width={700} className="top-posts-empty" count={5} /></div>}
                      {this.state.posts.length > 0 && <div>{discussionList}</div>}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}