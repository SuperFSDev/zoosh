import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import { Image, Row, Col, Container } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton';
import Default from '../../images/defaults/default5.jpg'

export default class ListSocieties extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      societies: [],
      isLoading: true,
      users: [],
      user: '',
      searchValue: '',
      filterBy: '',
      socs: [],

    };
  }

  async componentDidMount() {
    
    await axios.get('http://localhost:4000/users/get-users-list')
      .then((response) => {
        console.log(response);
        this.setState({
          users: response.data.users,
          isLoading: false
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateSearch(user) {
    this.setState({ searchValue: user.target.value.substr(0, 20) });
  }

  render() {
    var size = 20;

    let filteredUsers = this.state.users.filter(

      (user) => {
        return user.fullname.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
      }

    );

    const shuffledUsers = shuffleArray(filteredUsers);


    // Display the users from Database
    const usersList = shuffledUsers.slice(0, size).map(user => {
      return (
        <div key={user.id}>
          <a href={"/u/?id=" + user._id} className="comm-link"><div className="users-list-items">
            <p>
              {user.pic == null && <Image src={Default} className="user-image-square" roundedCircle />}
              {user.pic != null && <Image src={user.pic} className="user-image-square" roundedCircle />}
              <br/>
              <span>{user.fullname}</span>
            </p>
          </div></a>
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
          <title>Search - Users</title>

          {/* LINKS */}
          <link rel="canonical" href="http://mysite.com/example" />
          <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet>

        <Container>
          <Row>
            <Col >
              <div className="search-div">
                <div className="container-square">
                  <div className="search-div-square">
                    <input className="searchbar-nav" type="text" id="mySearch" onChange={this.updateSearch.bind(this)} placeholder="Search for a user " title="Type in a category" />
                  </div><hr/>
                </div>
              </div>

              <div className="UsersLayout">
                {this.state.isLoading ? (
                  <div>
                    <br />
                    <div className="UsersLayout">
                      <Skeleton height={140} width={180} duration={1} className="skeleton-comms" />
                      <Skeleton height={140} width={180} duration={1} className="skeleton-comms" />
                      <Skeleton height={140} width={180} duration={1} className="skeleton-comms" />
                      <Skeleton height={140} width={180} duration={1} className="skeleton-comms" />
                      <Skeleton height={140} width={180} duration={1} className="skeleton-comms" />
                      <Skeleton height={140} width={180} duration={1} className="skeleton-comms" />
                      <Skeleton height={140} width={180} duration={1} className="skeleton-comms" />
                      <Skeleton height={140} width={180} duration={1} className="skeleton-comms" />
                    </div>

                  </div>

                ) : (
                    usersList
                  )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


// Return a random society from the array - Shuffles them
function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}