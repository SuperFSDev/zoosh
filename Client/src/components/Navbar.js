import React from 'react';
import '../assets/App.css';
import '../assets/Media.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Image} from 'react-bootstrap'
import axios from 'axios';
import {BsBell,BsBookmarks, BsSearch,BsLightningFill, BsGearFill,BsBookmarksFill, BsGear} from 'react-icons/bs'
import {RiShieldStarLine} from 'react-icons/ri'
import SearchbarFilter from '../components/Common/SearchbarFilter'
import {BiChart} from 'react-icons/bi'
import {IoMdPlanet} from 'react-icons/io'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        id: '',
        user: '',
        following:[],
        followers:[],
        searchValue: '',
        filterBy: '',
        users: [],
        discussions: [],
    };
  }

  componentDidMount() {
      var user = JSON.parse(localStorage.getItem('user'));

      if(user == null)
        window.location = '/login';

      this.setState({ id: user._id });


      axios.get('http://localhost:4000/users/get-user-details', {
          params: {
              id: user._id,
              fields: 'score pic'
          }
      })
          .then((response) => {
              console.log(response);
              this.setState({ user: response.data.user,
                // following: response.data.user.following,
                // followers: response.data.user.followers,
              })
          })
          .catch((error) => {
              console.log(error);
          });

  }

render(){

  return (
      <div>
        <div id="top"></div>
          <div id="container">
            <div>
              <SearchbarFilter/>
            </div>
            <div className="div2"><a href="/" className="header">zoosh</a></div>
            <div style={{ marginTop:10}}>
              <BsSearch className="search-icon" size={25}/>
              <a className="link" href="/communities"><IoMdPlanet  size={20}/> EXPLORE</a>  
              <a className="link" href="/leaderboard"><BiChart  size={20}/> CHARTS</a>  
              <a className="link" href="/forum"><BsLightningFill  size={20}/> FORUM</a>  
              <a className="link" href="/notifications"><BsBell  size={20} /> ME</a>
              <span class="dropdown">
                <span style={{padding:20}}><a className="link" onClick={this.showProfile}>{this.state.user.score} <Image alt="" src={this.state.user.pic} style={{width:35, height:35, marginTop:10}}   roundedCircle/></a></span>
                  <div class="dropdown-content">
                    <a href="/me" className="profile-navs" ><p className="contributor-item-profile"><b>My Account</b></p></a>
                    <hr/>
                    <a href="/saved" className="profile-navs"><p className="contributor-item-profile"><BsBookmarks/> Reading List</p></a>
                    <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><RiShieldStarLine size={20}/> Community Guidelines</p></a>
                    <hr/>
                    <a href="/login" className="profile-navs">Sign Out</a>
                  </div>
              </span>
            </div>
          </div>

          <div id="container2">
            <div style={{ marginTop:5, marginLeft:15}}>
              <a href="/" className="header">zoosh</a>
            </div>
            <div className="div2" style={{color:'black',marginTop:7.5}}>
              <a href="/notifications" style={{color:'black',marginTop:5,marginLeft:20}}><BsBell  size={25}/></a>  
              <a href="/forum" style={{color:'black',marginTop:5, marginLeft:20}}><BsSearch  size={20}/></a>  
              <span class="dropdown2">
              <a style={{color:'black',marginTop:5, marginLeft:20}}  onClick={this.showProfile2}><Image alt="" src={this.state.user.pic} style={{width:35, height:35, marginTop:3,marginRight:20, cursor:'pointer'}}   roundedCircle/></a>
                  <div class="dropdown-content2">
                    <a href="/me" className="profile-navs" ><p className="contributor-item-profile"><b>My Account</b></p></a>
                    <hr/>
                    <a href="/communities" className="profile-navs"><p className="contributor-item-profile"><IoMdPlanet/> Communities</p></a>
                    <a href="/forum" className="profile-navs"><p className="contributor-item-profile"><BsLightningFill/> Forum</p></a>
                    <a href="/leaderboard" className="profile-navs"><p className="contributor-item-profile"><BiChart/> Charts</p></a>
                    <a href="/saved" className="profile-navs"><p className="contributor-item-profile"><BsBookmarks/> Reading List</p></a>
                    <a href="/settings" className="profile-navs"><p className="contributor-item-profile"><RiShieldStarLine size={20}/> Community Guidelines</p></a>
                    <hr/>
                    <a href="/login" className="profile-navs">Sign Out</a>
                  </div>
              </span>
            </div>
          </div>
      </div>
    );
  }
}