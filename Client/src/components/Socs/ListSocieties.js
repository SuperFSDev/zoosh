import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Modal ,OverlayTrigger, Tooltip, Image} from 'react-bootstrap';
import CreateASoc from './CreateASoc'
import {FaUserFriends} from 'react-icons/fa'
import background from "../../images/group.jpg";
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
      // document.body.style.backgroundColor = "#FDFEFE";

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


      <div className="containerChartMiddle">
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
                    <Skeleton height={300} width={220} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={300} width={220} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={220} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={220} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={220} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={300} width={220} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={220} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={220} duration={1} className="skeleton-comms"/>
                    <Skeleton height={300} width={220} duration={1} className="skeleton-comms"/>  
                    <Skeleton height={300} width={220} duration={1} className="skeleton-comms"/>
                  </div>
                  
                </div>

              ) : (
                <div className="SocietyLayout">
                    {filteredSocietiesByName.map(society => (
                    <div key={society.id}>
                        <a href={"/c/?id=" +society._id} className="miniprofile-post-redirect"><div className="socs-list-items">
                          {society.picture == null ? (
                            <Image src={background} className="soc-item-image"/>
                          ) : (
                            <Image src={society.picture} className="soc-item-image"/>
                          )}
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