import React , {Fragment} from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Modal} from 'react-bootstrap'
import {RiAddFill} from 'react-icons/ri'
import CreateListing from '../Common/CreateListing'
import Skeleton from 'react-loading-skeleton';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import SearchbarFilter from '../Common/SearchbarFilter'

export default class Tutor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          societies:[],
          isLoading: true,
          listings:[],
          searchValue: '',
          filterBy: '',
          user: '',
          socs: [],
        };
      }

    componentDidMount() {
      
      document.body.style.backgroundColor = "#F7F7F7";
      var user_id = new URLSearchParams(this.props.location.search).get("id");
  
  
      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
        }
      })
  
        .then((response) => {
          this.setState({ user: response.data.user,
                          forums: response.data.user.forums,
                          socs:response.data.user.societies
          })
        })
        .catch((error) => {
          console.log(error);
        });

      axios.get('http://localhost:4000/listings/getListings')
      .then((response)=>{
          this.setState({
            listings: response.data.listings,
            isLoading: false})
      })
      .catch((error)=>{
          console.log(error);
      });
    
    
    }

render(){

  var user = JSON.parse(localStorage.getItem('user'));
  if(user) 
  {
      var fullname = user.fullname;
  }
  
  var{listings} = this.state;
  const shuffledPosts = shuffleArray(listings);

  const listingsList = shuffledPosts.reverse().map(listing =>{ 
    return(
    <Fragment key={listing._id}>
        <a href={"/u/?id=" +listing.user_id}><Fragment>
          <div className="events-card">
              {/* <Image className="user-image-square" roundedCircle src={tutor.pic}/> */}
              <h5>{listing.user}</h5>
              <p><b>Subject:</b> {listing.subject}</p>
              <p>{listing.description}</p>
              <p><b>Rate:</b> €{listing.rate}/hr</p>
              

              <Fragment >
              </Fragment>
          </div>
        </Fragment></a>
    </Fragment>
    )})

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

        <Fragment class="row">
            <div className="column" style={{background:'white'}}>
                <div style={{marginTop:100, marginLeft:330}}>
                    <div className="options-container">
                        <a href="/home"><button className="community-btn">Best</button></a>
                        <a href="/trending"><button className="community-btn">Trending</button></a>
                        <a href="/questions"><button className="community-btn">Questions</button></a>
                        <a href="/events"><button className="community-btn">Events</button></a>
                        <a href="/listings"><button className="community-btn-active">Listings</button></a>
                    </div>

                  
                  <h3 className="-feed-item-header" style={{marginTop:50}}>Listing</h3>
                  <br/>
                  <QuickEvent/>

                  <div className="search-div-forum">
                    <input className="searchbar-nav-forum" type="text" id="mySearch"  placeholder="Search for a Subject " title="Type in a category" autofocus/><br/><br/>
                  </div>

                  {this.state.isLoading ? ( 
                      <div>
                        <Skeleton height={200} width={800} style={{marginBottom:10}} count={5}/><br/>
          
                      </div>

                    ) : (
                      <div className="ListingLayout">
                        {listingsList}
                      </div>
                    )}
                    
                </div>
            </div>

            <div className="column2" style={{background:'white'}}>
                <div  style={{marginTop:100, width:430, marginLeft:10}}>
                <SearchbarFilter/>

                    <Fragment>
                      <Recommended/> 
                    </Fragment>
                    
                    <Fragment>
                      <Contributors/>
                    </Fragment>
                </div>
            </div>
        </Fragment>
  </div>
  );
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
          <CreateListing/>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
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