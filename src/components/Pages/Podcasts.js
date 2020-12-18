import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import {Helmet} from 'react-helmet'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';

export default class Podcasts extends React.Component {

constructor(props) {
  super(props);
  this.state = {
      id: '',
      user: '',
      following: [],
      socs:[],

  };
}

componentDidMount() {
  var user = JSON.parse(localStorage.getItem('user'));
  this.setState({ id: user._id });
  document.body.style.backgroundColor = "#f0f2f5";


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

}

render(){

  var user = JSON.parse(localStorage.getItem('user'));
  if(user) 
  {
      var fullname = user.fullname;
  }

  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Podcasts</title>
        </Helmet> 

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
          <h1>Podcasts</h1>
          <div className="search-div-forum">
            {/* <BsSearch/>  */}
            <input className="searchbar-nav-forum" type="text" id="mySearch"  placeholder="Search for a Podcast " title="Type in a category"/>
          </div>
            <div>
              <div className="EventSocietyLayout">
              <div >
                  <div>
                  <a className="-soc-l-navigation">
                    <div className="podcast-card">
                        <h4><b>Episode 154 - Pause for thought</b></h4> 
                        <p className="host-icon"><Avatar className="host-icon" src={this.state.user.pic}/></p>
                        <div >
                        </div>
                    </div>
                    </a>
                  </div>
              </div>
            </div>
            <div className="EventSocietyLayout">
              <div >
                  <div>
                  <a className="-soc-l-navigation">
                    <div className="podcast-card">
                        <h4><b>Episode 153 - PayPal</b></h4> 
                        <p ><Avatar className="host-icon" src={this.state.user.pic}/></p>
                        <div >
                        </div>
                    </div>
                    </a>
                  </div>
              </div>
            </div>
            </div>
        </div>
      </div>
  </div>
  );
}
}