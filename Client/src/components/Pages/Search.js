import React  from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Modal, Row, Col, Container, Image} from 'react-bootstrap';
import CreateCommunity from '../Common/CreateCommunity'
import Skeleton from 'react-loading-skeleton';
import Default from '../../images/defaults/grey.jpg'
import {  BsHeart } from 'react-icons/bs'

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      societies: [],
      searchValue: '',
      filterBy: '',
      isLoading: true,
      user: '',
      socs:[],
      users: [],
      discussions: [],
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }


    componentDidMount() {
      var user = JSON.parse(localStorage.getItem('user'));
      this.setState({ id: user._id });
      this.GetUsers();
      this.GetDiscussions();

      axios.get('http://localhost:4000/users/get-user-details', {
          params: {
              id: user._id
          }
      })
        .then((response) => {
            this.setState({ 
                user: response.data.user,
                following: response.data.user.following,
                socs:response.data.user.societies

            })
        })
        .catch((error) => {
            console.log(error);
        });
    
        axios.get('http://localhost:4000/societies/get-societies', {
          params: {
            fields: 'name picture color description users'
          }
        })
          .then((response) => {
            console.log(response.data);
            this.setState({ 
              societies: response.data.societies,
              isLoading: false,
             })
          })
          .catch((error) => {
            console.log(error);
          });
      }
  
      updateSearch(event) {
        this.setState({ searchValue: event.target.value.substr(0, 20) });
      }
    
      handleDropdownChange(e) {
        this.setState({ filterBy: e.target.value });
      }
    
      addUser(soc) {
        addUserToSoc(soc);
      }

      GetUsers() {
        axios.get('http://localhost:4000/users/get-users', {
          params: {
            fields: '_id fullname pic'
          }
        })
          .then((response) => {
            this.setState({
              users: response.data.users,
            })
          })
          .catch((error) => {
            console.log(error);
          });
      }

      GetDiscussions() {
        axios.get('http://localhost:4000/discussions/get-discussions', {
          params: {
            fields: '_id title society likes time'
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

render(){

  var { users } = this.state;
  let i = 0;
  var size1 = 2;
  var size2 = 6;
  // var postSize = 2;
  var indents = [];

  for (var k = 0; k < 4; k++) {
    indents.push(users[1]);
  }
  let filteredSocietiesByName = this.state.societies.filter(

        (society) => {
          let filter = this.state.filterBy;
          if (filter === "Name") {
            return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
  
          } if (filter === "College") {
            return society.college.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
  
          }
          if (filter === "Category") {
            return society.category.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
  
          } else {
  
            return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
          }
        }
  
      );
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

    const shuffledUsers = shuffleArray(filteredUsers);
    const shuffledPosts = shuffleArray(filteredPosts);
  
  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Explore / Zoosh</title>
        </Helmet> 

      <Container>
        <Row>
          <Col>
          <h1 style={{fontSize:60}}>Search</h1>
          <div className="search-div">
            <input className="searchbar-nav" type="text" value={this.state.searchValue} onChange={this.updateSearch.bind(this)} placeholder="Search for anything " title="Type in a category"
              /><hr/>
            </div>
            <br/>

            {this.state.isLoading && <div>
              <Skeleton height={200} width={350} duration={1} count={3} style={{marginLeft:15}}/>
            </div> }
            
            <div className="spacing"></div>
            <div className="feed-badge-search"><h2>Users</h2></div><br/>
            <div className="SocietyLayout">
            

                {shuffledUsers.slice(0, size2).sort((a, b) => b.score - a.score).map(user => (
                    <div key={user.id}>
                        <a href={"/u/?id=" +user._id} aria-label="community" rel="noopener" className="miniprofile-post-redirect">
                        <div class="miniprofileCommunities">
                        <div className="column-head-user"/>
                        
                        {user.pic == null && <Image  className="soc-item-image" alt="" src={Default}/>}
                        {user.pic != null && <Image  className="soc-item-image" alt="" src={user.pic}/>}
                        <h3><b>{user.fullname}</b></h3>
                        </div>
                        </a>
                    </div>
                    ))}
              </div>

            <div className="spacing"></div>
            <div className="feed-badge-search"><h2>Communities</h2></div><br/>
            <div className="SocietyLayout">
                
                {filteredSocietiesByName.map(society => (
                    <div key={society.id}>
                        <a href={"/c/?id=" +society._id} aria-label="community" rel="noopener" className="miniprofile-post-redirect">
                        <div class="miniprofileCommunities">
                        <div className="column-head-comm"/>
                        
                        {society.picture == null && <Image  className="soc-item-image" alt="" src={Default}/>}
                        {society.picture != null && <Image  className="soc-item-image" alt="" src={society.picture}/>}
                        <h3><b>{society.name}</b></h3>
                        <p><b>{society.users.length} members</b></p>
                        </div>
                        </a>
                    </div>
                    ))}
              </div>
            
            <div className="spacing"></div>
            <div className="feed-badge-search"><h2>Posts</h2></div><br/>
            <div className="SocietyLayout">
                {shuffledPosts.slice(0, size2).sort((a, b) => b.score - a.score).map(discussion => (
                    <div key={discussion.id}>
                        <a href={"/d/?id=" +discussion._id} aria-label="community" rel="noopener" className="miniprofile-post-redirect">
                        <div class="miniprofileCommunities">                        
                        <h3><b>{discussion.title}</b></h3>
                        <p style={{ padding: 10, color: 'black', fontSize: 14 }}><b style={{ color: 'green' }}>{discussion.society}</b></p>
                        <h3><BsHeart size={25}/> <b>{discussion.likes}</b></h3>
                        </div>
                        </a>
                    </div>
                    ))}
              </div>
          </Col>
        </Row>
      </Container>    
  </div>
  );
}
}


// MODAL TO CREATE SOCIETY/CLUB
function QuickOptions() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <div>
          <div>
              <button className="write-button" onClick={() => setModalShow(true)}>Create a Community</button>
              <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
              />
          </div>
      </div>
    );
  }
  
  // MODEL HANDLE
  function MyVerticallyCenteredModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          textAlign="left"
        >
          <Modal.Header closeButton>
            <h5>Create a Community</h5>
          </Modal.Header>
          <Modal.Body>
              <CreateCommunity/>
          </Modal.Body>
        </Modal>
      );
    }
  
  
    // Adding a User to a society array and adding the society to the users array
    async function addUserToSoc(soc) {
  
      var getUser = JSON.parse(localStorage.getItem('user'))
  
      const addUser = {
          society: soc._id,
          user: getUser._id,
      }
  
      // Adds user ID to users array in society model.
      await axios.post('http://localhost:4000/societies/update', addUser.user)
          .then(function (resp) {
              console.log(resp);
              //alert("Successfully joined " + soc);
          })
          .catch(function (error) {
              console.log(error);
          })
  
  
      // Adds society ID to societies array in user model.
      await axios.post('http://localhost:4000/users/addToSocList', addUser.society)
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