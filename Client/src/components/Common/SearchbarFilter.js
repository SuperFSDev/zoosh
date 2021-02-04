import React from 'react';
import '../../assets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap'
import axios from 'axios';


export default class SearchbarFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      user: '',
      following: [],
      followers: [],
      showFilter: false,
      searchValue: '',
      filterBy: '',
      users: [],
      discussions: [],
      societies: [],
    };
    this.showFilter = this.showFilter.bind(this);
    this.closeFilter = this.closeFilter.bind(this);
  }

  // SEARCH BAR DROPDOWN
  showFilter(event) {
    event.preventDefault();

    this.setState({ showFilter: true }, () => {
      document.addEventListener('click', this.closeFilter);
    });
  }

  closeFilter(event) {

    if (!this.dropdownMenu2.contains(event.target)) {

      this.setState({ showFilter: false }, () => {
        document.removeEventListener('click', this.closeFilter);
      });

    }
  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ id: user._id });

    // axios.get('http://localhost:4000/users/get-user-details', {
    //   params: {
    //     id: user._id
    //   }
    // })
    //   .then((response) => {
    //     this.setState({
    //       user: response.data.user,
    //       following: response.data.user.following,
    //       followers: response.data.user.followers,

    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

  }

  GetUsers() {
    axios.get('http://localhost:4000/users/get-users')
      .then((response) => {
        this.setState({ users: response.data.users })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  GetSocieties() {
    axios.get('http://localhost:4000/societies/get-societies')
      .then((response) => {
        this.setState({
          societies: response.data.societies,
          isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  GetDiscussions() {
    axios.get('http://localhost:4000/discussions/get-discussions', {
      params: {
        fields: 'title'
      }
    })
      .then((response) => {
        this.setState({
          discussions: response.data.discussions,
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

    var { users } = this.state;
    // var { discussions } = this.state;
    // var { societies } = this.state;

    let i = 0;
    var size1 = 2;
    var size2 = 1;
    // var postSize = 2;
    var indents = [];

    let filteredUsers = this.state.users.filter(
      (user) => {
        return user.fullname.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
      }
    );

    let filteredPosts = this.state.discussions.filter(
      (discussion) => {
        return discussion.title.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
      }
    );

    let filteredCommunities = this.state.societies.filter(
      (society) => {
        return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
      }
    );

    const shuffledUsers = shuffleArray(filteredUsers);
    const shuffledPosts = shuffleArray(filteredPosts);
    const shuffledCommunities = shuffleArray(filteredCommunities);


    for (var k = 0; k < 4; k++) {
      indents.push(users[1]);
    }

    return (
      <div>
        <input
          placeholder="Search…"
          className="navbar-search"
          inputProps={{ 'aria-label': 'search' }}
          id="mySearch" title="Type in a category" onClick={this.showFilter} onChange={this.updateSearch.bind(this)}
        />


        {/* SEARCH BAR FILTER */}
        {
          this.state.showFilter
            ? (
              <div className="searchFilter"
                ref={(element2) => {
                  this.dropdownMenu2 = element2;
                }}
              >
                <h5>Search Results</h5>
                <hr />
                <p className="searchbar-header">POSTS</p>
                {shuffledPosts.slice(0, size2).sort((a, b) => b.score - a.score).map(discussion => (
                  <a href={"/d/?id=" + discussion._id} style={{ color: 'black', textDecoration: 'none' }}><div key={k} className="contributor-item-search">
                    <p className="-contributor-user-search">
                      <span style={{ padding: 10, color: 'black', fontSize: 20 }}><b>{discussion.title}</b></span>
                      <p style={{ padding: 10, color: 'black', fontSize: 14 }}><b style={{ color: 'green' }}>{discussion.society}</b></p>

                    </p>
                  </div></a>
                ))}
                <p className="searchbar-header">COMMUNITIES</p>
                {shuffledCommunities.slice(0, size2).map(society => (
                  <a href={"/c/?id=" + society._id} style={{ color: 'black', textDecoration: 'none' }}><div key={k} className="contributor-item-search">
                    <p className="-contributor-user-search">
                      <span style={{ padding: 10, color: 'black', fontSize: 20 }}><b>{society.name}</b></span>
                    </p>
                  </div></a>
                ))}
                <p className="searchbar-header">USERS</p>
                {shuffledUsers.slice(0, size1).sort((a, b) => b.score - a.score).map(user => (
                  <a href={"/u/?id=" + user._id} style={{ color: 'black', textDecoration: 'none' }}><div key={i} className="contributor-item-search">
                    <p className="-contributor-user-search"><Image src={user.pic} className="user-image-mini" roundedCircle />{user.fullname} <b className="-contributor-user-score">{user.score}</b></p>
                  </div></a>
                ))}
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}


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
