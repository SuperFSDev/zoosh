import React, { Fragment } from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import { Image, Row, Col, Container, Badge, Modal, Button } from 'react-bootstrap'
import axios from 'axios';
import { Helmet } from 'react-helmet'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';
import { RiChat1Line } from 'react-icons/ri'
import Clap from '../../../images/clap.png'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Default from '../../../images/defaults/grey.jpg'
import cogoToast from 'cogo-toast'

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      society: '',
      score: [],
      users: [],
      UserList: [],
      mods: [],
      posts: [],
      pic: '',
      events: [],
      isLoading: true,
      id: '',
      user: '',
      following: [],
      followers: [],
    };
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.onMakeMod = this.onMakeMod.bind(this);
  }

  async componentDidMount() {

    var society_id = new URLSearchParams(document.location.search).get("id");

    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: user._id });

    axios.get('http://localhost:4000/societies/get-society-users', {
      params: { id: society_id }
    })
      .then((response) => {
        this.setState({ users: response.data.users })
      })
      .catch((error) => {
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
          users: response.data.society.users,
          admin: response.data.society.admin,
          mods: response.data.society.mods,
          score: response.data.society.score,
          isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error);
      });

    for (var i = 0; i < this.state.users.length; i++) {
      console.log(this.state.users);
      this.GetSocietyUser(this.state.users[i])
    }
  }

  async GetSocietyUser(user_id) {
    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user_id,
        fields: 'forums societies likedPosts username pic'
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

  onDeleteUser(Soc_id, user_id, SocName) {

    const deletedUser = {
      id: Soc_id,
      _id: user_id
    }

    const deletedSoc = {
      _id: user_id,
      socName: SocName
    }
    alert("Removed user " + user_id)

    axios.post('http://localhost:4000/societies/deleteUser', deletedUser)
      .then().catch();
    axios.post('http://localhost:4000/users/deleteSoc', deletedSoc)
      .then().catch();



    window.location = '/s/?id=' + Soc_id;



  }


  onMakeMod(Soc_id, user_id) {

    const Moderator = {
      id: Soc_id,
      _id: user_id
    }
    alert("Mod added " + user_id)
    axios.post('http://localhost:4000/societies/addMod', Moderator)
      .then().catch();
    window.location = '/s/?id=' + Soc_id;
  }


  CheckSociety(id, society_id) {
    return (<div>
      <button className="delete-btn" onClick={() => { this.DeleteCommunity(id, society_id) }}> Delete Community</button>
    </div>)
  }
  DeleteCommunity(id, society_id) {
    axios.delete('http://localhost:4000/societies/deleteSoc' + society_id)
      .then()
      .catch();
    window.location = '/';
  }

  render() {
    var title = this.state.society.name + " - Website"

    return (
      <Fragment>
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
                    {this.state.society.picture == null && <Image className="user-image" alt="" src={Default} width={150} height={150} s />}
                    {this.state.society.picture != null && <Image className="user-image" alt="" src={this.state.society.picture} width={150} height={150} />}
                  </figure>
                  <section class="bio-box">
                    <dl class="details2">
                      <b className="user-name">{this.state.society.name}</b>
                      <br />
                      <span className="user-badge">You're the Admin</span>
                      <span className="user-badge">
                        {this.state.users.length === 0 && <b>{this.state.users.length} members </b>}
                        {this.state.users.length > 1 && <b>{this.state.users.length} members </b>}
                        {this.state.users.length === 1 && <b>{this.state.users.length} member </b>}
                      </span>
                      <br />
                      <a href={"/admin/?id=" + this.state.society._id}><button className="community-btn-b" >Edit Community</button></a>
                      {this.CheckSociety(this.state.society.admin, this.state.society._id)}
                    </dl>
                  </section>
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <b className="user-bio">{this.state.society.description}</b>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
