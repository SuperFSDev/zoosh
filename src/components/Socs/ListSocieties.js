import React from 'react';
import '../../App.css';
import {Modal ,OverlayTrigger, Tooltip} from 'react-bootstrap';
import axios from 'axios';
import CreateASoc from './CreateASoc'
import {FaUserFriends} from 'react-icons/fa'

export default class Daily extends React.Component {

  componentDidMount() {
    document.body.style.backgroundColor = "#f0f2f5";

    axios.get('http://localhost:4000/societies/getSocieties')
      .then((response) => {
        this.setState({ societies: response.data.societies })
      })
      .catch((error) => {
        console.log(error);
      });
  }


  constructor(props) {
    super(props);
    this.state = {
      societies: [],
      searchValue: '',
      filterBy: ''
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
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

  render() {

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

      <>
         <div>
         
        </div>
        <div className="search-div">
          <input className="searchbar-nav" type="text" id="mySearch" value={this.state.searchValue} onChange={this.updateSearch.bind(this)} placeholder="Search a Club/Society " title="Type in a category"
          />
          <select id="dropdown" onChange={this.handleDropdownChange} className="filterBox" placeholder="Filter">
            <option value="n/a">All</option>
            <option value="Name">Name</option>
            <option value="College">College</option>
            <option value="Category">Category</option>

          </select> 
            <QuickOptions/>
        </div>

        {/* <div>
          <div className="socs-options-btns">
            <button className="trending-soc"><Nav.Link href="/list-of-clubs-and-societies">All</Nav.Link></button>
            <button className="trending-soc"><Nav.Link href="/trending"><MdShowChart/> Trending</Nav.Link></button>
            <button className="trending-soc"><Nav.Link href="/new"><HiOutlineFire/> New</Nav.Link></button>
          </div>
        </div> */}
        
        <div>
        <div className="SocietyLayout">

          {filteredSocietiesByName.map(society => (
            <div key={society.id}>
              <div className="socs-list-items">
                 <a href={"/s/?id=" +society._id}><h5>{society.name}</h5></a>
                  {/* <p>{society.category}</p>                     */}
                  <p><b>{society.college}</b></p>  
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Members</Tooltip>}>
                            <span className="d-inline-block">
                            <p maxLength={10}><FaUserFriends size={20}/> {society.users.length}</p>     
                          </span>
                  </OverlayTrigger>    
                  <div >
                    <span>
                      <button className="soc-item-list-join-btn" onClick={() => this.addUser(society.name)}>Join</button>
                      {/* <a href={"/s/?id=" +society._id}><button className="soc-item-list-visit-btn">Visit</button></a> */}
                    </span>
                  </div>
                  {/* <span><button className="soc-item-list-join-btn">Join</button><button className="soc-item-list-visit-btn">Visit</button></span>         */}
              </div>
            </div>

          ))}
          </div>
        </div>
      </>
    );
  }
}


// MODAL TO CREATE SOCIETY/CLUB
function QuickOptions() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
        <div>
            <button className="trending-soc" onClick={() => setModalShow(true)}>Create Community</button>
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
          <h3>Create Community</h3>
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