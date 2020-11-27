import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import {Image} from 'react-bootstrap'
import ProfilePic from '../../images/team.jpg'
import axios from 'axios';
import {Helmet} from 'react-helmet'

export default class InfoPage extends React.Component {

  componentDidMount() {
  }


  constructor(props) {
    super(props);
    this.state = {
      society: '',
    };
  }

    componentDidMount() {
      var society_id = new URLSearchParams(this.props.location.search).get("id");
      document.body.style.backgroundColor = "#f0f2f5";


      axios.get('http://localhost:4000/societies/get-societies-page', {
        params: {
          id: society_id
        }
      })
        .then((response) => {
          this.setState({ society: response.data.society })
        })
        .catch((error) => {
          console.log(error);
        });
    }

    render(){
      return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Forums</title>

                {/* LINKS */}
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet> 
      <div className="containerInformationLeft">
   
      </div>

      <div className="containerInformationMiddle">
          <div className="information-container">
              <div>
                 <Image src={ProfilePic} className="user-image" roundedCircle />
              </div>
              <div>
                <p className="society-header-name"> {this.state.society.name}</p>
              </div>
              <div className="member-count">
              </div>
              <div className="profile-card">
              </div>
              <div>
                  <button className="soc-item-list-join-btn-info">Join</button>
              </div>
          </div>
      </div>

      <div className="containerInformationRight">

      </div>
  </div>
  );
} 
}
