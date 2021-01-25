import React from 'react';
import '../../../assets/Landing.css';
import {Navbar, Nav, Image, Form, Tooltip, OverlayTrigger, Badge} from 'react-bootstrap'
import {Helmet} from 'react-helmet'
import Space from '../../../images/space.png'
import {FcApproval,FcCollaboration,FcAdvertising} from 'react-icons/fc'
import axios from 'axios';
import {FaUserFriends} from 'react-icons/fa'
import {BsLightning,BsHeart,BsGem,BsChatQuote,BsBookmark,BsBookmarkFill} from 'react-icons/bs'
import moment from 'moment'

export default class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          societies: [],
          searchValue: '',
          filterBy: '',
          isLoading: true,
          discussions: [],
          comments:[],
          time:'',
          toggle: false,
          isSaved: false,
        };
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
      }
    
    
        componentDidMount() {
        
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

              axios.get('http://localhost:4000/discussions/getDiscussions')
                .then((response) => {
                    this.setState({ discussions: response.data.discussions,
                    isLoading: false, })
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
        

render(){

    var size = 8;
    var k = 5;
    var { discussions } = this.state;
    const shuffledPosts = shuffleArray(discussions);


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
            <title>Website Name</title>
        </Helmet>

        <Navbar className="landing-navbar">
            <Nav className="mr-auto">
                <Navbar.Brand className="header-landing" href="/landing">Website Name</Navbar.Brand>
            </Nav>

            <Navbar.Collapse className="justify-content-end">
                    <Nav.Link className="landing-link" href="/login">Sign in</Nav.Link> 
                    <Nav.Link className="landing-link" href="/join"><button className="standard-button">Get Started</button></Nav.Link>        
            </Navbar.Collapse>
        </Navbar>

        <div>
            <div className="containerLanding">
                <div class="row">
                    <div class="columnX">
                        <p className="landing-message">Make the most out of student life.</p><br/>
                    </div>

                    <div class="columnX">
                        <Image src={Space} className="landing-image"/>
                    </div>
                </div>     
            </div><hr/> 

        </div>
        <br/>
        <h1 className="landing-h1">Top Communities</h1>
        <div className="SocietyLayoutLanding">
                {filteredSocietiesByName.slice(0,size).map(society => (
                <div key={society.id}>
                    <a href={"/login"} className="comm-link"><div className="socs-list-items-landing">
                      <h5><b>{society.name}</b> </h5>
                        <span className="d-inline-block">
                            <p maxLength={10}><FaUserFriends size={20}/> {society.users.length} members</p>     
                        </span>
                        <div >
                        </div>
                    </div></a>
                </div>

                ))}
        </div>

        <br/>
        <hr/>

        <div className="discussion-feed">
          
          {/* DISCUSSION TAB */}
          {shuffledPosts.slice(0,k).reverse().map(discussion => (
            <div key={discussion._id}>
              <div className='discussion-post-landing'>
                
                <a href="/login" className="miniprofile-post-redirect">
                <div>
                    <p>
                        <small>{discussion.user} <b className="user-score-post-tag">1,231</b> <span className="landing-name">posted in</span><b style={{color:'green'}}> {discussion.society}</b></small>
                        <br/>
                        <b className="landing-post-title">{discussion.title}</b><br/><small className="muted-landing" >({moment(discussion.time).startOf('seconds').fromNow()})</small>
                    </p>
                </div></a>
              <hr/></div><br/> 
            </div>
           
          ))}
        </div>

        {/* <footer className="footer">
            <div className="footer-items">
                <div class="footer-column">
                  <a className="footer-links" href="/landing"><p>Our Website 2020</p></a>
                </div>
                <div class="footer-column">
                  <a className="footer-links" href="#"><p>Privacy</p></a>
                </div>
                <div class="footer-column">
                  <a className="footer-links" href="#"><p>Community Guidlines</p></a>
                </div>
                <div class="footer-column">
                  <a className="footer-links" href="/manifesto"><p>Manifesto</p></a>
                </div>
                <div class="footer-column">
                <a className="footer-links" href="/contact"><p>Contact</p></a>
                </div>
            </div>
          </footer> */}
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