import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Modal ,OverlayTrigger, Tooltip, Image} from 'react-bootstrap';
import CreateASoc from './CreateASoc'
import {FaUserFriends} from 'react-icons/fa'
import background from "../../images/group.jpg";
import {BsMic,BsPeople,BsColumnsGap,BsCalendar,BsChatSquareDots,BsBarChart,BsCardText,BsTag,BsXDiamond} from 'react-icons/bs'
import Avatar from '@material-ui/core/Avatar';
import Skeleton from 'react-loading-skeleton';

export default class ListSocieties extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      societies: [],
      searchValue: '',
      filterBy: '',
      isLoading: true,
      user: '',
      socs:[],
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }


    componentDidMount() {
      document.body.style.backgroundColor = "#FCFCFC";

      var user = JSON.parse(localStorage.getItem('user'));
      this.setState({ id: user._id });

      axios.get('http://localhost:4000/users/get-user-details', {
          params: {
              id: user._id
          }
      })
        .then((response) => {
            this.setState({ user: response.data.user,
                following: response.data.user.following,
                socs:response.data.user.societies

            })
        })
        .catch((error) => {
            console.log(error);
        });
    
        axios.get('http://localhost:4000/societies/getSocieties')
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
  
      updateSearch(event) {
        this.setState({ searchValue: event.target.value.substr(0, 20) });
      }
    
      handleDropdownChange(e) {
        this.setState({ filterBy: e.target.value });
      }
    
      addUser(soc) {
        addUserToSoc(soc);
      }

render(){
  var user = JSON.parse(localStorage.getItem('user'));
  if(user) 
  {
      var fullname = user.fullname;
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

  
  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Communities - Website</title>
        </Helmet> 

      <div className="containerFeedLeft">
        <div className="feed-options-container">
                  <div className="feed-options-item">
                      <a href="/me" className="feed-option-redirects-username"><div className="user-profile-container">
                          <Avatar src={user.pic} className="profile-btn-wrapper-left"/> <p className="uname-feed">{user.fullname}  
                              {user.score >= 1 && user.score <=999 ? (
                                  <span> <b className="user-member">{user.score}</b><br/></span>

                              ) : user.score >=1000 ?(
                                  <span> <b  className="user-mod">{user.score}</b><br/></span>
                              ) : user.score >= 5000 ? (
                                  <span> <b  className="user-admin">{user.score}</b><br/></span>
                              ) : (
                                  <span> <b>{user.score}</b><br/></span>
                              )}
                          </p>
                      </div></a>
                      <hr/><a href="/home" className="feed-option-redirects"><div className="option-container">
                          <BsColumnsGap size={30}/> <b className="feed-option-item">Feed</b>
                      </div></a>
                      <a href="/communities" className="feed-option-redirects-active"><div className="option-container-active">
                          <BsXDiamond size={30}/> <b className="feed-option-item">Communities</b>
                      </div></a>
                      <a href="/users" className="feed-option-redirects"><div className="option-container">
                        <BsPeople size={30}/> <b className="feed-option-item">Users</b>
                      </div></a>
                      <a href="/communities" className="feed-option-redirects"><div className="option-container">
                          <BsTag size={30}/> <b className="feed-option-item">Tags</b>
                      </div></a>
                      <hr/>
                
                      <a href="/forums" className="feed-option-redirects"><div className="option-container">
                          <BsChatSquareDots size={30}/> <b className="feed-option-item">Forums</b>
                      </div></a>
                      <a href="/events" className="feed-option-redirects"><div className="option-container">
                          <BsCalendar size={30}/> <b className="feed-option-item">Events</b>
                      </div></a>
                      <a href="/podcasts" className="feed-option-redirects"><div className="option-container">
                          <BsMic size={30}/> <b className="feed-option-item">Podcasts</b>
                      </div></a>
                      <a href="/listings" className="feed-option-redirects"><div className="option-container">
                          <BsCardText size={30}/> <b className="feed-option-item">Listings</b>
                      </div></a>
                      
                      <a href="/leaderboard" className="feed-option-redirects"><div className="option-container">
                          <BsBarChart size={30}/> <b className="feed-option-item">Leaderboard</b>
                      </div></a><hr/>
                      
                      <div className="option-container">
                          <b  className="-top-cont-header">Your Communities - {this.state.socs.length}</b>
                          {this.state.socs.map(soc=>
                                    <li><a href={"/s/?id="+soc._id}>{soc}</a></li>)}<br/>
                      </div>
                  </div>
            </div>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed"  style={{ backgroundImage: `url(${background})`}}>
              <h3>Communities</h3>
          <div className="search-div">
          <input className="searchbar-nav" type="text" id="mySearch" value={this.state.searchValue} onChange={this.updateSearch.bind(this)} placeholder="Search for a community " title="Type in a category"
          />
          <select id="dropdown" onChange={this.handleDropdownChange} className="filterBox" placeholder="Filter">
            <option value="n/a">All</option>
            <option value="Name">Name</option>
            <option value="College">College</option>
            <option value="Category">Category</option>

          </select><br/><br/>
            <QuickOptions/>
        </div>

          {/* <QuickEvent/> */}
        </div>

        { this.state.isLoading ? ( 
                <div>
                  <br/>
                  <div className="SocietyLayout">
                    <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={250} duration={1} className="skeleton-comms"/>
                  </div>
                  
                </div>

              ) : (
                <div className="SocietyLayout">
                    {filteredSocietiesByName.map(society => (
                    <div key={society.id}>
                        <a href={"/c/?id=" +society._id} className="miniprofile-post-redirect"><div className="socs-list-items">
                          <Image src={background} className="soc-item-image"/>
                          <h5><b>{society.name}</b> - {society.college} </h5>
                          <p>{society.description}</p>  

                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Members</Tooltip>}>
                                    <span className="d-inline-block">
                                    <p maxLength={10}><FaUserFriends size={20}/> {society.users.length}</p>     
                                    </span>
                            </OverlayTrigger>   
                            {/* <div >
                              <span>
                                  <button className="soc-item-list-join-btn" onClick={() => this.addUser(society.name)}>Join Community</button>
                              </span>
                            </div> */}
                        </div></a>
                    </div>
                    ))}
                    </div>
              )}
        
      </div>
      {/* <div className="global-feed">
            <div className="SocietyLayout">
                {filteredSocietiesByName.map(society => (
                <div key={society.id}>
                    <a href={"/c/?id=" +society._id} className="comm-link"><div className="socs-list-items">
                    <h5>{society.name}</h5>
                        <p><b>{society.college}</b></p>  
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Members</Tooltip>}>
                                <span className="d-inline-block">
                                <p maxLength={10}><FaUserFriends size={20}/> {society.users.length}</p>     
                                </span>
                        </OverlayTrigger>    
                        <div >
                        <span>
                            <button className="soc-item-list-join-btn" onClick={() => this.addUser(society.name)}>Join</button>
                        </span>
                        </div>
                    </div></a>
                </div>

                ))}
                </div>
            </div> */}
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
              <button className="standard-button" onClick={() => setModalShow(true)}>Create a Community</button>
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
            <h3>Create a Community</h3>
          </Modal.Header>
          <Modal.Body>
              <CreateASoc/>
          </Modal.Body>
        </Modal>
      );
    }
  
  
    // Adding a User to a society array and adding the society to the users array
    async function addUserToSoc(soc) {
  
      var getUser = JSON.parse(localStorage.getItem('user'))
  
      const addUser = {
          society: soc,
          user: getUser,
          user_id: getUser._id,
      }
  
      // Adds user to users array in society model.
      await axios.post('http://localhost:4000/societies/update', addUser)
          .then(function (resp) {
              console.log(resp);
              alert("Successfully joined " + soc);
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