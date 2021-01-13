import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Modal, Image} from 'react-bootstrap'
import Event from '../Common/StartEvent'
import {RiAddFill} from 'react-icons/ri'
import moment from 'moment'
import SkeletonUsers from '../Common/SkeletonUI/SkeletonUsers';

export default class Tutor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          societies:[],
          isLoading: true,
          users:[],
          searchValue: '',
          filterBy: '',
          user: '',
        };
      }

    componentDidMount() {
      document.body.style.backgroundColor = "#f0f2f5";

      axios.get('http://localhost:4000/users/getUsers')
      .then((response)=>{
          this.setState({users: response.data.users,
            isLoading: false})
      })
      .catch((error)=>{
          console.log(error);
      });
    
    
    }

render()

{var{users} = this.state;
if(this.state.isLoading){
    return (
      <div>
        <SkeletonUsers/>
      </div>
    )
} else{
  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Events - Website</title>
        </Helmet> 

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
          <h3>Listings</h3>
          <br/>
          <QuickEvent/>
          {/* <div className="search-div-forum">
            <input className="searchbar-nav-forum" type="text" id="mySearch"  placeholder="Search for a Subject " title="Type in a category" autofocus/><br/><br/>
          </div> */}
            

          </div>

          <div className="post-option-btns">
            <div className="options-container-listings">
                      <button className="community-btn" >Find a Tutor</button>
                      <button className="community-btn">Collaboration</button>
                      <button className="community-btn">Seeking Mentorship</button>
                      <button className="community-btn">Offering Mentorship</button>
            </div>        
          </div>

            <div>
              <div className="EventSocietyLayout">
              {users.reverse().map(user => (
              <div key={user._id}>
                  <a href={"/u/?id=" +user._id}><div>
                    <div className="events-card">
                        <Image className="user-image-square" roundedCircle src={user.pic}/>
                        <h3>{user.fullname}</h3>
                        <p><b>Subject:</b> Maths</p>
                        <p><b>Rate:</b> €10/hr</p>
                        <p>This is a description of the tutor.</p>

                        <div >
                        </div>
                    </div>
                  </div></a>
              </div>
              ))}
            </div>
        </div>
      </div>
  </div>
  );
}
}
}


//  FUNCTIONS TO OPEN EVENT MODAL
function QuickEvent() {
  const [modalShow, setModalShowEvent] = React.useState(false);

  return (
    <div>
            <button className="standard-button"  onClick={() => setModalShowEvent(true)}>Create a Listing <RiAddFill size={25}/></button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShowEvent(false)}
            />
    </div>
  );
}

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
          <Modal.Body>
              <Event/>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }
