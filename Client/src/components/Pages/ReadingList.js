import React, { Fragment } from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { Row, Col, Container } from 'react-bootstrap'

export default class ReadingList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      societies: [],
      isLoading: true,
      users: [],
      searchValue: '',
      filterBy: '',
      readingList: [],
      posts: [],
      user: '',
    };
  }

  async componentDidMount() {
    document.body.style.backgroundColor = "#F7F7F7";
    var user = JSON.parse(localStorage.getItem('user'));
    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id,

      }
    })
      .then((response) => {
        this.setState({
          user: response.data.user,
          readingList: response.data.user.readingList,
        })
      })
      .catch((error) => {
        console.log(error);
      });


    for (var i = 0; i < this.state.readingList.length; i++) {
      this.GetReadingList(this.state.readingList[i])
    }

  }

  async GetReadingList(readingList) {
    await axios.get('http://localhost:4000/discussions/get-discussion-page', {
      params: {
        id: readingList,
      }
    })
      .then((response) => {
        if (response.data.discussion == null) {
          this.checkIfNull(readingList)
        }
        else {
          this.setState({
            posts: this.state.posts.concat(response.data.discussion),
            isLoading: false,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  checkIfNull(discussion) {
    var user = JSON.parse(localStorage.getItem('user'));

    const removeDiscussion = {
      id: user._id,
      discussion: discussion,
    }
    // Adds the discussion to liked list
    axios.post('http://localhost:4000/users/removeFromReadingList', removeDiscussion)
      .then(function (resp) {
        console.log(resp);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  updateSearch(event) {
    this.setState({ searchValue: event.target.value.substr(0, 20) });
  }

  render() {

    // var{users} = this.state;
    console.log(this.state.posts);
    return (
      <Fragment>
        {/* REACTJS HELMET */}
        <Helmet>
          <meta charSet="utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Search - Users</title>

          {/* LINKS */}
          <link rel="canonical" href="http://mysite.com/example" />
          <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet>

        <Container>
          <Row>
            <Col sm></Col>
            <Col sm>
              <div className="dashboard">
                <h3 className="heading">Reading List ({this.state.readingList.length})</h3><hr /><br />
                {this.state.posts.slice(0, 10).reverse().map(post => (
                  <Fragment key={this.state.user._id}>
                    <a href={"/d/?id=" + post._id} style={{ textDecoration: 'none' }}>
                      <p>
                        <span className="forum-title" style={{ color: 'black' }}>{post.title}</span><br />
                        <small>{moment(post.time).format(" MMM Do")} ({moment(post.time).startOf('seconds').fromNow()})</small><br />
                        {post.society == null ? (
                          <span>Posted in<b style={{ color: 'green' }}> General</b><br /></span>
                        ) : (
                            <span >Posted in <b style={{ color: 'green' }}>{post.society}</b><br /></span>
                          )}
                      </p><hr />
                    </a>
                    {/* <h1></h1> */}
                  </Fragment>
                ))}
              </div>
            </Col>
            <Col sm></Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}