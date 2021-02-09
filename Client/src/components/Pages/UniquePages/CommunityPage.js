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
var qs = require('qs');
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


  await axios.get('http://localhost:4000/discussions/get-society-discussions', {
    params: {
      society: this.state.society.name,
      fields: 'user society time thumbnail_pic title content likes comments user_id',
      sort: 'likes'
    }
  })
    .then((response) => {
      if (this.state.post == undefined) {
        this.setState({
          posts: response.data.discussions
        })
      } else {
        this.setState({
          posts: this.state.posts.concat(response.data.discussions)
        })
      }
    })
    .catch((error) => {
      console.log(error);
    });}
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
    console.log(this.state.posts)
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

          <Container>
            <Row>
              <Col>
              <div className="user-column-one">
                <p className="nowrap">
                  <figure class="headshot">
                    {this.state.society.picture == null && <Image className="user-image" alt="" src={Default} width={130} height={130} s />}
                    {this.state.society.picture != null && <Image className="user-image" alt="" src={this.state.society.picture}   width={130} height={130} />}
                  </figure>
                  <section class="bio-box">
                    <dl class="details"> 
                      <b className="user-name">{this.state.society.name}</b>
                      <button className="follow-btn" onClick={() => { this.addUserToSoc(this.state.society._id) }}>Follow</button>
                      <br/>
                      <span className="user-badge"><BsSquareFill/> Community</span>
                      <br/>
                        {this.state.users.length === 0 && <b>{this.state.users.length} members</b>}
                        {this.state.users.length > 1 && <b>{this.state.users.length} members</b>}
                        {this.state.users.length === 1 && <b>{this.state.users.length} member</b>}    
                      <br/><br/>
                      <br/>
                    </dl>
                  </section>
                </p>
              </div>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <div className="top-posts">
                  {this.state.isLoading &&
                    <div style={{height:1000}}>
                        <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }} />
                        <Skeleton height={30} width={350} style={{ marginBottom: 10 }} />
                        <Skeleton height={30} width={300} style={{ marginBottom: 10 }} /><br />
                        <Skeleton height={30} width={400} style={{ marginBottom: 10 }} /><br />
                        <Skeleton height={30} width={350} style={{ marginBottom: 10 }} /><br />
                    </div>}
                    {!this.state.isLoading && <div>{discussionList}</div>}
                    {this.state.posts.length === 0 && <div className="card-empty-community">No posts yet, follow this community and start posting!</div>}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}