import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import { Image, Container, Row, Col } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton';
import Default from '../../images/defaults/gray.png'

export default class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      societies: [],
      users: [],
      searchValue: '',
      isLoading: true,
      user: '',
      socs: [],
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
          socs: response.data.user.societies
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
      .then((response) => {
        console.log(response);
        this.setState({ societies: response.data.societies })
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:4000/users/get-users', {
      params: {
        fields: 'pic fullname score'
      }
    })
      .then((response) => {
        this.setState({
          users: response.data.users,
          isLoading: false
        })
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {

    console.log(this.state.societies);
    console.log(this.state.users);

    var { users } = this.state;
    let i = 0;
    let k = 0;
    let j = 0;

    let societies = this.state.societies.filter(
      (society) => {
        return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
      }

    );

    const topGrowingCommunities = societies.slice(0, 10).sort((a, b) => b.users.length - a.users.length).map(society => {
      return (
        <div>
          <p className="nowrap"><a className="nowrap" href={"/c?id=" + society._id}>
            {(society.picture == null || society.picture == "") && <Image className="user-image-mini" alt="" src={Default} />}
            {(society.picture != null && society.picture != "") && <Image className="user-image-mini" alt="" src={society.picture} />}
            {/* <Image src={society.picture} className="user-image-mini"  /> */}
            <span style={{ marginLeft: 20 }}>{society.name}</span></a>
            <b className="-contributor-user-score">{society.users.length} members</b></p><hr />
        </div>
      )
    })


    return (
      <div>
        {/* REACTJS HELMET */}
        <Helmet>
          <meta charSet="utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Leaderboard / Zoosh</title>
        </Helmet>

        <Container>
          <Row>
            <Col>
              <div className="filter-options">

              </div>
              <div className="spacing"></div>
              {this.state.isLoading &&
                <div className="feed-skeleton-leaderboard">
                  <Skeleton circle={true} height={30} width={30} style={{ marginRight: 10 }} />
                  <Skeleton height={30} width={750} style={{ marginBottom: 10 }} /><br />
                  <Skeleton height={30} width={600} style={{ marginBottom: 10 }} /><br />
                  <Skeleton height={30} width={800} style={{ marginBottom: 10 }} /><br />
                </div>}
              {!this.state.isLoading && <>

                <h1 className="leaderboard-heading">Top Communities</h1>
                <div className="spacing"></div>
                <div className="leaderboard">
                  {!this.state.isLoading && <div>{topGrowingCommunities}</div>}
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